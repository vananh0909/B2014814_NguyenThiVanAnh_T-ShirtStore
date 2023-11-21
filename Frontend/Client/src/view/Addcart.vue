<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <img class="img" src="../assets/img/cart.png" />
        <div class="gach-ngang"></div>
        <div class="item">
          <p style="margin-left: 4px">Sản phẩm</p>
          <p style="margin-left: 200px">Tên</p>
          <p style="margin-left: 125px">Số lượng</p>
          <p style="margin-left: 125px">Tổng tiền</p>
          <p style="margin-left: 140px">Xóa</p>
        </div>
        <div class="gach-ngang2"></div>
        <div class="nd" v-for="(product, index) in products" :key="index">
          <img class="anh" :src="product.image" />
          <div style="margin-left: 80px; margin-top: 40px">
            <p
              style="
                font-size: 16px;
                width: 150px;
                height: 50px;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ product.name }}
            </p>
          </div>

          <div
            style="
              display: flex;
              align-items: center;
              margin-left: 45px;
              /* margin-top: -38px; */
              margin-top: 35px;
              width: 150px;
              height: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            <button @click="decreaseQuantity(product)">-</button>
            <input
              style="width: 60px; text-align: center"
              type="text"
              v-model="product.soluong"
            />
            <button @click="increaseQuantity(product)">+</button>
          </div>
          <div
            style="
              width: 150px;
              height: 50px;
              margin-left: 86px;
              margin-top: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 18px;
            "
          >
            <p>{{ getTotalAmount(product) }}₫</p>
          </div>
          <div style="width: 150px; height: 50px; margin-top: 50px">
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
          <div
            style=" height: 40px; text-align: center"
          >
            <p style="margin-top: 30px;font-size: 20px;color:rgb(54, 54, 54);">
              {{ getTotalAmountFormatted() }}
            </p>
          </div>
          <div style=" margin-top: 20px; text-align: center;">
            <button style="font-size: 20px;" @click="showSweetAlert" type="button" class="btn btn-secondary">Đặt Hàng</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>

import sp1 from "../assets/img/sp1.png";
import sp2 from "../assets/img/sp2.jpg";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  data() {
    return {
      products: [
        // {
        //   name: "DC x GAM Worlds 23 Zipped Hoodie",
        //   soluong: 1,
        //   price: 690000,
        //   image: sp1,
        // },
        // {
        //   name: "DC x BR Thương Bạn Gái T-shirt",
        //   soluong: 1,
        //   price: 500000,
        //   image: sp2,
        // },
        // ...Thêm các sản phẩm khác vào đây...
      ],
    };
  },
  computed: {
    //... (Các computed property khác nếu cần)
  },
  methods: {
    getTotalAmountFormatted() {
      const totalAmount = this.products.reduce(
        (total, product) => total + this.getTotalAmount(product),
        0
      );
      console.log(totalAmount); // Kiểm tra giá trị của totalAmount
      return totalAmount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    },
    decreaseQuantity(product) {
      if (product.soluong > 1) {
        product.soluong--;
      }
    },
    increaseQuantity(product) {
      product.soluong++;
    },
    getTotalAmount(product) {
      return product.soluong * product.price;
    },
    removeProduct(index) {
      this.products.splice(index, 1);
    },
    //... (Các phương thức khác nếu cần)
    showSweetAlert() {
    this.$swal("Đặt hàng thành công!", "Cảm ơn bạn đã yêu thương T-Shirt❤️!", "success");
    }
    
  },
  
};
</script>





<style scoped>
.container {
  height: 500px;
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

.btn-secondary:hover{
  background-color: cadetblue;
}
</style>