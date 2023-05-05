<script>
  import NavBar from './components/AppNavbar.vue';
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';
  export default {
    components: {
      NavBar,
      AppHeader,
      AppFooter,
    }
  }
</script>


<template>
  <div id="app">
    <NavBar/>

    <AppHeader/>
    <div class="container mt-3">
      <router-view />
    </div>
    
    <AppFooter/>
  </div>
</template>


<style>
</style>
