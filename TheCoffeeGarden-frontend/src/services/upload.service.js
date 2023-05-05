import createApiClient from "./api.service";
class UploadService {
    constructor(baseUrl = "/api/products/img/upload") {
      this.api = createApiClient(baseUrl);
    }
    async createdata(data) {
        const formData = new FormData()
        formData.append("file",data)
      return (await this.api.post("/", formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
      })).data;
    }
  }
  export default new UploadService();