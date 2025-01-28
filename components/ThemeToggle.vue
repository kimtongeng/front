<template>
  <button @click="toggleTheme" id="theme-toggle" class="p-2 rounded-md mr-3 flex align-items-center border ">

    <Icon name="solar:cloudy-moon-broken" size="25" v-if="theme === 'light'"></Icon>
    <Icon name="solar:sun-2-broken" size="25" v-else    class="text-white"></Icon>

 
  </button>
</template>

<script setup>
const theme = useState('theme', () => 'light');

// Ensure the theme is applied on mount
onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('color-theme');
    if (savedTheme) {
      theme.value = savedTheme;
    } else {
      theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    document.documentElement.classList.toggle('dark', theme.value === 'dark');
  }
});

// Toggle between light and dark themes
const toggleTheme = () => {
  if (typeof window !== 'undefined') {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
    localStorage.setItem('color-theme', theme.value);
  }
};
</script>

<style scoped>
button {
  transition: all 0.3s ease;
}
</style>
