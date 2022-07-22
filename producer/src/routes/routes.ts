import { Router } from 'express';
import { SendMessageController } from '../controllers/send-message.controller';

const router = Router();


router.post('/', new SendMessageController().handle);

export default router;