const { ObjectId } = require("mongodb");
class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("categories");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCategoryData(payload) {
        const category = {
            category_id: payload.category_id,
            category_title:payload.category_title
        };
        // Remove undefined fields
        Object.keys(category).forEach(
            (key) => category[key] === undefined && delete category[key]
        );
        return category;
    }
    async create(payload) {
        const category = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            category,
            { $set: {}},
            { returnDocument: "after", upsert:true});
        return result.value;
    }
    async find(filter) {
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }
    async findByName(title) {
        return await this.Category.find({
            category_title: { $regex: new RegExp(title), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Category.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.Category.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    async deleteAll() {
        const result = await this.Category.deleteMany({});
        return result.deletedCount;
    }
}
module.exports = CategoryService;