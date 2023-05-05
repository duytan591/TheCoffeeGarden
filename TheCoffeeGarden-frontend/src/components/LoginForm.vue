<template>
  <section>
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6 ">
            <div class="card" style="border-radius: 15px ">
              <div class="card-body p-5 bg-image h-100">
                <h2
                  class="text-uppercase text-center mb-5"
                  style="
                    font-family: 'Dancing Script', cursive;
                    font-size: 50px;
                  "
                >
                  Login
                </h2>

                <Form @submit="submit" :validation-schema="loginFormSchema">
                  <div class="form-outline mb-4">
                    <label class="form-label">User Name</label>
                    <Field
                      name="username"
                      type="text"
                      class="form-control form-control-lg"
                      v-model="userLocal.username"
                    />
                  </div>
                  <ErrorMessage name="username" class="error-feedback text-danger" />

                  <div class="form-outline mb-4">
                    <label class="form-label">Password</label>
                    <Field
                      name="password"
                      type="password"
                      class="form-control form-control-lg"
                      v-model="userLocal.password"
                    />
                  </div>
                  <ErrorMessage name="password" class="error-feedback text-danger" />

                  <div class="form-check d-flex mb-5">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      value=""
                    />
                    <label class="form-check-label"> Remember Me </label>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      @click="submit"
                    >
                      Sign In
                    </button>
                  </div>

                  <p class="text-center text-muted mt-5 mb-0">
                    Do not have an account?
                    <router-link
                      :to="{ name: 'register' }"
                      class="fw-bold text-body"
                      ><u>Sign up here</u></router-link
                    >
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:user"],
  props: {
    user: { type: Object, required: true },
  },
  data() {
    const loginFormSchema = yup.object().shape({
      username: yup.string().required("Vui lòng nhập tên đăng nhập"),
      password: yup.string().required("Vui lòng nhập mật khẩu"),
    });
    return {
      userLocal: this.user,
      loginFormSchema,
    };
  },

  methods: {
    submit() {
      this.$emit("submit:user", { user: this.userLocal });
    },
  },
};
</script>

<style scoped>
.bg-image {
  background-image: url("https://i.pinimg.com/564x/80/e1/75/80e17502f1089f45d15f1ff9a32e242b.jpg");
  border-radius: 15px;
}
</style>
