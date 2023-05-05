<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand" href="/">The Coffee Garden</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Shop</a
            >
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#!">All Products</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#!">Popular Items</a></li>
              <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
            </ul>
          </li>
        </ul>
        <button class="btn btn-outline-dark">
          <i class="bi-cart-fill me-1 fas fa-cart-shopping"></i>
          Cart
        </button>
      </div>
      <div class="d-flex" v-if="isAuth() == true">
        <router-link
          to="/"
          @click="logout"
          class="mx-3 text-dark"
          style="text-decoration: none"
        >
          Logout
        </router-link>
      </div>
      <div class="d-flex" v-if="isAuth() == false">
        <router-link
          :to="{ name: 'login' }"
          class="mx-3 text-dark"
          style="text-decoration: none"
        >
          Login
        </router-link>
        <router-link
          :to="{ name: 'register' }"
          class="mx-3 text-dark"
          style="text-decoration: none"
        >
          Register
        </router-link>
      </div>
      <div class="d-flex" v-if="isAuth() == true && isAdmin() == true">
        <router-link
          :to="{ name: 'admin.panel' }"
          class="mx-3 text-dark"
          style="text-decoration: none"
        >
          Manage
        </router-link>
      </div>
      <button @click="isAdmin">Test</button>
    </div>
  </nav>
</template>

<script>
import UserService from "../services/user.service";
export default {
  data() {
    return {
      user:''
    };
  },
  methods: {
    isAuth(){
      const check = sessionStorage.getItem('user-info');
      if(check){
        return true;
      }
      return false;
    },

    isAdmin(){
      const checkAd = sessionStorage.getItem('user-role');
      console.log(checkAd)
      if(checkAd == 'true'){
        return true;
      } else if(checkAd == 'false'){
        return false;
      }
      return null;
    },
    async logout() {
      try {
        await UserService.logOut();
        sessionStorage.clear();
        // this.$router.push({ name: "coffeegarden" });
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import "../styles-homepage.css";
</style>
