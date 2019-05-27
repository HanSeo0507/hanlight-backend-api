import * as AWS from 'aws-sdk';

import * as config from '../config/awsConfig.json';

const s3 = new AWS.S3({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region,
});
export default s3;
