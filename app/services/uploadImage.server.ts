import type { UploadHandler } from "@remix-run/node";
import { PassThrough } from "stream";
import { writeAsyncIterableToWritable } from "@remix-run/node";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

// Replace these values with your own
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_PRODUCTION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_PRODUCTION;
const BUCKET_NAME = process.env.BUCKET_NAME_PRODUCTION ?? "";
const REGION = process.env.AWS_REGION_PRODUCTION;

if (!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && BUCKET_NAME)) {
  throw new Error("Storage is missing required configuration.");
}

const uploadStream = ({ Key }: Pick<AWS.S3.Types.PutObjectRequest, "Key">) => {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  const pass = new PassThrough();
  return {
    writeStream: pass,
    promise: s3.upload({ Bucket: BUCKET_NAME, Key, Body: pass }).promise(),
  };
};

export async function uploadStreamToS3(data: any, filename: string) {
  // get the file extension
  const ext = filename.split(".").pop();
  // create a unique key with uuid and file extension and upload to folder "OCR/playground"
  const key = `OCR/playground/${uuidv4()}.${ext}`;
  console.log("key", key);
  const stream = uploadStream({
    Key: key,
  });
  await writeAsyncIterableToWritable(data, stream.writeStream);
  const file = await stream.promise;
  return file.Location;
}

export const s3UploadHandler: UploadHandler = async ({
  name,
  filename,
  data,
}) => {
  if (name !== "image") {
    return undefined;
  }
  const uploadedFileLocation = await uploadStreamToS3(data, filename!);
  return uploadedFileLocation;
};

// s3 image upload with using upload handler
export const s3ImageUpload = async (filename: string, file) => {
  // s3 config
  const s3 = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  } as S3ClientConfig);

  // get the file extension
  const ext = filename.split(".").pop();
  // create a unique key with uuid and file extension
  const key = `OCR/playground/${uuidv4()}.${ext}`;
  console.log("key", key);

  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.stream(), // Use the file's stream for upload
      ContentType: file.type,
    });

    await s3.send(command);

    // Construct the URL of the uploaded object
    const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
    return url;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
