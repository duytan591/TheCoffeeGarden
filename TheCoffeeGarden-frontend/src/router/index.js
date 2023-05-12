import { createRouter, createWebHistory } from "vue-router";
import CoffeeGarden from "../views/ProductPage.vue";

const routes = [
  {
    path: "/",
    name: "coffeegarden",
    component: CoffeeGarden,
  },
  {
    path:"/login",
    name:"login",
    component: () => import("../views/Login.vue"),
  },
  {
    path:"/register",
    name:"register",
    component: () => import("../views/Register.vue"),
  },   
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/products/edit/:id",
    name: "product.edit",
    component: () => import("../views/EditProduct.vue"),
    props: true // Truyền các biến trong $route.params vào làm props
  },
  {
    path:"/products/create",
    name:"product.add",
    component: () => import("../views/AddProduct.vue"),
  },
  {
    path: "/products/:id",
    name: "product.detail",
    component: () => import("../views/ProductDetailPage.vue"),
    props: true // Truyền các biến trong $route.params vào làm props
  },
  {
    path:"/products/filter/:name",
    name:"category",
    component: () => import("../views/ProductPage.vue"),
    props:true
  },
  {
    path:"/admin",
    name:"admin.panel",
    component:() => import("../views/AdminPanel.vue"),
  },
  {
    path:"/admin/usermanager",
    name:"user.manager",
    component:() => import("../views/UserManager.vue"),
  },
  {
    path:"/admin/ordermanager",
    name:"order.manager",
    component:() => import("../views/OrderManager.vue"),
  },
  {
    path:"/cart",
    name:"cart",
    component: () => import("../views/CartPage.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
