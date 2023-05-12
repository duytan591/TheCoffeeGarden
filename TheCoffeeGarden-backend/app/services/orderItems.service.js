const { ObjectId } = require("mongodb");
class OrderItemService {
    constructor(client) {
        this.OrderItems = client.db().collection("orderitems");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractOrderItemData(payload) {
        const orderItem = {
            product:payload.product,
            quantity:payload.quantity,
        };
        // Remove undefined fields
        Object.keys(orderItem).forEach(
            (key) => orderItem[key] === undefined && delete orderItem[key]
        );
        return orderItem;
    }

    async createOrderItem(payload) {
        const orderItem = this.extractOrderItemData(payload);
        const result = await this.OrderItems.findOneAndUpdate(
            orderItem,
            { $set: {
                 
            }},
            { returnDocument: "after", upsert:true});
        return result.value;
    }

    async find(payload) {
        const cursor = await this.OrderItems.find(payload);
        return await cursor.toArray();
    }

    async retrieveAll() {
        const result = await this.OrderItems.aggregate([
            {
                $lookup:{
                    from:"products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product"
                }
            },
        ])
        return await result.toArray();
    }

    async findById(id) {
        const result = await this.OrderItems.aggregate([
            {
                $match: {
                  _id:ObjectId.isValid(id) ? new ObjectId(id) : null,
                }
            },
            {
                $lookup:{
                    from:"products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product"
                }
            },
        ])
        return await result.toArray();
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractOrderItemData(payload);
        const result = await this.OrderItems.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.OrderItems.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAll() {
        const result = await this.OrderItems.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = OrderItemService;