<template>
  <div>
    <!-- Các phần khác của trang edit.vue -->
    <h1 class="mt-4">Edit Category {{ categoryId }}</h1>

    <div class="container" >
    <table class="table table-bordered mt-5">
      <thead class="thead-dark">
        <tr>
          <th>Attribute</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td><input v-model="data.items.name" class="form-control" /></td>
        </tr>
      </tbody>
    </table>

    <!-- Update button -->
    <button @click="updateCategory" class="btn btn-secondary"> Cập Nhật </button>

    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { http_getOne, http_update } from "../../assets/js/common.http";
import Category from "../../services/category.service";
import { alert_success, alert_error } from "../../assets/js/common.alert";
import { useRouter } from 'vue-router';
export default {
  setup() {
    //tao item luu danh muc can sua
    const data = reactive({
      items: [],
    });
    const categoryId = ref(null); // de gang id danh muc can sua
    const route = useRoute(); //khai bao bien router

    const fetchCategoryData = async () => {
      categoryId.value = route.params.categoryId; //gan category bang id danh muc can sua
      data.items = await http_getOne(Category, categoryId.value);// lay thong tin danh muc 
      console.log(data.items);
    };
    //tu dong chay khi load trang. hien thi danh muc vua sua
    onMounted(async () => {
      await fetchCategoryData();
    });

    const updateCategory = async () => {
      try {
        const router = useRouter();
    //cap nhat gia tri danh muc moi
        const updateCate = await http_update(
          Category, //bang dl
          categoryId.value, //id danh muc can cap nhat
          data.items //du lieu v-model truyen
        );
        if (updateCate) {
          alert_success("Category updated successfully"); //sucess ->qlydamuc
          router.push('/'); 
        } else {
          alert_error("Failed to update category");//k tc
        }
      } catch (error) {
        console.error("Error updating category:", error);
        alert_error("An error occurred while updating category"); //error 
      }
    };

    return {
      categoryId,
      data,
      fetchCategoryData,
      updateCategory
    };
  },
};
</script>
<style scoped>
.mt-4{
  font-size: 20px;
  color: rgb(76, 76, 76);
  font-family: "Helvetica, Arial", sans-serif;
 
  margin-left: 7.8%;
}
.btn-secondary{
  margin-left: 48%;
  /* margin-top: 2%; */
  margin-bottom: 2%;
}
.btn-secondary:hover{
  background-color: cadetblue;
  color:black
}
</style>
