const { ObjectId } = require("mongodb");
class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractOrderData(payload) {
        const order = {
            orderItems: payload.orderItems,
            user:payload.user,
            status:payload.status,
            totalPrice:payload.totalPrice,
            shippingAddress:payload.shippingAddress,
            phone:payload.phone,
            dateOrdered: payload.dateOrdered,
        };
        // Remove undefined fields
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );
        return order;
    }
    async create(payload) {
        const order = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            order,
            { $set: {
                status: this.order.status === true
            }},
            { returnDocument: "after", upsert:true});
        return result.value;
    }
    async find(payload) {
        const cursor = await this.Order.find(payload);
        return await cursor.toArray();
    }
    async findByUser(value){
        const result = await this.Order.aggregate([
            {
                $match: {
                  user: value
                }
            },
            {
                $lookup:{
                    from:"orderitems",
                    localField: "orderItems",
                    foreignField: "_id",
                    as: "orderItems"
                }
            },
        ])
        return await result.toArray();
    }

    async findById(id) {
        const result = await this.Order.aggregate([
            {
                $match: {
                  _id:ObjectId.isValid(id) ? new ObjectId(id) : null,
                }
            },
            {
                $lookup:{
                    from:"orderitems",
                    localField: "orderItems",
                    foreignField: "_id",
                    as: "orderItems"
                }
            },
            {
                $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "user"
                }
            }

        ])
        return await result.toArray();
    }

    async retrieveAll(){
        const result = await this.Order.aggregate([
            // {
            //     $lookup:{
            //         from:"orderitems",
            //         localField: "orderItems",
            //         foreignField: "_id",
            //         as: "orderItems"
            //     },
            // },
            {
                $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "user"
                }
            },
        ])
        return await result.toArray();
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.Order.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAll() {
        const result = await this.Order.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = OrderService;