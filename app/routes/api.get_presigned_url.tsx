import { ActionFunction } from "@remix-run/node";
import AWS from "aws-sdk";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_PRODUCTION,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PRODUCTION,
  region: process.env.AWS_REGION_PRODUCTION,
  bucketName: process.env.BUCKET_NAME_PRODUCTION,
};

AWS.config.update(awsConfig);
const s3 = new AWS.S3();

export const action: ActionFunction = async ({ request }) => {
  let formdata = await request.formData();
  let fileName = formdata.get("filename");
  let fileType = formdata.get("filetype");
  let folderName = formdata.get("folder");
  let bucket = awsConfig.bucketName + "/OCR/input";
  if (folderName) {
    bucket = awsConfig.bucketName + "/OCR/input/" + folderName;
  }
  const s3Params = {
    Bucket: bucket,
    Key: fileName,
    Expires: 600, // URL expiration time in seconds
    ContentType: fileType,
  };
  let url = await new Promise(async (resolve, reject) => {
    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        reject("Error getting pre-signed URL");
      } else {
        resolve(data);
      }
    });
  });
  return { url };
};
