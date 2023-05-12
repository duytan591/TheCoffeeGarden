<template>
  <div v-if="product">
    <section class="py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
          <div class="col-md-6">
            <img
              class="card-img-top mb-5 mb-md-0"
              :src="`data:image/*;base64,${product.image[0].data}`"
            />
          </div>
          <div class="col-md-6">
            <h1 class="display-5 fw-bolder">{{ product.title }}</h1>
            <div class="fs-5 mb-5">
              <span>Price: {{ product.price }}$</span>
            </div>
            <p class="lead">{{ product.description }}</p>
            <div class="d-flex">
              <input
                class="form-control text-center me-3"
                type="number"
                style="max-width: 3rem"
                v-model="quantity"
                
              />
              <button
                class="btn btn-outline-dark flex-shrink-0"
                type="button"
                @click="addToCart"
              >
                <i class="fas fa-cart-shopping"></i> Add To Cart
              </button>
              <button
                class="btn btn-outline-dark flex-shrink-0 mx-3"
                type="button"
                @click="addToFavorite"
              >
                <i
                  v-if="product.favorite"
                  class="fas fa-heart"
                  style="color: red"
                ></i>
                <i v-else class="far fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  emits: ["add:cart", "add:favorite"],
  props: {
    product: { type: Object },
    favorite: { type: Object},
    quantity:{type: Object},
  },
  data() {
    return {
      quantity: {},
    };
  },
  methods: {
    addToCart() {
      this.$emit("add:cart", { quantity: this.quantity });
    },
    addToFavorite() {
      this.$emit("add:favorite");
    },
  },
};
</script>

<style scoped>
@import "../styles-itemspage.css";
</style>
