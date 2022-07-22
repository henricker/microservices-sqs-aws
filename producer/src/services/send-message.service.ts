import AWS from 'aws-sdk';

export class SendMessageService {

    async handle(event: { message: string,  queueName: string }): Promise<any> {
        const sqs = new AWS.SQS({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

        const queues = await sqs.listQueues({ QueueNamePrefix: event.queueName }).promise();

        if(!queues.QueueUrls?.length || queues.QueueUrls.length === 0) {
            await sqs.createQueue({
                QueueName: event.queueName,
            }).promise();
        }
    
        const message = await sqs.sendMessage({
            QueueUrl: process.env.SQS_QUEUE_URL + event.queueName,
            MessageBody: JSON.stringify(event.message)
        }).promise();

        return message
    }

}