import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";
import Products from "../view/Products.vue";
import Contact from "../view/Contact.vue";
import Login from "../login.vue";
import Addcart from "../view/Addcart.vue";
import Signup from "../Signup.vue";
import Overview from "../view/Overview.vue";

const routes = [
  {
    meta: { requiresAuth: true },
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Products",
    name: "Products",
    component: Products,
  },
  {
    path: "/Contact",
    component: Contact,
  },
  {
    path: "/Addcart",
    component: Addcart,
  },
  {
    path: "/Signup",
    component: Signup,
  },
  {
    path: "/Overview",
    component: Overview,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
// sử dụng để thiết lập các điều kiện hay hành động trước khi chuyển đến một route mới.
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("token"); // Kiểm tra xem người dùng đã đăng nhập hay chưa

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated
  ) {
    // Nếu trang yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
