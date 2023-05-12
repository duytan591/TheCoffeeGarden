<template>
  <section class="h-100 h-custom" style="background-color: #d2c9ff">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div
            class="card card-registration card-registration-2"
            style="border-radius: 15px"
          >
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div
                      class="d-flex justify-content-between align-items-center mb-5"
                    >
                      <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                      <h6 class="mb-0 text-muted">3 items</h6>
                    </div>
                    <hr class="my-4" />
                   
                    <!-- Cart Items -->
                    <CartItems :cartItems="check" />


                    <div class="pt-5">
                      <h6 class="mb-0">
                        <router-link
                          :to="{ name: 'coffeegarden' }"
                          class="text-body"
                          ><i class="fas fa-long-arrow-alt-left me-2"></i>Back
                          to shop</router-link
                        >
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">items 3</h5>
                      <h5>€ 132.00</h5>
                    </div>

                    <h5 class="text-uppercase mb-3">Shipping</h5>

                    <div class="mb-4 pb-2">
                      <select class="select">
                        <option value="1">Standard-Delivery- €5.00</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                      </select>
                    </div>

                    <h5 class="text-uppercase mb-3">Give code</h5>

                    <div class="mb-5">
                      <div class="form-outline">
                        <input
                          type="text"
                          id="form3Examplea2"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Examplea2"
                          >Enter your code</label
                        >
                      </div>
                    </div>

                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-5">
                      <h5 class="text-uppercase">Total price</h5>
                      <h5>€ 137.00</h5>
                    </div>

                    <button
                      type="button"
                      class="btn btn-dark btn-block btn-lg"
                      data-mdb-ripple-color="dark"
                    >
                      Take it
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserService from "../services/user.service";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";
import CartItems from "../components/CartItems.vue";
export default {
  props: {
    products: { type: Array, default: [] },
    category: { type: Object },
  },
  components:{
    CartItems
  },
  data() {
    return {
      products: {},
      user: {},
      check:[],
      checks:[],
      summary:[]
    };
  },
  methods: {
    async getCartItems(){
      try {
        this.user = JSON.parse(sessionStorage.getItem('user-info'));
        this.checks = JSON.parse(localStorage.getItem(`cart-${this.user._id}`))
        if(this.checks == null || this.checks.length==0 || this.checks == undefined){
          confirm("You are not loggin")
          this.$route.push('login')
        }
        for(const i in this.checks){
          this.products = await ProductService.get(this.checks[i].id);
          this.check.push(this.products)
          this.check[i][0].quantity = this.checks[i].quantity
          this.check[i][0].totalPrice = this.checks[i].quantity * this.check[i][0].price
        }
      } catch (error) {
        console.log(error)
      }
    },
    async deleteItems(emitPayload){
      if(confirm("Do you want to do do it?")){
        try {
          var checks = JSON.parse(localStorage.getItem(`cart-${this.user._id}`))
          checks.forEach((value, index) => {
            if(index == emitPayload.id.id){
              var a = checks.slice(0, index)
              var b = checks.slice(index +1, checks.length)
              var c = a.concat(b);
              localStorage.setItem(`cart-${this.user._id}`,JSON.stringify(c))
              confirm("Deleted successfully")
              location.reload()
            }
            console.log(emitPayload.id.id)
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  // mounted(){
  //   return this.check
  // }
};
</script>

<style scoped>
/* @import '../styles-cartpage.css'; */
</style>
