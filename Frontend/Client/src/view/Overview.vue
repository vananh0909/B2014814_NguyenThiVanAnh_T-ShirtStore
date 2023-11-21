<template>
  <div class="cover-image"></div>
  <div class="d-flex align-items-center justify-content-center">
    <div style="background-color: rgb(255, 255, 255)" class="container">
      <p style="font-size: 19px; line-height: 1.5; margin-top: 2%">
        Không quá ồn ào hay phô trương, ‘T-SHIRT STORE’ tượng trưng cho những
        giá trị nguyên bản nhất của cuộc sống: đó là hiện thực gai góc của những
        ‘đồng tiền xương máu’, của giá trị lao động đầy mồ hôi, bụi bẩn và nước
        mắt. T-SHIRT trở thành một thương hiệu của tinh thần thời trang mạnh mẽ,
        táo bạo nhưng vẫn gần gũi và dễ tiếp cận rộng rãi. Không dừng lại ở đó,
        chúng tôi muốn vượt qua giới hạn của một thương hiệu thời trang đơn
        thuần và trở thành một biểu tượng về văn hóa và phong cách sống của
        những con người trẻ tuổi.
      </p>
    </div>
  </div>
  <img class="img" src="../assets/img/overview2.jpg" />
  <div class="d-flex align-items-center justify-content-center">
    <div style="background-color: rgb(255, 255, 255)" class="container">
      <p style="font-size: 19px; line-height: 1.5; margin-top: 4%">
        Chúng tôi khuyến khích sự sáng tạo không ngừng của từng thành viên trong
        doanh nghiệp, giải quyết việc làm cho hơn hàng trăm nhân sự mỗi năm với
        môi trường làm việc năng động, đội ngũ đoàn kết và đầy nhiệt huyết.
      </p>
    </div>
  </div>
  <img style="height: 50vh" class="img" src="../assets/img/overview3.png" />
  <div class="d-flex align-items-center justify-content-center">
    <div style="background-color: rgb(255, 255, 255)" class="container">
      <p style="font-size: 19px; line-height: 1.5; margin-top: 5%">
        Những sản phẩm của T-SHIRT mang đậm dấu ấn kết hợp giữa văn hóa phương
        Tây và Phương Đông, xác lập một ngôn ngữ sáng tạo rất riêng, đầy mạo
        hiểm và mới mẻ. Chất liệu cảm hứng được chúng tôi chắt lọc từ sự đa sắc,
        đa diện của dòng chảy cuộc sống hàng ngày; pha trộn cùng cảm hứng nghệ
        thuật đương đại để tạo nên một tiểu vùng văn hóa rất riêng của T-SHIRT
        SHORE.
      </p>
    </div>
  </div>
  <img style="height: auto" class="img" src="../assets/img/overview4.jpg" />
  <div class="d-flex align-items-center justify-content-center">
    <div style="background-color: rgb(255, 255, 255)" class="container">
      <p style="font-size: 19px; line-height: 1.5; margin-top: 5%; margin-bottom: 8%;">
        Với sứ mệnh “T-SHIRT là nơi thể hiện cái tôi và đóng góp giá trị cho
        văn hoá thời trang đường phố” chúng tôi đã nâng tầm thương hiệu dựa trên
        những giá trị cốt lõi và bền vững nhất, hướng đến đến mục tiêu trở thành
        TOP 1 VIETNAMESE STREETWEAR BRAND.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.cover-image {
  background-image: url("../assets/img/overview.png"); /* Đường dẫn đến ảnh nền */
  background-size: cover;
  background-position: center;
  max-width: 80%; /* Giảm chiều rộng ảnh nền */
  height: 40vh;
  padding: 20px;
  position: relative;
  margin: 0 auto; /* Căn giữa theo chiều ngang */
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 65%;
  height: auto;
  margin-top: 20px;
  /* margin-bottom: 50px; */
  color: rgb(40, 40, 40);
  font-family: "Helvetica, Arial", sans-serif;
}
.img {
  width: 70%;
  height: 45vh;
  margin-left: 15%;
}
</style>