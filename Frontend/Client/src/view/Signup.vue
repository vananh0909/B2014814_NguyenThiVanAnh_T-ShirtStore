<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Đăng Ký</h2>
          </div>
          <div class="card-body">
            <form action="/process-login" method="post">
              <div class="form-group mx-auto">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    placeholder="Tên đăng nhập"
                    required
                  />
                </div>
              </div>

              <div class="form-group mx-auto">
                <div class="input-group">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    name="password"
                    placeholder="Mật khẩu"
                    required
                  />
                  <span class="input-group-addon">
                    <i
                      class="fa"
                      :class="{
                        'fa-eye': showPassword,
                        'fa-eye-slash': !showPassword,
                      }"
                      @click="togglePasswordVisibility"
                      style="cursor: pointer"
                    ></i>
                  </span>
                </div>
              </div>
              <div class="form-group mx-auto">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Số điện thoại"
                    required
                  />
                </div>
              </div>
              <div class="form-group mx-auto">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="dc"
                    name="dc"
                    placeholder="Địa chỉ"
                    required
                  />
                </div>
              </div>
              <div class="dk">
                <p>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    required
                  />
                  Bạn có đồng ý với điều khoản của chúng tôi?
                </p>
              </div>

              <button
                type="submit"
                @click="showSweetAlert"
                class="btn btn-secondary"
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    showSweetAlert() {
    this.$swal("Đăng ký thành công!", "Chào mừng bạn đến với T-Shirt❤️!", "success");
    }
    
  },
  };
  

</script>
    
    <style scoped>
.mt-5 {
  margin-bottom: 56px;
}
.text-center {
  color: rgb(57, 57, 57);
  font-size: 27px;
}
.input-group {
  position: relative;
}

.input-group-addon {
  position: absolute;
  right: 6px;
  top: 20px;
  bottom: 0;
  display: flex;
  align-items: center;
}
.card-header {
  background-color: rgb(232, 229, 229);
}
.card-body {
  background-color: rgb(255, 255, 255);
}

.form-control {
  width: 100%;
  margin-top: 20px;
}

.form-group {
  width: 80%;
  text-align: center;
}

.text {
  display: inline-block;
  width: 30%;
  margin-right: 5px;
}
.btn-secondary {
  margin-left: 145px;
}
.btn-secondary:hover {
  background-color: cadetblue;
}
.dk {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
    