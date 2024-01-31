import { LoaderFunction, json, redirect } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { getUserAboutData } from "~/modal/aboutUser.server";
import { getUser, getUsers } from "~/modal/user.server";
import { auth } from "~/services/auth.server";
import { Card, Spinner, Table, TextInput } from "flowbite-react";
import useDebounce from "~/component/hooks/useDebounceState";
export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let query = url.searchParams;
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);
  //check if all questions are answered
  let aboutUser = await getUserAboutData(user?.id);
  if (!aboutUser) return redirect("/steps");

  const { list, totalCount } = await getUsers(query?.get("q") ?? "");
  return json({
    user,
    users: list,
    totalCount,
  });
};
function dashboard() {
  let { users, totalCount } = useLoaderData();
  let [searchparam, setSearchParam] = useSearchParams();
  let [input, setInput] = useState(searchparam.get("q") ?? "");
  let debounced_input = useDebounce(input, 800);
  let navigation = useNavigation();
  useEffect(() => {
    setSearchParam({ q: debounced_input });
  }, [debounced_input]);
  return (
    <>
      <TextInput
        id="email"
        type="text"
        placeholder="email or username"
        required
        className="mb-3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Card>
        <h1 className="text-2xl font-bold">Total Users: {totalCount}</h1>
      </Card>
      <Table>
        <Table.Head>
          <Table.HeadCell>user</Table.HeadCell>
          <Table.HeadCell>role</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y overflow-auto max-h-[80vh]">
          {navigation.state !== "idle" ? (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          ) : (
            users?.map((user) => {
              return (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-2">
                    <img
                      src={user.picture}
                      alt={user?.username}
                      className="h-6 w-6 rounded-full"
                    />
                    {user?.username}
                  </Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table>
    </>
  );
}

export default dashboard;
