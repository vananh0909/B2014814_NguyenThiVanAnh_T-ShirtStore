<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg bg-body-cadetblue">
      <div class="container">
        <img class="logo" src="../assets/img/logo.png" alt="" />
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link active" to="/Products"
                >Products</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/Contact"
                >Contact</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/Overview"
                >Overview</router-link
              >
            </li>
          </ul>
          <form class="d-flex" role="search" @submit.prevent="searchProducts">
            <!-- <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button> -->
            <input
              v-model="searchQuery"
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <!-- <button class="btn btn-outline-success" type="submit">
              Search
            </button> -->
            <div class="header-icons">
              <router-link to="/Login">
                <i class="fas fa-user"></i>
              </router-link>
              <router-link to="/Addcart">
                <i class="fas fa-shopping-bag"></i>
              </router-link>
            </div>

          </form>
          <div class="dx"><i class="fas fa-sign-out-alt"></i></div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { useStore } from "vuex";
import Product from "../services/product.service";
import { http_getAll, http_getOne } from "../assets/js/common.http";
import { onMounted, reactive, ref, watch } from "vue";
export default {
  name: "Header",
  setup() {
    const data = reactive({
      items: [],
    });
    const searchQuery = ref("");
    const store = useStore();
    // Other setup logic...
    const searchProducts = () => {
      // console.log("Searching for:", searchQuery.value);

      // Filter products based on the search query
      const filteredItems = data.items.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );

      // Log the filtered items to the console
      // console.log("Filtered Items:", filteredItems);

      // Update the Vuex store with the search query and filtered items
      store.commit("setSearchQuery", searchQuery.value);
      store.commit("setFilteredItems", filteredItems);
    };
    const fetchPro = async () => {
      data.items = await http_getAll(Product);
    };
    // Use watch to listen for changes in searchQuery
    watch(searchQuery, (newValue, oldValue) => {
      console.log("searchQuery changed:", newValue);
      searchProducts();
    });
    onMounted(async () => {
      await fetchPro();
    });
    return { searchQuery, searchProducts, data };
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  background: rgb(252, 249, 249);
  font-family: "Roboto", sans-serif;
  /* display: flex; */
  padding: 10px;
  font-size: 20px;
}

.logo {
  width: 100px; /* kích thước của logo  */
  height: auto;
  margin-right: 6px;
}
.black-text {
  color: black;
}

.header-icons {
  display: flex;
  align-items: center;
}

.header-icons i {
  font-size: 20px; /* Điều chỉnh kích thước của icon */
  margin-left: 10px; /* Khoảng cách giữa các icon */
  color: black;
}
.nav-link.active:hover {
  text-decoration: underline;
  color: cadetblue;
}
.header-icons i:hover {
  color: cadetblue;
}

.dx {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px; /* Thêm padding để tạo khoảng cách từ mép */
  cursor: pointer; /* Hiển thị con trỏ khi rê chuột qua nút */
}

.dx:hover{
  color:crimson;
}

</style>
