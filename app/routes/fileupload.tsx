import {
  ActionFunctionArgs,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => filename,
    })
    // parse everything else into memory
    // unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler // <-- we'll look at this deeper next
  );

  // the returned value for the file field is whatever our uploadHandler returns.
  // Let's imagine we're uploading the avatar to s3,
  // so our uploadHandler returns the URL.
  const avatarUrl = formData.get("file");

  // update the currently logged in user's avatar in our database
  console.log(avatarUrl);

  // success! Redirect to account page
  return null;
};

export default function AvatarUploadRoute() {
  return (
    <Form method="post" encType="multipart/form-data">
      <label htmlFor="file">Avatar</label>
      <input id="avatar-input" type="file" name="file" />
      <button>Upload</button>
    </Form>
  );
}
