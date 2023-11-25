<template>
  <div style="margin-bottom: 4%;" class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Đăng Ký</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group mx-auto">
                <label style="margin: 3px;" for="username">Tên đăng nhập</label>
                <div class="input-group">
                  <input
                    v-model="username"
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    required
                  />
                </div>
              </div>
              <div class="form-group mx-auto">
                <label style="margin: 3px;" for="password">Mật khẩu</label>
                <div class="input-group">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    name="password"
                    required
                  />
                  <span class="input-group-addon" style="border: 1px solid rgb(188, 188, 188);border-radius:5px">
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
                <label for="name">Họ Tên</label>
                <div class="input-group">
                  <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    required
                  />
                </div>
              </div>
              <div class="form-group mx-auto">
                <label style="margin: 3px;" for="birthday">Ngày Sinh</label>
                <div class="input-group">
                  <input
                    v-model="birthday"
                    type="date"
                    class="form-control"
                    id="birthday"
                    name="birthday"
                    required
                  />
                </div>
              </div>
              <!-- Số điện thoại -->
              <div class="form-group mx-auto">
                <label style="margin: 3px;" for="phone">Số điện thoại</label>
                <div class="input-group">
                  <input
                    v-model="phone"
                    type="text"
                    class="form-control"
                    id="phone"
                    name="phone"
                    required
                  />
                </div>
              </div>
              <div class="form-group mx-auto">
                <label style="margin: 3px;" for="email">Email</label>
                <div class="input-group">
                  <input
                    v-model="email"
                    type="text"
                    class="form-control"
                    id="email"
                    name="email"
                    required
                  />
                </div>
              </div>
              <!-- Địa chỉ -->
              <div class="form-group mx-auto">
                <label style="margin: 3px;" for="address">Địa chỉ</label>
                <div class="input-group">
                  <input
                    v-model="address"
                    type="text"
                    class="form-control"
                    id="address"
                    name="address"
                    required
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-secondary" style="float: right">Đăng Ký</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Customer from "./services/customer.service";
import Account from "./services/account.service"; 
import { http_create } from './assets/js/common.http';
import { alert_success, alert_error } from '../../Admin/src/assets/js/common.alert';
export default {
  setup() {
    const showPassword = ref(false);
    // const { swal } = useSweetalert();

    const name = ref("");
    const username = ref("");
    const password = ref("");
    const address = ref("");
    const birthday = ref("");
    const phone = ref("");
    const email = ref("");
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };
    const router = useRouter();
    // Khi ng dung click sẽ chạy hàm 
    const handleSubmit = async() => {
      const customer = {
        name: name.value,
        birthday: birthday.value,
        phone: phone.value,
        email: email.value,
        address: address.value,
      }
       //luu do csdl bảng customer
      const createCustomer = await http_create(Customer, customer);
      const account = { // dữ liệu account
        username: username.value,
        password: password.value,
        customerId: createCustomer.Customer._id, // id k.hang vừa tạo 
        roleId: "655cb7994abf8034f6449bc4" // id của role user
      }
      //tạo account
      const createAccount = await http_create(Account, account); 
      if(createAccount){
        alert_success("Thông Báo", "Bạn đã tạo thành công tài khoản")
        router.push({ name: "Login" });
      }else {
        alert_error("Lỗi", "Tạo tài khoản không thành công")
      }
      // swal("Đăng ký thành công!", "Chào mừng bạn đến với T-Shirt❤️!", "success");
    };

    return {
      showPassword,
      name,username,password,email,phone,address,birthday,
      togglePasswordVisibility,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.input-group-addon {
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width:40px;
  border: none !important;
 
}
.fa{
 margin:0 auto;
}
.btn-secondary{
  margin-top: 3%;
  margin-right: 35%;

}
.btn-secondary:hover {
  background-color: cadetblue;
}

</style>
