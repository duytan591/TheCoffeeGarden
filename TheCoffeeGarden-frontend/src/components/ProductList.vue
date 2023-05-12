<script>
export default {
  props: {
    products: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>
<template>
<div class="col mb-5"
    v-for="(product, index) in products"
    :key="product._id"
    :class="{ active: index === activeIndex }"
    @click="updateActiveIndex(index)"
    >
  <div class="card h-100">
    <div class="badge bg-dark text-white position-absolute" v-if="product.favorite" style="top: 0.5rem; right: 0.5rem">Most Favorite</div>
    <!-- Product image-->
    <img
      class="card-img-top"
      :src="`data:image/*;base64,${product.image[0].data}`"
    />
    <!-- Product details-->
    <div class="card-body p-4">
      <div class="text-center">
        <!-- Product name-->
        <h5 class="fw-bolder">{{ product.title }}</h5>
        <!-- Product price-->
        ${{ product.price }}
      </div>
    </div>
    <!-- Product actions-->
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
      <div class="text-center">
          <router-link :to="{
            name:'product.detail',
            params:{id: product._id},
          }">
        <button class="btn btn-outline-dark mt-auto" >
          View options
        </button>  
      </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
@import "../styles-homepage.css";
</style>