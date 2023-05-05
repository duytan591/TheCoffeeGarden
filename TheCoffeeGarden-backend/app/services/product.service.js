const { ObjectId } = require("mongodb");
const UploadService = require("./upload.service");
const mongoDB = require("../utils/mongodb.util");
const CategoryService = require("./category.service");
class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload) {
        const product = {
            title: payload.title,
            price: payload.price,
            category:payload.category,
            description: payload.description,
            favorite: payload.favorite,
            disable:payload.disable,
        };
        // Remove undefined fields
        Object.keys(product).forEach(
            (key) => product[key] === undefined && delete product[key]
        );
        return product;
    }
    

    async create(payload) {
        const product = this.extractProductData(payload);
        const ImgId = await this.getImgId()
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: { 
                favorite: product.favorite === true ,
                disable: product.disable === true,
                image: ImgId[0]._id,
            } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }
    async findByName(title) {
        return await this.find({
            title: { $regex: new RegExp(title), $options: "i" },
        });
    }

    async findById(id) {
        const result = await this.Product.aggregate([
            {
                $match: {
                  _id:ObjectId.isValid(id) ? new ObjectId(id) : null,
                }
            },
            {
                $lookup:{
                    from:"photos.chunks",
                    localField: "image",
                    foreignField: "files_id",
                    as: "image"
                }
            },
            {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "category_title",
                  as: "category"
                }
            }

        ])
        return await result.toArray();
    }

    async findByCategory(value){
        const result = await this.Product.aggregate([
            {
                $match: {
                  category: value
                }
            },
            {
                $lookup:{
                    from:"photos.chunks",
                    localField: "image",
                    foreignField: "files_id",
                    as: "image"
                }
            },
            
        ])
        return await result.toArray();
    }
    
    async findFavorite() {
        return await this.find({ favorite: true });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }
    
    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    
    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
    async getImgId() {
        const uploadService = new UploadService(mongoDB.client)
        return await uploadService.getLatestImg()
    }
    async getData(){
        const result = await this.Product.aggregate([
            {
                $lookup:{
                    from:"photos.chunks",
                    localField: "image",
                    foreignField: "files_id",
                    as: "image"
                }
            },
            {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "category_title",
                  as: "category"
                }
            }
        ])
        return await result.toArray();
    }
    
}
module.exports = ProductService;
