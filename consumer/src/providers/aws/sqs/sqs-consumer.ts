import AWS, { SsoCredentials } from 'aws-sdk'
import { DeleteMessageBatchRequestEntry } from 'aws-sdk/clients/sqs';

type ISQSConsumer = {
    queueName: string;
    handle: (message: any) => Promise<any>;
    timeout: number;
}

export async function SQSConsumer({ handle, queueName, timeout }: ISQSConsumer) {
    const sqs = new AWS.SQS();
    
    console.info('SQS Consumer started on queue:', queueName);

    setInterval(async () => {
        try {
            const subscription = await sqs.receiveMessage({
                QueueUrl: process.env.SQS_QUEUE_URL + queueName
            }).promise();

            if(subscription.Messages?.length === 0 || !subscription.Messages) {
                console.info('Nothing message to processing, waiting for new messages...');
            }

            subscription.Messages?.forEach((msg) => {
                handle(msg);
            });

            if(subscription.Messages && subscription.Messages.length > 0) {
                const messagesToDelete = subscription.Messages?.map((msg) => ({
                    id: msg?.MessageId!,
                    receiptHandle: msg.ReceiptHandle!
                })) || [] as any;

                messagesToDelete.forEach(msg => {
                    sqs.deleteMessage({
                        QueueUrl: process.env.SQS_QUEUE_URL + queueName,
                        ReceiptHandle: msg.receiptHandle
                    }).promise()
                })
            }

        } catch(err) {
            console.error('Error on processing message', err);
        }

    }, timeout)
}