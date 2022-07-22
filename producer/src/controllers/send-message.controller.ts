import { Request, Response } from "express";
import { SendMessageService } from "../services/send-message.service";

export class SendMessageController {

    async handle(request: Request, response: Response): Promise<any> {
        const service = new SendMessageService();

        const message = await service.handle({
            queueName: process.env.SQS_QUEUE_NAME as string,
            message: request.body.message
        });

        return response.status(200).json(message);
    }
}