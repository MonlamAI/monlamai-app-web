import { ActionFunction } from "@remix-run/node";
import { dislikedata, likedata } from "~/modal/feedback";
import { getUser } from "~/modal/user";
import { auth } from "~/services/auth.server";
import { modelType } from "~/modal/feedback";
export const action: ActionFunction = async ({ request }) => {
  let userdata = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  let user = await getUser(userdata?._json.email);
  let formdata = await request.formData();
  let source = formdata.get("source") as string;
  let output = formdata.get("output") as string;
  let action = formdata.get("_action") as string;
  let model = formdata.get("model") as modelType;
  let res;
  if (action === "liked") {
    res = await likedata(source, output, user?.id, model);
  } else if (action === "disliked") {
    res = await dislikedata(source, output, user?.id, model);
  }
  return {
    liked: res?.liked,
    disliked: res?.disliked,
    message: res?.liked ? "བཀའ་དྲིན་ཆེ།" : "དགོངས་འགལ་མེད་པ་ཞུ།",
  };
};
