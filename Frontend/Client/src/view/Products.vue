<template>
  <div class="cover-image"></div>
  <div class="trong"></div>
  <div class="loc">
    <div class="select" style="float: left">
      <select class="form-select" aria-label="Default select example">
        <option selected disabled hidden>Type</option>
        <option class="mw" value="1">Men</option>
        <option class="mw" value="2">Women</option>
      </select>
    </div>

    <select
      id="price-select"
      class="form-select"
      aria-label="Default select example"
    >
      <option selected disabled hidden>Price</option>
      <option class="mw" value="1">Low to high</option>
      <option class="mw" value="2">High to low</option>
    </select>

    <div class="gach-ngang"></div>
  </div>
  <div class="product-container">
    <div
      class="product"
      v-for="(product, index) in paginatedItems"
      :key="index"
    >
      <img :src="product.images" alt="Product" class="product-image" />
      <div class="product-info">
        <h3 class="name">{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
      <div>
        <!-- Các ô sản phẩm -->
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#Detail"
          @click="openDetailModal(product)"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
    <Detail v-if="selectedProduct" :product="selectedProduct"></Detail>
    <!-- Phân trang -->
    <div class="btn-group me-2" role="group" aria-label="Pagination">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
      <i class="fas fa-chevron-left"></i>
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{ 'btn-primary': currentPage.value === page }"
      >
        {{ page }}
      </button>
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
      <i class="fas fa-chevron-right"></i>
      </button>
    </div>


  </div>

</template>

<script>
import Detail from "./Detail.vue";
import Product from "../services/product.service";
import { onMounted, reactive, ref, watchEffect, watch, computed } from "vue";
import { http_getAll } from "../assets/js/common.http";
import { useStore } from "vuex";
export default {
  components: {
    Detail,
  },
  setup() {
    const data = reactive({
      items: [],
      filteredItems: [],
    });
    const fetchDataPro = async () => {
      data.items = await http_getAll(Product);
    };
    // search
    //dùng vuex để truyền search từ header về
    const store = useStore();
    watch(
      () => store.state.filteredItems,
      (newValue, oldValue) => {
        data.items = newValue; //cap nhat gtri data.item
      }
    );
    // phân trang
    const currentPage = ref(1);
    const itemsPerPage = 16;
    const paginatedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.items.slice(startIndex, endIndex);
    });

    const changePage = (page) => {
      currentPage.value = page;
    };
    const totalPages = computed(() =>
      Math.ceil(data.items.length / itemsPerPage)
    );
    // detail
    const selectedProduct = ref(null); //sp đc choạn

    const openDetailModal = (product) => {
      selectedProduct.value = product; //sp đc chọn tưn ứng chiền wa chang detail
    };
    onMounted(async () => {
      await fetchDataPro();
    });
    return {
      data,
      paginatedItems,
      changePage,
      totalPages,
      currentPage,
      openDetailModal,
      selectedProduct,
    };
  },
};
</script>

<style scoped>
.cover-image {
  background-image: url("../assets/img/16tyth.jpg"); /* Đường dẫn đến ảnh nền */
  background-size: cover;
  background-position: center;
  max-width: 78%; /* Giảm chiều rộng ảnh nền */
  height: 45vh;
  padding: 20px;
  position: relative;
  margin: 0 auto; /* Căn giữa theo chiều ngang */
  display: flex;
  justify-content: center;
  align-items: center;
}
.trong {
  margin: 3% 5% 6px 5%;
}
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 3% 10% 8% 10%;
}

.product {
  width: calc(22% - 4px); /* Điều chỉnh kích thước ban đầu */
  margin: 5px; /* Khoảng cách giữa các ô sản phẩm */
  padding: 10px;
  text-align: center;
  transition: background-color 0.3s;
}

.product:hover {
  background-color: rgb(239, 236, 236);
}

.product-image {
  /* max-width: 100%; */
  width:180px;
  
}

.product-info {
  margin-top: 10px;
}

.loc {
  width: 80%;
  padding: 20px;
  position: relative;
  margin: 0 auto; /* Căn giữa theo chiều ngang */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.form-select {
  width: 150px;
  position: absolute;
  top: 0;
}
#price-select {
  float: right !important;
  margin: 0 0 0 84%;
}

.gach-ngang {
  border-top: 2px solid #000; /* Màu và chiều dày của đường kẻ ngang */
  width: 100%; /* Chiều rộng của đường kẻ ngang (100% để nó bao quát toàn bộ khung) */
  margin-top: 20px;
}
.btn-group {
  display: flex;
  justify-content: center;
  align-items: center; /* Căn giữa theo chiều dọc */
  margin-left: 45%;
  margin-top: 15px;
}
.btn-secondary:hover {
  background-color: cadetblue !important;
}
.name {
  font-size: 18px;
}

/* .me-2{
margin:0 auto;

} */
.btn-outline-secondary{
  font-size: 16px;
  width:70px;
  margin-top: 80px;
  margin-left: -50px;

}
</style>
