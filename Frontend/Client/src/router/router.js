import {
  createRouter,
  createWebHistory
} from 'vue-router';
import Home from '../view/Home.vue';
import Products from '../view/Products.vue';
import Contact from '../view/Contact.vue';
import Login from '../view/Login.vue'
import Addcart from '../view/Addcart.vue';
import Signup from '../view/Signup.vue'
import Overview from '../view/Overview.vue'

const routes = [{
    path: '/',
    component: Home,
  },
  {
    path: '/Products',
    component: Products,
  },
  {
    path: '/Contact',
    component: Contact,

  },
  {
    path: '/Login',
    component: Login,

  },
  {
    path: '/Addcart',
    component: Addcart,

  },
  {
    path: '/Signup',
    component: Signup,

  },
  {
    path: '/Overview',
    component: Overview,

  },


];

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes,
});

export default router;