<template>
  <div class="cover-image"></div>
  <div class="d-flex align-items-center justify-content-center">
    <div style="background-color: rgb(254, 250, 250)" class="container">
      <div class="gth">
        <h1 style="font-size: 25px">T-SHIRT SHORE</h1>
        <p class="text1">
          Chúng tôi khuyến khích sự sáng tạo không ngừng của từng thành viên
          trong doanh nghiệp, giải quyết việc làm cho hơn hàng trăm nhân sự mỗi
          năm với môi trường làm việc năng động, đội ngũ đoàn kết và đầy nhiệt
          huyết. Những sản phẩm của DirtyCoins mang đậm dấu ấn kết hợp giữa văn
          hóa phương Tây và Phương Đông, xác lập một ngôn ngữ sáng tạo rất
          riêng, đầy mạo hiểm và mới mẻ. Chất liệu cảm hứng được DirtyCoins chắt
          lọc từ sự đa sắc, đa diện của dòng chảy cuộc sống hàng ngày; pha trộn
          cùng cảm hứng nghệ thuật đương đại để tạo nên một tiểu vùng văn hóa
          rất riêng của DirtyCoins..
        </p>
        <h1 style="font-size: 25px; margin-top: 40px; margin-bottom: 10px">
          Cửa hàng chính
        </h1>
        <p class="text3">
          <i
            class="fa fa-map-marker"
            style="color: gray; margin-right: 5px; margin-top: 5px"
          ></i>
          Đường Quản Trọng Hoàng, Phường Hưng Lợi, Quận Ninh Kiều, Cần Thơ
        </p>

        <p class="text3">
          <i class="fa fa-phone" style="color: gray; margin-right: 5px"></i>
          <a style="text-decoration: none" href=""> 0924546770</a>
        </p>

        <p class="text3">
          <i class="fa fa-envelope" style="color: gray; margin-right: 5px"></i>
          <a style="text-decoration: none" href="#">
            anhb2014814@student.ctu.edu.vn
          </a>
        </p>
        <h3 style="font-size: 25px; margin-top: 40px; margin-bottom: 10px">
          Gửi tin nhắn cho chúng tôi
        </h3>
        <div class="col-md-4">
          <form>
            <div class="form-group">
              <label style="margin-top: 5px; margin-bottom: 5px" for="text"
                >Tên của bạn</label
              >
              <input
                name="text"
                type="text"
                class="form-control"
                id="text"
                placeholder="Nhập tên của bạn"
                required
              />
            </div>

            <div class="form-group">
              <label style="margin-top: 5px; margin-bottom: 5px" for="email"
                >Email của bạn</label
              >
              <input
                name="email"
                type="email"
                class="form-control"
                id="email"
                placeholder="Nhập email của bạn"
                required
              />
            </div>

            <div class="form-group">
              <label style="margin-top: 5px; margin-bottom: 5px" for="comment"
                >Nội dung</label
              >
              <textarea
                name="o1"
                placeholder="Nhập nội dung"
                id="comment"
                class="form-control"
                rows="6"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <button
                style="margin-top: 10px; margin-bottom: 5px; margin-left: 37%"
                type="submit"
                class="btn btn-secondary"
              >
                Gửi đi
              </button>
            </div>
          </form>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.9136896435084!2d105.7679168!3d10.0239811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883a9247546b%3A0x8bbf008e9676d4eb!2zxJAuIFF14bqjbiBUcuG7jW5nIEhvw6BuZywgSMawbmcgTOG7o2ksIE5pbmggS2nhu4F1LCBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1699692277028!5m2!1svi!2s"
        width="600"
        height="450"
        style="border: 0;
        margin-top: 5%;
        margin-bottom: 5%;
        margin-left: 16%;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.cover-image {
  background-image: url("../assets/img/contact.jpg"); /* Đường dẫn đến ảnh nền */
  background-size: cover;
  background-position: center;
  max-width: 78%; /* Giảm chiều rộng ảnh nền */
  height: 40vh;
  padding: 20px;
  position: relative;
  margin: 0 auto; /* Căn giữa theo chiều ngang */
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 60%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 50px;
  color: rgb(40, 40, 40);
  font-family: "Helvetica, Arial", sans-serif;
}
.text1 {
  line-height: 1.5;
}
.btn-secondary:hover {
  background-color: cadetblue;
}
</style>
