<script>
export default {
  props: {
    orders: { type: Array, default: [] },
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
    <h1 class="h2">Orders Manager</h1>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">User</th>
          <th scope="col">Items</th>
          <th scope="col">Total Price</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Date Ordered</th>
          <th scope="col">Status</th>
          <th scope="col">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in orders"
          :key="order._id"
          :class="{ active: index === activeIndex }"
          @click="updateActiveIndex(index)"
        >
          <td>{{ index+1 }}</td>
          <td>{{ order.user[0].username }}</td>
          <td>{{ order.orderItems }}</td>
          <td>{{order.totalPrice}}</td>
          <td>{{ order.phone }}</td>
          <td>{{ order.shippingAddress }}</td>
          <td>{{ order.dateOrdered }}</td>
          <td v-if="!order.status">Shipping</td>
          <td v-if="order.status">Complete</td>
          <td>
              <i class="btn fas fa-edit"></i> <i class="btn fas fa-trash"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
