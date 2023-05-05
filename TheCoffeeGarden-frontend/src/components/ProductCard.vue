<script>
export default {
  props: {
    products: { type: Object},
  },
};
</script>
<template>
  <!-- <div class="container row">
      <div class="col-md-6 p-1">
        <img :src="`data:image/*;base64,${product.image[0].data}`">
      </div>
      <div class="col-md-6 p-1">
        <div class="p-1">
          <strong>Title:</strong>
          {{ product.title }}
        </div>
        <div class="p-1">
          <strong>Category:</strong>
          {{ product.category }}
        </div>
        <div class="p-1">
          <strong>Price:</strong>
          {{ product.price }}
        </div>
        <div class="p-1">
          <strong>Description:</strong>
          {{ product.description }}
        </div>
        <div class="p-1">
          <strong>Favorite:&nbsp;</strong>
          <i v-if="product.favorite" class="fas fa-check"></i>
          <i v-else class="fas fa-times"></i>
        </div>
      </div>
  </div> -->
  <div v-if="products">
    <section class="py-5">
    <div class="container px-4 px-lg-5 my-5">
      <div class="row gx-4 gx-lg-5 align-items-center">
        <div class="col-md-6">
          <img class="card-img-top mb-5 mb-md-0" :src="`data:image/*;base64,${products.image[0].data}`" />
        </div>
        <div class="col-md-6">
          <h1 class="display-5 fw-bolder">{{ products.title }}</h1>
          <div class="fs-5 mb-5">
            <span>Price: {{ products.price }}$</span>
          </div>
          <p class="lead">{{ products.description }}</p>
          <div class="d-flex">
            <input
              class="form-control text-center me-3"
              id="inputQuantity"
              type="num"
              value="1"
              style="max-width: 3rem"
            />
            <button class="btn btn-outline-dark flex-shrink-0" type="button">
              <i class="fas fa-cart-shopping"></i> Add To Cart 
            </button>
            <button class="btn btn-outline-dark flex-shrink-0 mx-3" type="button">
              <i v-if="products.favorite" class="fas fa-heart" style="color: red;"></i>
              <i v-else class="far fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div> 
</template>
<style scoped>
@import '../styles-itemspage.css';
</style>
