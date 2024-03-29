import express from "express";
import {     
    addOrderItems,
    getUserOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
} from "../controllers/orderController.js";
import {
    protect,
    admin
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getOrders)
    .post(protect, addOrderItems);
router.route('/user').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);


export default router;