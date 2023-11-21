<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Đăng Nhập</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="form-group mx-auto">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    placeholder="Tên đăng nhập"
                    v-model="username"
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
                    v-model="password"
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
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { alert_error, alert_success } from "@/assets/js/common.alert";

export default {
  setup() {
    const showPassword = ref(false);
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const login = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/Accounts/login",
          {
            username: username.value,
            password: password.value,
          }
        );
        // const userRole = response.data.user.role;
        // if (userRole !== "Admin") {
        //   alert_error(
        //     "Truy Cập Bị Từ Chối",
        //     "Tài Khoản Của Bạn Không Có Quyền Truy Cập Vào Trang Web Này"
        //   );
        //   return;
        // }
        if (response.data.error === false) {
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("CustomerName", response.data.user.name);
          sessionStorage.setItem("CustomerId", response.data.user.customerId);
          sessionStorage.setItem("roleName", response.data.user.role);
          sessionStorage.setItem("roleId", response.data.user.roleId);
          location.reload();
        } else {
          alert_error("Login", response.data.msg);
        }
      } catch (error) {
        // console.log(error);
        alert_error("Login", "An error occurred during login.");
      }
    };

    // Automatically redirect to qlsp if already logged in
    const checkLoggedIn = () => {
      const token = sessionStorage.getItem("token");

      if (token && token !== "undefined") {
        router.push({ name: "Products" });
      }
    };

    onMounted(checkLoggedIn);

    return {
      username,
      password,
      login,
      togglePasswordVisibility,
      showPassword,
    };
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
  