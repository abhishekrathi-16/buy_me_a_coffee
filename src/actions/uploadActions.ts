"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function uploadToS3(formData: FormData) {
  const file = formData.get("file") as File;
  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACC_KEY as string,
      secretAccessKey: process.env.AWS_SEC_ACC_KEY as string,
    },
  });

  // find the extension of the file that has been uploaded
  const extension = file.name.split(".").slice(-1)[0];
  const newFilename = uniqid() + "." + extension;

  // add all chunks of binary data of the file in the chunks array
  const chunks = [];
  // @ts-ignore
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }
  // collect all the chunks of data and gather them together as a Buffer
  const buffer = Buffer.concat(chunks);

  const bucket = process.env.AWS_BUCKET as string;
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: newFilename,
      ACL: "public-read",
      Body: buffer,
      ContentType: file.type,
    })
  );

  return {
    newFilename,
    extension,
    url: `https://${bucket}.s3.eu-north-1.amazonaws.com/${newFilename}`,
  };
}

//buymeacoffee-abhi.s3.amazonaws.com/1dajm027npmr.png
