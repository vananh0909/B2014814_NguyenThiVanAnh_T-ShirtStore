<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <img class="img" src="../assets/img/cart.png" />
        <div class="gach-ngang"></div>
        <div class="item">
          <p style="margin-left: 4px">Sản phẩm</p>
          <p style="margin-left: 200px">Tên</p>
          <p style="margin-left: 100px">Số lượng</p>
          <p style="margin-left: 65px">Màu</p>
          <p style="margin-left: 38px">Size</p>
          <p style="margin-left: 80px">Tổng tiền</p>
          <p style="margin-left: 140px">Xóa</p>
        </div>
        <div class="gach-ngang2"></div>
        <div class="nd" v-for="product in data.items">
          <img class="anh" :src="product.product.images" />
          <div style="margin-left: 40px; margin-top: 40px">
            <p
              style="
                font-size: 16px;
                width: 150px;
                height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ product.product.name }}
            </p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              margin-left: 20px;
              /* margin-top: -38px; */
              margin-top: 35px;
              width: 150px;
              height: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            <button @click="decrementQuantity(product)">-</button>
            <input
              style="width: 60px; text-align: center"
              :value="product.quantity"
              type="text"
            />
            <button @click="incrementQuantity(product)">+</button>
          </div>
          <div style="margin-left: 30px; margin-top: 38px">
            <p>{{ product.color }}</p>
          </div>
          <div style="margin-left: 45px; margin-top: 38px">
            <p>{{ product.size }}</p>
          </div>
          <div
            style="
              width: 150px;
              height: 50px;
              margin-left: 70px;
              margin-top: 38px;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 18px;
            "
          >
            <p>{{ product.product.price * product.quantity }}</p>
          </div>
          <div
            style="width: 150px; height: 50px; margin-top: 50px"
            @click="deleteCart(product._id)"
          >
            <p style="margin-left: 90px">
              <i class="fas fa-trash-alt"></i>
            </p>
          </div>
        </div>
        <div class="gach-ngang2"></div>
      </div>
      <div class="col-md-3 offset-md-1">
        <div class="ttoan">
          <h3
            style="
              text-align: center;
              font-size: 18px;
              margin: 10px 0;
              color: rgb(35, 35, 35);
              font-family: Helvetica, Arial, sans-serif;
            "
          >
            Tổng Tiền
          </h3>
          <div class="gach-ngang3"></div>
          <div style="height: 40px; text-align: center">
            <p
              style="margin-top: 30px; font-size: 20px; color: rgb(54, 54, 54)"
            >
              {{ getTotalAmountFormatted() }}
            </p>
          </div>
          <div style="margin-top: 20px; text-align: center">
            <button
              style="font-size: 20px"
              @click="buycart"
              type="button"
              class="btn btn-secondary"
            >
              Đặt Hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cart from "../services/cart.service";
import { onMounted, reactive } from "vue";
import {
  http_getAll,
  http_deleteOne,
  http_create,
  http_update,
  http_getOne,
} from "../assets/js/common.http";
import Order from "../services/order.service";
import { alert_success } from "../../../Admin/src/assets/js/common.alert";
export default {
  setup() {
    const data = reactive({
      items: [],
      idCart: [],
    });
    const refresh = async () => {
      data.items = await http_getAll(Cart);
      const id = sessionStorage.getItem("CustomerId");
      data.items = data.items.filter((item) => item.customerId === id);
      data.items = data.items.filter((item) => item.status === false);
      for (const item of data.items) {
        data.idCart.push(item._id);
      }
      data.items.forEach((item) => {
        item.product.totalPrice = item.product.price * item.quantity;
      });
    };
    const incrementQuantity = (product) => {
      product.quantity++;
      updateTotalPrice(product);
    };
    const decrementQuantity = (product) => {
      if (product.quantity > 1) {
        product.quantity--;
        updateTotalPrice(product);
      }
    };
    const updateTotalPrice = (product) => {
      // Update the total price based on the new quantity
      product.product.totalPrice = product.product.price * product.quantity;
    };
    let totalAmount = 0;
    const getTotalAmountFormatted = () => {
      totalAmount = 0;
      for (const product of data.items) {
        totalAmount = totalAmount + parseFloat(product.product.totalPrice);
      }
      return totalAmount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    };

    const deleteCart = async (_id) => {
      const dltCart = await http_deleteOne(Cart, _id);
      if (dltCart) {
        await refresh();
        getTotalAmountFormatted();
      }
    };
    const buycart = async () => {
      const id = sessionStorage.getItem("CustomerId");
      const databuy = {
        customer: id,
        cart: data.idCart,
        total: totalAmount,
      };
      const addBuy = await http_create(Order, databuy);
      if (addBuy) {
        for (const cartId of data.idCart) {
          const existingCartItem = await http_getOne(Cart, cartId);
          const updatePayload = {
            product: existingCartItem.product,
            quantity: existingCartItem.quantity,
            color: existingCartItem.color,
            size: existingCartItem.size,
            customerId: existingCartItem.customerId,
            status: true,
          };
          const updateStatus = await http_update(Cart, cartId, updatePayload);
          if (updateStatus) {
            totalAmount = 0;
          }
          const updatedQuantity = data.items.find(
            (item) => item._id === cartId
          )?.quantity;
          if (
            updatedQuantity !== undefined &&
            updatedQuantity !== existingCartItem.quantity
          ) {
            updatePayload.quantity = updatedQuantity;
            const updateStatus = await http_update(Cart, cartId, updatePayload);

            if (updateStatus) {
              totalAmount = 0;
            }
          }
        }

        alert_success("Thông Báo", "Bạn đã đặt hàng thành công");
        await refresh();
      }
    };
    onMounted(() => {
      refresh();
    });
    return {
      data,
      incrementQuantity,
      decrementQuantity,
      getTotalAmountFormatted,
      deleteCart,
      totalAmount,
      buycart,
    };
  },
};
</script>

<style scoped>
.container {
  height: auto;
  margin-bottom:5%;
}
.gach-ngang {
  border-top: 1px solid #bdbdbd; /* Màu và chiều dày của đường kẻ ngang */
  width: 100%;
  margin-top: 8%;
}
.gach-ngang2 {
  border-top: 1px solid #bdbdbd; /* Màu và chiều dày của đường kẻ ngang */
  width: 100%;
  /* margin-top: 2px; */
}
.gach-ngang3 {
  border-top: 1px solid #bdbdbd; /* Màu và chiều dày của đường kẻ ngang */
  width: 100%;
  margin-top: 20px;
}
.img {
  float: left;
  width: 14%;
  height: auto;
  margin-top: 20px;
}
.item {
  display: flex;
  margin-top: 3px;
}
.anh {
  max-width: 100%; /* Đảm bảo ảnh sản phẩm không vượt quá chiều rộng của phần tử cha */
  width: 130px;
  height: auto;
}

.nd {
  display: flex;
  color: rgb(35, 35, 35);
}
.fa-trash-alt:hover {
  color: red;
  cursor: pointer;
}

.ttoan {
  /* background-color: rgb(123, 81, 29);  */
  width: 100%;
  height: 200px;
  border: 1px solid #bdbdbd; /* Màu và chiều dày của đường kẻ ngang */
  margin-top: 22%;
}

.btn-secondary:hover {
  background-color: cadetblue;
}
</style>
