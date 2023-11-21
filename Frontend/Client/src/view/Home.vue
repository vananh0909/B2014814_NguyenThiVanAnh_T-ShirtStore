<template>
  <div class="body">
    <!-- Thêm nút "Khám phá thêm" -->
    <router-link to="/Products" class="discover-button">Khám phá thêm</router-link>
  </div>
  <div class="image-container">
    <img src="../assets/img/img1.jpg" alt="Hình ảnh 1" />

    <div class="gap"></div>
    <img src="../assets/img/img2.jpg" alt="Hình ảnh 2" />
  </div>
  <div>
    <h1 class="thuonghieu">DỊCH VỤ CỦA T-SHIRT</h1>
  </div>
  <div class="card-container">
    <div class="card" style="width: 10rem">
      <img src="../assets/img/img3.png" class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text" style="font-size: 20px; font-weight: 400">
          Chúng tôi có thể giúp gì cho bạn?
        </p>
        <p class="card-text">
          Các nhân viên tư vấn của T-SHIRT rất hân hạnh hỗ trợ quý khách.
        </p>
        <a class="thea" href="#">Liên hệ với chúng tôi</a>
      </div>
    </div>

    <div class="card" style="width: 10rem">
      <img src="../assets/img/img4.png" class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text" style="font-size: 20px; font-weight: 400">
          Nghệ thuật tặng quà
        </p>
        <p class="card-text">
          Chọn món quà hoàn hảo từ những sản phẩm được tuyển chọn đặc biệt.
        </p>
        <a class="thea" href="#">Chọn quà tặng</a>
      </div>
    </div>

    <div class="card" style="width: 10rem">
      <img src="../assets/img/img5.png" class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text" style="font-size: 20px; font-weight: 400">
          Dịch vụ cá nhân hóa
        </p>
        <p class="card-text">
          Dịch vụ cá nhân hóa của Louis Vuitton mang đến nhiều lựa chọn đa dạng
        </p>
        <a class="thea" href="#"> Khám phá Bộ sưu tập</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Body",
};
</script>

<style scoped>
.body {
  background-image: url("../assets/img/bray.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
  position: relative; /* Để có thể sử dụng vị trí tương đối cho nút */
}

.discover-button {
  text-decoration: none;
  position: absolute;
  font-weight: bold;
  top: 50%; /* Đặt nút ở giữa theo chiều cao */
  left: 50%; /* Đặt nút ở giữa theo chiều ngang */
  transform: translate(-50%, -50%); /* Dịch chuyển nút để nó nằm chính giữa */
  background-color: #910d0d;
  color: rgb(193, 193, 193);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Thêm khoảng cách phía dưới phần body để không che khuất phần footer */
.body::after {
  content: "";
  display: block;
  height: 150px; /* Điều chỉnh chiều cao tuỳ theo độ dài cần thiết */
}
.discover-button:hover {
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.988);
  color: rgb(255, 255, 255);
  opacity: 0.9;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 6% 10% 6% 10%; /* Khoảng trống 10% ở hai bên */
}

.thuonghieu {
  font-family: "Arial", sans-serif;
  font-weight: 400;
  font-size: 30px;
  color: #252121;
  text-align: center;
  justify-content: space-between;
  margin: 0;
}
.image-container img {
  max-width: 50%;
  height: auto;
}

.card {
  width: 130px; /* Kích thước ngang là 200px */
  height: auto; /* Kích thước dài là 250px */
}

.card-img-top {
  width: 100%; /* Đảm bảo hình ảnh lấp đầy toàn bộ kích thước của thẻ */
  height: 100%;
  object-fit: cover; /* Cân chỉnh hình ảnh sao cho nó lấp đầy kích thước mà không bị méo */
}
.card-container {
  display: flex;
  justify-content: space-between;
  margin: 5% 10% 6% 10%; /* Khoảng cách 10px ở hai bên */
}
.card {
  flex-basis: calc(30% - 10px); /* Chia thành 4 phần và thêm khoảng cách 10px */
}
.thea{
  text-decoration: none;
}
.thea:hover{
  color:cadetblue;
}
</style>
