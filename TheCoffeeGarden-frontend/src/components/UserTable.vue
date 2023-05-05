<script>
export default {
  props: {
    users: { type: Array, default: [] },
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
    <h1 class="h2">Users Manager</h1>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Tools</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="user._id"
          :class="{ active: index === activeIndex }"
          @click="updateActiveIndex(index)"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td v-if="!user.role">User</td>
          <td v-if="user.role">Admin</td>
          <td v-if="!user.status">In use</td>
          <td v-if="user.status">Disable</td>
          <td>
            <i class="btn fas fa-edit"></i> <i class="btn fas fa-trash"></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
