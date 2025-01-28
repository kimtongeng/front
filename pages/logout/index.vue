<template>
  <div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
onMounted(()=>{
  localStorage.removeItem("isLogin");
  router.push("/login");
})
</script>

<style lang="scss" scoped>

</style>