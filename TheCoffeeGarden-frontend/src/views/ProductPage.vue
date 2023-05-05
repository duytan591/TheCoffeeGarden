<template>
  <div class="row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="col-md-10 mt-3">
      <h4>
        Danh sách sản phẩm
        <i class="fas fa-coffee"></i>
      </h4>
    </div>
    <div class="col-md-10 mt-3 d-flex justify-content-start">
      <div class="row">
        <div class="col mt-4">Filtered By:</div>
        <div v-for="category in categories" class="col mt-3">
          <router-link
            :to="{
              name: 'category',
              params: { name: category.category_title },
            }"
            tag="button"
            class="btn btn-outline-dark"
            style="width: 120px"
            >{{ category.category_title }}</router-link
          >
        </div>
      </div>
    </div>
    <div class="container px-4 px-lg-5 mt-5">
      <div
        class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center"
      >
        <ProductList
          v-if="filteredProductsCount > 0"
          :products="filteredProducts"
          v-model:activeIndex="activeIndex"
        />
        <p v-else>Không có sản phẩm nào.</p>
      </div>
    </div>
    <!-- <div class="mt-3">
      <div v-if="activeProduct">
        <h4>Chi tiết sản phẩm</h4>
        <ProductCard :product="activeProduct"/>
        <router-link
          :to="{
            name: 'product.edit',
            params: { id: activeProduct._id },
          }"
        >
          <span class="mt-2 badge text-bg-warning">
            <i class="fas fa-pen-to-square"></i> Hiệu chỉnh
          </span>
        </router-link>
      </div>
    </div> -->
  </div>
</template>
<script>
import ProductCard from "../components/ProductCard.vue";
import InputSearch from "../components/InputSearch.vue";
import ProductList from "../components/ProductList.vue";
import ProductService from "../services/product.service";
import CategoryService from "../services/category.service";
import UserService from "../services/user.service";

export default {
  components: {
    ProductCard,
    InputSearch,
    ProductList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      products: {},
      activeIndex: -1,
      searchText: "",
      categories: {},
      user:{},
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng product thành chuỗi để tiện cho tìm kiếm.
    productStrings() {
      return this.products.map((product) => {
        const { title, category, price, description } = product;
        return [title, category, price, description].join("");
      });
    },
    // Trả về các product có chứa thông tin cần tìm kiếm.
    filteredProducts() {
      if (!this.searchText) return this.products;
      return this.products.filter((_product, index) =>
        this.productStrings[index].includes(this.searchText)
      );
    },
    activeProduct() {
      if (this.activeIndex < 0) return null;
      return this.filteredProducts[this.activeIndex];
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
  },
  methods: {
    async retrieveProducts() {
      try {
        this.products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      if (this.$route.params.name) {
        this.getFilter();
      } else {
        this.retrieveProducts();
        this.activeIndex = -1;
      }
    },
    async removeAllProducts() {
      if (confirm("Bạn muốn xóa tất cả Sản phẩm?")) {
        try {
          await ProductService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddProduct() {
      this.$router.push({ name: "product.add" });
    },
    async getCategory() {
      try {
        this.categories = await CategoryService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async getFilter() {
      try {
        this.products = await ProductService.filtered(this.$route.params.name);
        this.refreshList();
      } catch (error) {
        console.log(error);
      }
    },
    // async getUser() {
    //   try {
    //     this.user = await UserService.secret();        
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  },
  mounted() {
    this.refreshList();
    this.getCategory();
    // this.getUser();
  },
};
</script>
<style scoped>
@import "../styles-homepage.css";
</style>
