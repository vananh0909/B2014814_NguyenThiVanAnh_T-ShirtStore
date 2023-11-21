<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Đăng Nhập</h2>
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
              <div class="dk">
                <p>
                  Bạn chưa có tài khoản?
                  <router-link to="/Signup" href="#">Đăng Kí</router-link>
                </p>
              </div>

              <button
                type="submit"
                @click="showSweetAlert"
                class="btn btn-secondary"
              >
                Đăng Nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Signup from "../view/Signup.vue";
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
      this.$swal(
        "Đăng nhập thành công!",
        "Chào mừng bạn đến với T-Shirt❤️!",
        "success"
      );
    },
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
  right: 10px;
  top: 0;
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
  margin: 20px auto;
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
  margin-left: 140px;
}
.btn-secondary:hover {
  background-color: cadetblue;
}
.dk {
  text-align: center;
}
</style>
  