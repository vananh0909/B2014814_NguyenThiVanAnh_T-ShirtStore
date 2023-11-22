<template>
  <div class="modal fade" tabindex="-1" id="Detail" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Chi Tiết Sản Phẩm</h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="product-image">
                <img class="img" :src="product.images[0]" alt="Product" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="product-info">
                <h3 style="text-align: center; font-weight: bold" class="">
                  {{ product.name }}
                </h3>
                <p style="margin-left: 40%">{{ product.price }}₫</p>
                <!-- <p>MÔ TẢ SẢN PHẨM</p> -->
                <div class="gach-ngang"></div>
                <div class="thongtin">
                  <p>
                    • MÀU :
                    <span
                      v-for="(color, index) in JSON.parse(product.colors[0])"
                      :key="index"
                      class="badge bg-secondary d-inline-block p-2 w-10"
                      @click="handleColorClick(color)"
                    >
                      {{ color }}
                    </span>
                  </p>
                  <p>
                    • SIZE :
                    <span
                      v-for="(size, index) in JSON.parse(product.sizes[0])"
                      :key="index"
                      class="badge bg-secondary d-inline-block p-2 w-10"
                      @click="handleSizeClick(size)"
                    >
                      {{ size }}
                    </span>
                  </p>
                  <p>• CHẤT LIỆU : {{ product.material }}</p>
                  <p>• MÔ TẢ : {{ product.description }}</p>
                  <div class="form-group">
                    <label for="quantity">• SỐ LƯỢNG : </label>
                    <input
                      type="number"
                      id="quantity"
                      class="form-control"
                      v-model="data.quantity"
                      min="1"
                    />
                  </div>
                  <!-- <router-link to="/Addcart"> -->
                  <button
                    type="button"
                    id="them"
                    class="btn btn-danger"
                    @click="addProduct(product)"
                  >
                    <i class="fas fa-cart-plus"></i> Thêm Giỏ Hàng
                  </button>
                  <!-- </router-link> -->

                  <button type="button" @click="showBuy" class="btn btn-danger">
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <p class="small container text-center font-weight-light">
            {{ product._id }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch, reactive } from "vue";
import { alert_success, alert_error, alert_warning } from "../assets/js/common.alert";
import Cart from "../services/cart.service";
import { http_create } from "../assets/js/common.http";
import { useRouter } from "vue-router";
import Order from "../services/order.service";
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const data = reactive({
      itemSize: {},
      itemColor: {},
      quantity: "", //soluong
    });
    const router = useRouter();
    const showBuy = async() => {
      const isAuthenticated = sessionStorage.getItem("token");
      // console.log(isAuthenticated);
      if (isAuthenticated === null) {
        confirm("Bạn cần phải đăng nhập để mua hàng!")
        router.push({ name: "Login" }).then(() => {
          location.reload();
        });
        // alert_warning("Thông Báo", "Bạn Cần Đăng Nhập Trước Khi Mua Sản Phẩm")
      } else {
        // console.log("Size nè:", data.itemSize);
        // console.log("Màu nè:", data.itemColor);
        // console.log("Số lượng:", data.quantity);
        const id = sessionStorage.getItem("CustomerId")
        const dataCart = {
          customerId: id,
          product: props.product._id,
          quantity: data.quantity,
          color: data.itemColor,
          size: data.itemSize,
          status: true
        }
        // console.log(dataCart);
        const addCart = await http_create(Cart, dataCart)
        console.log(addCart);
        const idCus = sessionStorage.getItem("CustomerId");
        // console.log(idCus);
        const dataAddnow = {
          customer: idCus,
          total: props.product.price * addCart.quantity,
          cart: addCart._id
        }
        // console.log(dataAddnow);
        const buyPro = await http_create(Order, dataAddnow)
        // console.log(buyPro);
        if (buyPro) {
          alert_success(
            "Đặt hàng thành công",
            "Cảm ơn bạn đã yêu thương T-Shirt❤️!"
          );
        } else {
          alert_error("Quay Lại", "Hãy mua hàng nhé 🥹");
        }
      }
    };
    const addProduct = async (product) => {
      const id = sessionStorage.getItem("CustomerId");
      const dataCart = {
        customerId: id,
        product: product._id,
        quantity: data.quantity,
        color: data.itemColor,
        size: data.itemSize,
        // total: "0",
        status: false,
      };
      const addCart = await http_create(Cart, dataCart);
      console.log(addCart);
      alert_success(
        "Thêm Thành Công",
        `Bạn đã thêm thành công ${data.quantity} sản phẩm ${product.name} vào giỏ hàng 🫶!`
      );
    };
    // lay size
    const handleSizeClick = (clickedSize) => {
      data.itemSize = clickedSize;
      // console.log(`Clicked size: ${clickedSize}`);
    };
    // lay color
    const handleColorClick = (color) => {
      data.itemColor = color;
    };
    onMounted(() => {
      handleSizeClick();
      handleColorClick();
      // console.log("Thông tin sản phẩm:", props.product);
    });
    return {
      showBuy,
      addProduct,
      handleSizeClick,
      data,
      handleColorClick,
    };
  },
};
</script>


<style scoped>
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  overflow-y: auto;
}

.modal-title {
  color: rgb(40, 40, 40);
  font-family: "Helvetica, Arial", sans-serif;
  text-align: center;
  font-size: 18px;
  margin-left: 40%;
}

.img {
  width: 100%;
  max-width: 800px; /* Đặt giới hạn chiều rộng tối đa */
  height: auto;
}

.product-info {
  color: rgb(40, 40, 40);
  font-family: "Helvetica, Arial", sans-serif;
  text-align: left;
}
.thongtin{
  cursor: pointer;
}
.badge {
  margin-left: 10px;
}

.badge:hover {
  background-color: cadetblue !important;
}
.btn-danger {
  margin-left: 5px;

  margin-top: 4%;
}
.btn-danger:hover {
  background-color: cadetblue !important;
  color: rgb(45, 44, 44);
}
#them {
  border-color: crimson !important;
  background-color: rgb(255, 255, 255);
  color: crimson;
}
#them:hover {
  color: rgb(45, 44, 44);
}
.gach-ngang {
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
  margin-bottom: 8%;
}
.form-group {
    display: flex;
    align-items: center;
  }

  .form-group label {
    margin-right: 10px; /* Để tạo khoảng cách giữa label và input */
  }

  .form-group input {
    flex: 1; /* Để input mở rộng và đổ dữ liệu theo chiều ngang còn trống */
    max-width:90px;
  }
</style>
