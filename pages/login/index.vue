<template>
 <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class=" dark:text-white text-4xl mb-2">
        LIBRARY MANAGEMENT
      </div>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@eample.com" required="" v-model="email">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" v-model="password">
                  </div>
                  
                  <button type="button" @click="login" @keypress.enter="login" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <NuxtLink to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</NuxtLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const route = useRouter();
const email = ref(null);
const password = ref(null);
let admin = reactive({
  name:"admin",
  email:"admin@gmail.com",
  password:"admin"
})

const user = ref(null);
onMounted(()=>{
  user.value = JSON.parse(localStorage.getItem("user"));
})


const login = ()=>{
  if(email.value == "admin" && password.value == "admin"){
    route.push("/dashboard");
    localStorage.setItem("isLogin","true");
    localStorage.setItem("user",JSON.stringify(admin));
  }
  else if(email.value == user.value.email && password.value == user.value.password) {
    localStorage.setItem("isLogin","true");
    route.push("/dashboard");
  }
  else if(email.value != user.value.email){
    alert("you email is wrong");
  }
  else{
    alert("you password is wrong");
  }

}



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

definePageMeta({
  layout: false,
});
</script>

<style lang="scss" scoped>

</style>