import express from 'express';
import { getNotifications, markNotificationsAsRead } from '../controllers/notificationController.js';
const { userMiddleware } = await import('../middleware/userMiddleware.js');


const router = express.Router();

router.get('/get-notifications', userMiddleware, getNotifications);
router.put('/mark-as-read/:id', userMiddleware, markNotificationsAsRead);

export default router;