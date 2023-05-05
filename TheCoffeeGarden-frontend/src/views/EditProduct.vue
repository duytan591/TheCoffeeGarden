<template>
  <div v-if="product" class="page">
    <h4>Hiệu chỉnh Sản phẩm</h4>
    <ProductForm
      :product="product"
      @submit:product="updateProduct"
      @delete:product="deleteProduct"
      :categories="category"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ProductForm from "../components/ProductForm.vue";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";
export default {
  components: {
    ProductForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      product: null,
      category:{},
      message: "",
    };
  },
  methods: {
    async getProduct(id) {
      try {
        this.product = await ProductService.get(id);
      } catch (error) {
        console.log(error);
        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateProduct(data) {
      try {
        await ProductService.update(this.product._id, data);
        this.message = "Sản phẩm được cập nhật thành công.";
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProduct() {
      if (confirm("Bạn muốn xóa Sản phẩm này?")) {
        try {
          await ProductService.delete(this.product._id);
          this.$router.push({ name: "coffeegarden" });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getCategories(){
      try {
         this.category =  await CategoryService.getAll();
         console.log(this.category)
      } catch (error) {
        console.log(error);
      }
    }
  },
  created() {
    this.getProduct(this.id);
    this.message = "";
  },
};
</script>
