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
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Products Manager</h1>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Title</th>
          <th scope="col">Category</th>
          <th scope="col">Price</th>
          <th scope="col">Description</th>
          <th scope="col">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(product, index) in products"
          :key="product._id"
          :class="{ active: index === activeIndex }"
          @click="updateActiveIndex(index)"
        >
          <td>{{ index+1 }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.category[0].category_title }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>
            <router-link
              :to="{
                name: 'product.edit',
                params: { id: product._id },
              }"
            >
              <i class="btn fas fa-edit"></i>
            </router-link>

            <i class="btn fas fa-trash"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
