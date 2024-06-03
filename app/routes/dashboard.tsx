import { LoaderFunction, json, redirect } from "@remix-run/node";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { getUsers } from "~/modal/user.server";
import { Card, Spinner, Table, TextInput } from "flowbite-react";
import useDebounce from "~/component/hooks/useDebounceState";
import { getUserDetail } from "~/services/session.server";
export const loader: LoaderFunction = async ({ request }) => {
  let url = new URL(request.url);
  let query = url.searchParams;

  let user = await getUserDetail(request);
  //check if all questions are answered

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
    <Card
      className="max-w-md md:ml-20 relative"
      style={{
        maxHeight: "60vh",
        overflow: "auto",
      }}
    >
      <div className="flex justify-between  items-center sticky top-0 pt-2 bg-white z-10 dark:bg-gray-800 dark:text-white ">
        <div className="font-bold ">
          USER <span className="text-gray-300">{totalCount}</span>
        </div>
        <TextInput
          id="email"
          type="text"
          placeholder="email or username"
          required
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>name</Table.HeadCell>
          <Table.HeadCell>role</Table.HeadCell>
        </Table.Head>
        <Table.Body className=" h-full mt-2">
          {navigation.state !== "idle" ? (
            <div className="flex justify-center py-4">
              <Spinner
                size="lg"
                className={"fill-secondary-300 dark:fill-primary-500"}
              />
            </div>
          ) : (
            users?.map((user) => {
              return (
                <Table.Row
                  key={user.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex gap-2 item-center">
                    <img
                      src={user.picture}
                      alt={user?.username}
                      className="h-6 w-6 rounded-full self-center"
                    />
                    <div className="flex flex-col justify-center">
                      <div>{user?.username}</div>
                      <div className="text-gray-400">{user?.email}</div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table>
    </Card>
  );
}

export default dashboard;
