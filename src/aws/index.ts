import AWS from 'aws-sdk';

const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY!;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY!;
const AWS_LAMBDA_NAME = process.env.AWS_LAMBDA_NAME!;

export const updateEnv = async () => {
    const lambda = new AWS.Lambda({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
        region: process.env.AWS_REGION
    });
    const params = {
        FunctionName: AWS_LAMBDA_NAME, 
        MemorySize: 128,
        Environment: {
            Variables: {
                'LAST_AT': Date.now().toString(),
                'AWS_ACCESS_KEY': AWS_ACCESS_KEY,
                'AWS_SECRET_KEY': AWS_SECRET_KEY
            }
        }
      };
    await lambda.updateFunctionConfiguration(params).promise();
}