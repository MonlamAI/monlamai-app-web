import type { S3ClientConfig } from "@aws-sdk/client-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Replace these values with your own
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID_PRODUCTION;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY_PRODUCTION;
const BUCKET_NAME = process.env.BUCKET_NAME_PRODUCTION ?? "";
const REGION = process.env.AWS_REGION_PRODUCTION;

// Initialize S3 client outside of your function to reuse it across Lambda invocations
const config = {
  region: REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
};

const s3Client = new S3Client(config as S3ClientConfig);

export async function uploadToS3(buffer, key,ContentType) {

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType, // Adjust based on your audio format
  });

  await s3Client.send(command);

  // Return the URL
  return `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;
}
