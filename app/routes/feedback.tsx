import { ActionFunction } from "@remix-run/node";
import { checkIfExist, dislikeMTdata, likeMTdata } from "~/modal/feedback";
import { getUser } from "~/modal/user";
import { auth } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);
  let formdata = await request.formData();
  let source = formdata.get("source") as string;
  let output = formdata.get("output") as string;
  let action = formdata.get("_action") as string;
  let likedata;
  if (action === "liked") {
    likedata = await likeMTdata(source, output, user?.id);
  } else if (action === "disliked") {
    likedata = await dislikeMTdata(source, output, user?.id);
  }
  return {
    liked: likedata?.liked,
    disliked: likedata?.disliked,
    message: likedata?.liked ? "བཀའ་དྲིན་ཆེ།" : "དགོངས་འགལ་མེད་པ་ཞུ།",
  };
};
