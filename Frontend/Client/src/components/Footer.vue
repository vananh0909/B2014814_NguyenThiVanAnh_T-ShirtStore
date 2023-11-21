<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12">
  <h3 style="  text-align: left;">Liên hệ</h3>
  <div class="contact-info">
    <div><strong>Địa chỉ:</strong> Đường 3/2, phường Xuân Khánh, quận Ninh Kiều, thành phố Cần Thơ</div>
    <div><strong>Điện thoại:</strong> <a href="tel:0924546770">0924546770</a></div>
    <div><strong>Email:</strong> <a href="mailto:anhb2014814@student.ctu.edu.vn">anhb2014814@student.ctu.edu.vn</a></div>
  </div>
</div>





        <div class="col-lg-4 col-md-6 col-sm-12">
          <h3 style="  text-align: left; margin-left: 15px;">Mạng xã hội</h3>
          <ul class="social-icons">
            <li>
              <a href="#"><i class="fab fa-facebook"></i> Facebook</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-twitter"></i> Twitter</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
            </li>
            <li>
              <a href="#"><i class="fab fa-linkedin"></i> LinkedIn</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-4 col-md-12 col-sm-12 footer-column">
          <img
            class="store-logo"
            src="../assets/img/logo.png"
            alt="Logo cửa hàng"
          />
        </div>
      </div>
    </div>
    <p class="copyright">COPYRIGHT © 2023 VanAnh</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.footer {
  width: 100%;
  background: #f8f8f8;
  font-family: "Roboto", sans-serif;
  padding: 20px 0;
  text-align: center;
 
}

.store-logo {
  width: 150px;
}

ul.social-icons {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center; /* Canh chỉnh ngang hàng giữa */
}

ul.social-icons li {
  margin: 0 10px; /* Khoảng cách giữa các biểu tượng mạng xã hội */
}

ul.social-icons a {
  color: #333;
  text-decoration: none;
  font-size: 17px;
}
ul.social-icons a:hover {
  color: cadetblue;
}
ul.social-icons i {
  margin-right: 5px; /* Khoảng cách giữa biểu tượng và văn bản */
}

.contact-info div {
  text-align: left;
  margin-bottom: 10px;
}

.copyright {
  text-align: center;
  margin: 0;
  padding: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  color: #555;
}
</style>
