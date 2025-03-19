import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import {
  AWS_ACCESS_KEY_ID,
  AWS_ENDPOINT_URL_S3,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
  BUCKET_NAME,
} from "@constants/env";
import { singleton } from "@utils/misc";

const S3 = singleton("s3Client", getS3Client);

function getS3Client() {
  const S3 = new S3Client({
    endpoint: AWS_ENDPOINT_URL_S3,
    region: AWS_REGION,
    forcePathStyle: false,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  return S3;
}

export async function listStorageContents(prefix: string) {
  const listObjectsCommand = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: prefix,
  });

  const { Contents: contents } = await S3.send(listObjectsCommand);

  if (!contents) {
    throw new Error("No contents found in the S3 bucket");
  }

  return contents;
}

export async function getObjectFromStorage(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ResponseCacheControl: "public, max-age=31536000, immutable",
  });

  const { Body: body } = await S3.send(command);

  return body;
}
