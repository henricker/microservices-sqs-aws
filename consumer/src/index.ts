import AWS from 'aws-sdk'
import { SQSConsumer } from './providers/aws/sqs/sqs-consumer';

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

SQSConsumer({
    queueName: 'testQueue',
    handle: async (message: any) => {
        console.log(message);
    },
    timeout: 5000
});

