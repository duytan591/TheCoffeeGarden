
class UploadService {
    constructor(client) {
        this.imgFiles = client.db().collection("photos.files");
        this.imgChunks = client.db().collection("photos.chunks");
    }
    async getImgData(){
        const result = await this.imgFiles.aggregate([
            {
                $lookup:{
                    from:"photos.chunks",
                    localField: "_id",
                    foreignField: "files_id",
                    as: "img_data"
                }
            },
        ])
        return await result.toArray();
    }
    async getLatestImg(){
        const result = await this.imgFiles.find().sort({_id: -1})
        return await result.toArray()
    }

}
module.exports = UploadService;
