
<template>
  <h3 class="text">Thông Tin Khách Đặt Hàng </h3>
  <div class="d-flex align-items-center justify-content-center vh-30">
    <div class="container text-center">
      <table
        class="table table-striped"
        style="width: 100%; border-collapse: collapse; margin: 0 auto"
        border="1"
      >
        <tr>
          <th>Mã Khách Hàng</th>
          <th>Tên Khách Hàng</th>
          <th>Địa Chỉ</th>
          <th>Số Điện Thoại</th>
          <th>Email</th>
          <!-- <th>Ngày Sinh</th> -->
        </tr>
        <tr>
          <td>{{ data.items.customer._id }}</td>
          <td>{{ data.items.customer.name }}</td>
          <td>{{ data.items.customer.address}}</td>
          <td>0{{ data.items.customer.phone }}</td>
          <td>{{ data.items.customer.email }}</td>
          <!-- <td>{{ data.items.customer.birthday }}</td> -->

        </tr>
      </table>
    </div>
  </div>
</template>


<script>
import { onMounted, reactive, ref, onBeforeMount } from 'vue';
import Customer from "../services/customer.service";
import { useRouter } from "vue-router";
import { http_getOne } from '../../../client/src/assets/js/common.http';
export default {
  props: { //create nhận id kh được gửi khi click xem chi tiết
    customerId: {
      type: String,
      required: true,
    },
  },
  setup(props) { // truyền xuong day
    const data = reactive({
      items:[]//save ttin k.hang
    })
    const CusId = ref(null); //de gan id
    // const route = useRouter();
    const fetchCustomerData = async () => {
      CusId.value = props.customerId; //gan id k.hang
      // console.log(CusId.value);
      //tim id k.hang trong bảng customer dựa vào CusId
      data.items = await http_getOne(Customer, CusId.value);
      console.log(data.items);
    };
    onBeforeMount(async() => {
      await fetchCustomerData();
      // console.log(props.customerId);
    })
    return {
      data, CusId
    }
  }
};
</script>

<style scoped>
.container {
  width: 80%;
  height: auto;
  margin: 0 auto;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
}

.text {
  margin-left: 11%;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
  font-size: 25px;
}
</style>