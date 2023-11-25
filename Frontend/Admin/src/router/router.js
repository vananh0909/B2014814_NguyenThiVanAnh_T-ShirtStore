import { createRouter, createWebHistory } from "vue-router";
import qldanhmuc from "../view/qldanhmuc/qldanhmuc.vue";
import qlsanpham from "../view/qlsanpham/qlsanpham.vue";
import qldonhang from "../view/qldonhang.vue";
import chitietdon from "../view/chitietdon.vue";
import editproduct from "../view/qlsanpham/edit.vue";
import editcategory from "../view/qldanhmuc/edit.vue";
import login from "../login.vue";
//Ch dang nhap. chỉ load được trang login
const routes = [
  {
    path: "/loginadmin",
    name: "LoginAdmin",
    component: login,
  },
  {
    // path: "/",
    // component: () => import("../../src/App.vue"),
    meta: { requiresAuth: true }, //đánh dấu các trang yêu cầu xác thực. 
    //neu meta requiresauth == false đã xác thực rồi. có thể chạy trang bên dưới
    children: [ 
      {
        path: "/",
        component: qldanhmuc,
      },
      {
        path: "/qlsanpham",
        name: "qlsp",
        component: qlsanpham,
      },
      {
        path: "/qldonhang",
        component: qldonhang,
      },
      {
        path: '/chitietdon/:customerId',
        name: "chitietdon",
        component: chitietdon,
        props: true,
      },
      {
        path: "/edit/:productId",
        name: "edit",
        component: editproduct,
      },
      {
        path: "/editcategory/:categoryId",
        name: "editcategory",
        component: editcategory,
      },
    ]
  }
  ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
// Kiểm tra xem người dùng đã đăng nhập hay chưa
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem("token"); 
  // console.log(`isAuthenticated `, isAuthenticated);
  // const customerId = sessionStorage.getItem("customerId");
  // const customerName = sessionStorage.getItem("customerName");
  // const role = sessionStorage.getItem("role");
  // console.log(customerId, customerName, role);
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated //ktra người dùng có được xác thực k. False== k có quyền truy cập chuyển hướng
  ) {
    // Nếu trang yêu cầu xác thực và người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    next({ name: "LoginAdmin" }); // k tồn tại token 
  } else {
    next();
  }
});
export default router;
