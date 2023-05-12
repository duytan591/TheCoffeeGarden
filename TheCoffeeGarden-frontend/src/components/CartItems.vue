<template>
  <div class="product-container" v-for="(item, i) in cartItems" :key="item.id">
    <!-- Cart items -->
    <div class="row mb-4 d-flex justify-content-between align-items-center">
      <div class="col-md-3 col-lg-3 col-xl-3">
        <input type="checkbox" @click="addCartItems">
      </div>
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img
          :src="`data:image/*;base64,${item.image[0].data}`"
          class="img-fluid rounded-3"
        />
      </div>    
      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-muted">{{item.category}}</h6>
        <h6 class="text-black mb-0">{{ item.title }}</h6>
      </div>
      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
        <button
          class="btn btn-link px-2"
          @click="decrease"
        >
          <i class="fas fa-minus"></i>
        </button>

        <input
          id="form1"
          min="0"
          name="quantity"
          :value="`${quantity}`"
          type="number"
          class="form-control form-control-sm"
        />
        <button
          class="btn btn-link px-2"
          @click="increase"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 class="mb-0">$ {{ item.price }}</h6>
      </div>
      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
        <h6 class="mb-0">$ {{ item.totalPrice }}</h6>
      </div>
      <div class="col-md-1 col-lg-1 col-xl-1 text-end" @click="deleteProduct(i)">
        <div class="text-muted"><i class="fas fa-times"></i></div>
      </div>
    </div>
    <hr class="my-4" />
  </div>
</template>

<script>
import ProductService from '../services/product.service';

export default {
  props:{
    cartItems:{type:Object},
    index: {type: Number},
  },
  emits:["delete:product","add:cartItems"],
  data(){
    return {
      product: {},
      cartTotalPrice: 0,
      quantity: this.cartItems[0].quantity
    }
  },
  methods:{
    async getCartItems(){
      this.product = await ProductService.get(this.cartItems[0].id)     
      this.product = this.product[0];
      this.totalPrice = this.quantity * this.product.price;

    },
    deleteProduct(id){
      this.$emit("delete:product",{id: id})
    },
    addCartItems(){
      this.cartItems[0].quantity = this.quantity
      this.cartItems[0].totalPrice = this.totalPrice
      this.$emit("add:cartItems", this.cartItems)
    },
    getPrice(){
      this.cartTotalPrice = this.quantity * this.product.price
    },
    increase(){
      this.quantity++
      this.getPrice()
    },
    decrease(){
      this.quantity--
      this.getPrice()
    },
    reload(){
      this.getCartItems()
    }
  },
  mounted(){
    this.reload()
  }
}

</script>

<style scoped></style>
