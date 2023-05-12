<template>
  <div class="container mt-3">
    <LoginForm :user="user" @submit:user="login" />
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import UserService from "../services/user.service";
export default {
  data() {
    return {
      user: {},
    };
  },
  components: {
    LoginForm,
  },
  methods: {
     async login(data) {
      try {
        const result =  await UserService.signIn(data.user);
        sessionStorage.setItem("user-info",JSON.stringify(result));
        sessionStorage.setItem("user-role",JSON.stringify(result.role));
        await this.$router.push({name: 'coffeegarden'});
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },   
  },
};
</script>



<style></style>
