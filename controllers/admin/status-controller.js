const Orders = require('../../models/Order');
const orderService = require('../../services/order-service');

module.exports = function statusController() {
    return {
        async update(req, res) {
            const { _id, newStatus } = req.body;

            await orderService.updateOrderStatus(_id, newStatus);

            //emit event using node event emitter
            const eventEmitter = req.app.get('eventEmitter');
            eventEmitter.emit('order_updated', { _id, newStatus })
        },
        async fetchStatus(req, res) {
            const { _id } = req.params;

            const order = await orderService.fetchOrderById(_id);
            return res
                .status(200)
                .json({ status: order.status, updatedAt: order.updatedAt })
        }
    }
}