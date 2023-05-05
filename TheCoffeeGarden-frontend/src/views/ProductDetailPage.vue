<template>
  <div class="container mt-3">
    <ProductCard :products="returnProduct" />
  </div>
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
      product:{},
      user:{},
    };
  },
  methods: {
    async retriveProduct () {
      try {
        this.product = await ProductService.get(this.$route.params.id)
        // console.log(this.product)
        // this.refreshList()
      } catch (error) {
        console.log(error)
      }
    },
    refreshList(){
      this.retriveProduct()
    }
  },
  mounted(){
    this.refreshList()

  },
  computed:{
    returnProduct(){
      // console.log(this.product)
      return this.product[0]
    }
  }
};
</script>

<style scoped>
@import "../styles-itemspage.css";
</style>
