<template>
  <Form @submit="submitProduct" :validation-schema="productFormSchema">
    <div class="form-group">
      <label for="image">Ảnh sản phẩm</label>
      <input 
        type="file"
        name="image"
        @change="handleUploadImg"
        class="form-control"
      >
    </div>
    <ErrorMessage name="image" class="error-feedback" />
    <div class="form-group">
      <label for="title">Tên sản phẩm:</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="productLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="category">Phân Loại:</label>
      <select 
        name="category" 
        class="form-control"
        v-model="productLocal.category"
      >
        <option v-for="category in categories" :value="category.category_title">{{ category.category_title }}</option>
      </select>
      <ErrorMessage name="category" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="price">Đơn giá:</label>
      <Field
        name="price"
        type="number"
        class="form-control"
        v-model="productLocal.price"
      />
      <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="description">Mô tả sản phẩm:</label>
      <Field
        name="description"
        type="text"
        class="form-control"
        v-model="productLocal.description"
      />
      <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group form-check">
      <input
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="productLocal.favorite"
      />
      <label for="favorite" class="form-check-label">
        <strong>Sản phẩm yêu thích</strong>
      </label>
    </div>
    <div class="form-group">
      <button class="btn btn-primary" @click="submitProduct">Lưu</button>
      <button
        v-if="productLocal._id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteProduct"
      >
        Xóa
      </button>
    </div>
  </Form>
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
  emits: ["submit:product", "delete:product"],
  props: {
    product: { type: Object, required: true },
    categories: {type: Object, required: true}
  },
  data() {
    const productFormSchema = yup.object().shape({
      title: yup
        .string()
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự.")
        .required("Tên phải có giá trị."),
      description: yup
        .string()
        .required("Nhập mô tả !"),
      price: yup
        .number()
        .required("Nhập giá !"),
    });
    return {
      // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
      // ProductLocal để liên kết với các input trên form
      productLocal: this.product,
      productFormSchema,
    };
  },
  methods: {
    submitProduct() {
      this.$emit("submit:product", {product:this.productLocal,image:this.image});
    },
    deleteProduct() {
      this.$emit("delete:product", this.productLocal.id);
    },
    handleUploadImg(evt){
      this.image = evt.target.files[0]
    }
  },
};
</script>
<style scoped>
@import "../assets/form.css";
</style>
