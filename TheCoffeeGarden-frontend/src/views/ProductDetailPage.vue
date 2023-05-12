<template>
  <div class="container mt-3">
    <ProductCard
      :product="returnProduct"
      @add:cart="addToCart"
      @add:favorite="addToFavorite"
      :quantity="quantity"
    />
  </div>
  <button @click="test">TEST</button>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import ProductList from "../components/ProductList.vue";
import ProductService from "../services/product.service";
export default {
  components: {
    ProductCard,
    ProductList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      product: {},
      user: {},
      favoriteList: {},
      temp: {},
      checks: [],
      check: [],
      products:[],
    };
  },
  methods: {
    async test() {
      this.user = JSON.parse(sessionStorage.getItem("user-info"));
      // console.log(this.user);
      this.checks = JSON.parse(localStorage.getItem(`cart-${this.user._id}`));
      console.log(this.check);
      // for(const i in this.checks){
      //     this.products = await ProductService.get(this.checks[i].id);        
      //     this.check.push(this.products)
      //     this.check[i][0].quantity = this.checks[i].quantity
      //     this.check[i][0].totalPrice = this.checks[i].quantity * this.check[i][0].price
      // }
      // console.log(this.check)
    },
    async addToCart(emitpayload) {
      console.log(emitpayload.quantity);
      try {
        this.user = JSON.parse(sessionStorage.getItem("user-info"));
        if (this.user == null) {
          confirm("Vui lòng đăng nhập");
          this.$router.push({ name: "login" });
          // location.reload()
        } else {
          this.checks = JSON.parse(
            localStorage.getItem(`cart-${this.user._id}`)
          );
          this.product = await ProductService.get(this.$route.params.id);
          this.temp.id = this.product[0]._id;
          this.temp.quantity = emitpayload.quantity;
          if (
            this.checks == null ||
            this.checks == undefined ||
            this.checks.length == 0
          ) {
            this.check.push(this.temp);
            confirm("Thêm sản phẩm vào giỏ hàng thành công");
            this.saveCart();
          } else {
            console.log(this.isExist(this.temp.id));
            const itemId = this.temp.id;
            if (this.isExist(itemId)) {
              this.checks.forEach((check) => {
                if (check.id == itemId) {
                  check.quantity = check.quantity + this.temp.quantity;
                  console.log(check.id);
                  console.log(this.temp.id);
                }
              });
              this.checks.forEach((value) => {
                this.check.push(value);
              });
            } else {
              this.check.push(this.temp);
              this.checks.forEach((value) => {
                this.check.push(value);
              });
            }
          }
          confirm("Thêm sản phẩm vào giỏ hàng thành công");
          this.$router.push({ name: "coffeegarden" });
          this.saveCart();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addToFavorite() {
      try {
        this.user = JSON.parse(sessionStorage.getItem("user-info"));
        if (this.user == null) {
          confirm("Vui lòng đăng nhập");
          this.$router.push({ name: "login" });
        }
        this.checks = JSON.parse(
          localStorage.getItem(`favoriteList-${this.user._id}`)
        );
        this.favoriteList = await ProductService.get(this.$route.params.id);
        this.temp = this.product[0]._id;
        if (this.checks == null ||
            this.checks == undefined ||
            this.checks.length == 0) {
          this.check.push(this.temp);
          confirm("Thêm sản phẩm vào mục yêu thích thành công");
          this.saveFavorite();
        } else {
          this.check.push(this.temp);
          // this.check.push(this.checks[0])
          this.checks.forEach((value) => {
            this.check.push(value);
          });
          confirm("Thêm sản phẩm vào mục yêu thích thành công");
          this.$router.push({ name: "coffeegarden" });
          this.saveFavorite();
          console.log(this.check);
        }
      } catch (error) {
        console.log(error);
      }
    },
    saveCart() {
      const cartCheck = JSON.stringify(this.check);
      console.log(this.check);
      localStorage.setItem(`cart-${this.user._id}`, cartCheck);
    },
    saveFavorite() {
      const favorite = JSON.stringify(this.check);
      localStorage.setItem(`favoriteList-${this.user._id}`, favorite);
    },
    isExist(itemId) {
      var flag = false;
      this.checks.forEach((value) => {
        if (value.id == itemId) {
          flag = true;
        }
      });
      return flag;
    },
    async retriveProduct() {
      try {
        this.product = await ProductService.get(this.$route.params.id);
        // console.log(this.product)
        // this.refreshList()
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retriveProduct();
    },
  },
  mounted() {
    this.refreshList();
  },
  computed: {
    returnProduct() {
      // console.log(this.product)
      return this.product[0];
    },
  },
};
</script>

<style scoped>
@import "../styles-itemspage.css";
</style>
