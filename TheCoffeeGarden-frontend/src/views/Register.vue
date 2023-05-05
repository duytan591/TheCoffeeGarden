<template>
  <div  class="container mt-3">
    <RegisterForm :user="user" @submit:user="register" />
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";
import UserService from "../services/user.service";
export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    RegisterForm,
  },
  methods: {
     async register(data) {
      try {
        const result =  await UserService.signUp(data.user);
        // localStorage.setItem("user-info",JSON.stringify(result));
        // console.log(result);
        await this.$router.push({name: 'login'});
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },   
  },
};
</script>

<style></style>
