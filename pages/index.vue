<template>
  <div>

<h1>{{$t("hello")}}</h1>
  </div>
</template>

<script setup>
const { setLocale } = useI18n();
const localPath = useLocalePath();
</script>

<style lang="scss" scoped>

</style>