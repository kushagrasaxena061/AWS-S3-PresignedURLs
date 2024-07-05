const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function putObject(filename) {
  const command = new PutObjectCommand({
    Bucket: "",
    Key: `/uploads/user-uploads/${filename}`,
  });

  const url = await getSignedUrl(s3Client, command);
  return url;
}

async function listObjects() {
  // Not working as of now. Not an imp function anyways.
  //   const command = new ListObjectsV2Command({
  //     Bucket: "",
  //     Key: "/",
  //   });

  const result = await s3Client.send(command);
  console.log(result);
}

async function init() {
  //   console.log(
  //     "URL for fetching : \n\n ",
  //     await getObjectURL("schedule.png"),
  //     "\n\n"
  //   );

  //   console.log(
  //     "URL for uploading : \n\n ",
  //     await putObject(`image-${Date.now()}.jpeg`),
  //     "\n\n"
  //   );

  //   await listObjects();

  const cmd = new DeleteObjectCommand({
    Bucket: "",
    Key: "schedule.png",
  });

  await s3Client.send(cmd);
}

init();
