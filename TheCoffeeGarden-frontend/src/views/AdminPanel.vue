<template>
  <header
    class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Admin Panel</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <input
      class="form-control form-control-dark w-100"
      type="text"
      placeholder="Search"
      aria-label="Search"
    />
  </header>

  <div class="container-fluid">
    <div class="row">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <router-link :to="{name:'order.manager'}" class="nav-link">
                <span data-feather="file"></span>
                Orders
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'admin.panel'}" class="nav-link">
                <span data-feather="shopping-cart"></span>
                Products
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name:'user.manager'}" class="nav-link">
                <span data-feather="users"></span>
                Customers
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <ProductTable :products="retrieveProduct" v-model:activeIndex="activeIndex" />
        <div class="mt-3 row justify-content-around align-items-center">
          <button
            class="btn btn-sm btn-primary col mx-3"
            @click="refreshList()"
          >
            <i class="fas fa-rotate"></i> Làm mới
          </button>
          <button
            class="btn btn-sm btn-success col mx-3"
            @click="goToAddProduct"
          >
            <i class="fas fa-plus"></i> Thêm mới
          </button>
          <button
            class="btn btn-sm btn-danger col mx-3"
            @click="removeAllProducts"
          >
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import ProductTable from "../components/ProductTable.vue";
import ProductService from "../services/product.service";
import CategoryService from "../services/category.service";

export default {
  data() {
    return {
      products: [],
      categories: {},
      activeIndex: -1,
    };
  },
  components: {
    ProductTable,
  },
  computed: {
    retrieveProduct() {
      return this.products;
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
  },
  mounted() {
    this.refreshList();
    this.getCategory();
  },
};
</script>

<style scoped></style>
