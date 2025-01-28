<template>
  <div class="error-layout">
    <h1>{{ statusCode }} - {{ message }}</h1>
    <p>Oops! Something went wrong.</p>
    <a href="/">Go Back Home</a>
  </div>
</template>

<script setup>
defineProps({
  statusCode: {
    type: Number,
    default: 500,
  },
  message: {
    type: String,
    default: 'An unexpected error occurred.',
  },
});
</script>

<style scoped>
.error-layout {
  text-align: center;
  padding: 50px;
}
</style>
