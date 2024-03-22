import { UploadHandler, writeAsyncIterableToWritable } from "@remix-run/node";
import * as AWS from "aws-sdk";
import { PassThrough } from "stream";

// Replace these values with your own
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_PRODUCTION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_PRODUCTION;
const BUCKET_NAME = process.env.BUCKET_NAME_PRODUCTION ?? "";

// Set up the S3 client with your AWS credentials

const uploadStream = ({ Key }: Pick<AWS.S3.Types.PutObjectRequest, "Key">) => {
  const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });
  const pass = new PassThrough();
  const KEY_NAME = `TTS/input/${new Date().getTime() + "-@-" + Key}`;
  return {
    writeStream: pass,
    promise: s3
      .upload({ Bucket: BUCKET_NAME, Key: KEY_NAME, Body: pass })
      .on("httpUploadProgress", function (progress) {
        console.log("Uploaded :: " + (progress.loaded * 100) / progress.total) +
          "%";
      })
      .promise(),
  };
};

export async function uploadStreamToS3(data: any, filename: string) {
  const stream = uploadStream({
    Key: filename,
  });
  await writeAsyncIterableToWritable(data, stream.writeStream);
  const file = await stream.promise;
  return file.Location;
}

export const ttsUploadFile: UploadHandler = async ({
  name,
  filename,
  data,
}) => {
  if (name !== "file") {
    return undefined;
  }
  const uploadedFileLocation = await uploadStreamToS3(data, filename!);
  return uploadedFileLocation;
};
