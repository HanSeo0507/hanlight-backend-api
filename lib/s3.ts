import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: process.env.AWS_REGION,
});
export default s3;
