
<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view> <!-- Sử dụng <router-view> để hiển thị nội dung của trang -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
}
</script>