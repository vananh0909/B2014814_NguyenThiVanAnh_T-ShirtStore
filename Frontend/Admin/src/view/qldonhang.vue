<template>
  <div class="container mt-4">
    <h3 class="text-primary">Liệt kê đơn hàng</h3>
    <div class="d-flex align-items-center justify-content-center vh-30">
      <div class="container text-center">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th>STT</th>
              <th>Mã đơn hàng</th>
              <th>Tên Khách Hàng</th>
              <th>Tên Sản Phẩm</th>
              <th>Số lượng</th>
              <th>Màu</th>
              <th>Size</th>
              <th>Tổng Giá</th>
              <th>Ngày Đặt</th>
              <th>Thông Tin KH</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in data.items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ order._id }}</td>
              <td>{{ order.customer.name }}</td>
              <td>
                <ul class="list-unstyled">
                  <li
                    v-for="(cartItem, cartIndex) in order.cart"
                    :key="cartIndex"
                  >
                    {{ cartItem.product.name }}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-unstyled">
                  <li
                    v-for="(cartItem, cartIndex) in order.cart"
                    :key="cartIndex"
                  >
                    {{ cartItem.quantity }}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-unstyled">
                  <li
                    v-for="(cartItem, cartIndex) in order.cart"
                    :key="cartIndex"
                  >
                    {{ cartItem.color}}
                  </li>
                </ul>
              </td>
              <td>
                <ul class="list-unstyled">
                  <li
                    v-for="(cartItem, cartIndex) in order.cart"
                    :key="cartIndex"
                  >
                    {{ cartItem.size }}
                  </li>
                </ul>
              </td>
              <td>{{ order.total }} đ</td>
              <td>{{ formatCreatedAt(order.createdAt) }}</td>
              <td>
                  <!-- duong dan ben router la /chitietdon/:customerId de chuyen trang xem chi tiet khach hang can  -->
                <router-link
              
                  :to="{
                    name: 'chitietdon',
                    params: { customerId: order.customer._id },
                  }"
                  class="btn btn-outline-primary"
                >
                  Xem chi tiết
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import chitietdon from "./chitietdon.vue";
import { onMounted, reactive } from "vue";
import Order from "../services/order.service";

import {
  http_getAll,
  http_getOne,
} from "../../../client/src/assets/js/common.http";

export default {
  setup() {
    const data = reactive({
      items: [], //luu don
      // itemCus: [],
    });
    const formatCreatedAt = (createdAt) => { // format ngày tạo đơn
      const date = new Date(createdAt);
      return date.toLocaleString();  //return lại ngày và giờ
    };
    const refresh = async () => {
      //get all đơn hàng
      data.items = await http_getAll(Order);
      console.log("data.items", data.items);
      // data.items.forEach((item, index) => {
      //   console.log(`Cart of item ${index + 1}:`, item.cart);
      // });
    };

    onMounted(async () => {
      await refresh(); 
    });
    return {
      data,
      formatCreatedAt,
    };
  },
};
</script>

<style scoped>
/* .container {
  width: 80%;
  height: auto;
  margin: 0 auto;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
} */

.text {
  margin-left: 11%;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
  font-size: 25px;
}
.show {
  color: blue;
}
ul {
  list-style-type: circle;
  padding: 0; /* Remove default padding to eliminate any spacing */
}

li {
  margin-bottom: 5px; /* Optional: Add some bottom margin between list items */
}
</style>
