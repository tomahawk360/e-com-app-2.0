import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
 
// @desc:       Crear nueva orden
// @route:      POST /api/orders
// @access:     Private
const addOrderItems = asyncHandler(async(req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No hay items en la orden');
    } else {
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(200).json(createdOrder);
    }
});

// @desc:       Get ordenes del user logeado
// @route:      GET /api/orders/user
// @access:     Private
const getUserOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc:       Get orden por id
// @route:      GET /api/orders/:id
// @access:     Private
const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if(order) {
        res.status(200).json(order);
    } else {
        res.status(404);
        throw new Error('Orden no encontrada');
    }
});

// @desc:       Update orden a pagada
// @route:      PUT /api/orders/:id/pay
// @access:     Private
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);

    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updateOrder = await order.save();

        res.status(200).json(updateOrder);
    } else {
        res.status(404);
        throw new Error('Orden no encontrada');
    }
});

// @desc:       Update order a enviada
// @route:      PUT /api/orders/:id/deliver
// @access:     Private/Admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);

    if(order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Orden no encontrada');
    }
});

// @desc:       Get all orders
// @route:      GET /api/orders
// @access:     Private/Admin
const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
});

export { 
    addOrderItems,
    getUserOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
}