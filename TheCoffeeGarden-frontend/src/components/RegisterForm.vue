<template>
  <section>
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card">
              <div class="card-body p-5 vh-100 bg-image">
                <h2
                  class="text-uppercase text-center mb-5"
                  style="
                    font-family: 'Dancing Script', cursive;
                    font-size: 50px;
                  "
                >
                  Register
                </h2>

                <Form @submit="submit" :validation-schema="registerFormSchema">
                  <div class="form-outline mb-3">
                    <label class="form-label" for="username">User Name</label>  
                    <Field
                      name="username"
                      type="text"
                      class="form-control form-control-lg"
                      v-model="userLocal.username"
                    />
                  </div>
                  <ErrorMessage name="username" class="error-feedback text-danger" />
                  <div class="form-outline mb-3">
                    <label class="form-label">Email</label>
                    <Field
                      name="email"
                      type="email"
                      class="form-control form-control-lg"
                      v-model="userLocal.email"
                    />
                  </div>
                  <ErrorMessage name="email" class="error-feedback text-danger" />
                  <div class="form-outline mb-3">
                    <label class="form-label">Password</label>
                    <Field
                      name="password"
                      type="password"
                      class="form-control form-control-lg"
                      v-model="userLocal.password"
                    />
                  </div>
                  <ErrorMessage name="password" class="error-feedback text-danger" />
                  <!-- <div class="form-outline mb-3">
                    <label class="form-label">Confirm Password</label>
                    <Field
                      name="passwordConfirm"
                      type="password"
                      class="form-control form-control-lg"
                    />
                  </div>
                  <ErrorMessage name="passwordConfirm" class="error-feedback text-danger" />
                  <div class="form-check d-flex justify-content-center mb-3">
                    <Field
                      name="statementCheck"
                      class="form-check-Form me-2"
                      type="checkbox"
                    />
                    <label class="form-check-label">
                      I agree all statements in
                      <a href="#!" class="text-body"><u>Terms of service</u></a>
                    </label>
                  </div>
                  <ErrorMessage name="statementCheck" class="error-feedback text-danger" /> -->
                  <div class="d-flex justify-content-center">
                    <button
                      type="button"
                      @click="submit"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                    >
                      Sign Up
                    </button>
                  </div>
                  <p class="text-center text-muted mt-3 mb-0">
                    Have already an account?
                    <router-link :to="{ name: 'login' }" class="fw-bold text-body"
                      ><u>Sign in here</u></router-link
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
    const registerFormSchema = yup.object().shape({
      username: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự.")
        .required("Tên phải có giá trị."),
      email: yup.string().required("Vui long nhap email.").email(),
      password: yup
        .string()
        .min(6, "Mật khẩu phải có ít nhất 6 kí tự")
        .required("Vui lòng nhập mật khẩu"),
      // passwordConfirm: yup
      //   .string()
      //   .oneOf([yup.ref("password"), null], "Mật khẩu phải trùng khớp.").required("Vui lòng nhập mật khẩu"),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // userLocal để liên kết với các input trên form
      userLocal: this.user,
      registerFormSchema,
    };
  },
  methods: {
    submit() {
      this.$emit("submit:user",{user: this.userLocal})
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
