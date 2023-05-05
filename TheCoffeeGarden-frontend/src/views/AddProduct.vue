<template>
    <div v-if="product" class="page">
      <h4>Thêm Sản phẩm</h4>
      <ProductForm 
        :product="product"
        @submit:product="addProduct"
        :categories="category"
      />
      <p>{{ message }}</p>
    </div>
  </template>
  <script>
  import ProductForm from "../components/ProductForm.vue";
  import ProductService from "../services/product.service";
  import UploadService from "../services/upload.service";
  import CategoryService from "../services/category.service";
  export default {
    components: {
      ProductForm,
    },
    // props: {
    //   id: { type: String, required: true },
    // },
    data() {
      return {
        product: {},
        category:[],
        message: "",
      };
    },
    methods: {
      async addProduct(imagePayload) {
        try {
          await UploadService.createdata(imagePayload.image);
          console.log("Thêm ảnh thành công")
          await ProductService.create(imagePayload.product);
          this.message = "Sản phẩm được thêm thành công.";
        } catch (error) {
          console.log(error);
        }
      },
      async getCategories(){
        try {
          this.category =  await CategoryService.getAll();
          // console.log(this.category)
        } catch (error) {
          console.log(error);
        }
      },
      refreshList() {
        this.getCategories();
      },
    },
    created() {
      this.message = "";
    },
    mounted(){
      this.refreshList()
    }
  };
  </script>
<style scoped>
</style>
  