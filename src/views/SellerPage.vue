<template>
  <div class="com-page">
    <!-- 针对于/sellerpage  这条路径而显示出来的
在这个组件中，通过子组件注册的方式，要需要Seller.vue这个组件
-->
    <seller></seller>
  </div>
</template>

<script>
import Seller from '@/components/Seller'
export default {
  components: {
    seller: Seller
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped></style>
