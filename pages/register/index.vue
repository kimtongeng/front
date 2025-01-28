<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class=" dark:text-white text-4xl mb-2">
        LIBRARY MANAGEMENT
      </div>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Register your account
          </h1>
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="userName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input type="text" name="userName" id="userName"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username" required="" v-model="userName" >
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@eample.com" required="" v-model="email">
            </div>
            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="" v-model="password">
            </div>
            <div>
              <label for="confirm_password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
              <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required="" v-model="confirm_password" >
            </div>
            <button type="button" @click="register" @keypress.enter="register"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account ? <NuxtLink to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</NuxtLink>
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
const userName = ref(null);
const email = ref(null);
const password = ref(null);
const confirm_password = ref(null);

const register = () => {
  const data = {
    userName:userName.value,
    email:email.value,
    password:password.value,
    confirm_password:confirm_password.value,
  }
  if(userName.value == null ||email.value == null ||password.value == null ||confirm_password.value == null ){
    alert("Please fill all the fields");
    return;
  }
  if(password.value != confirm_password.value ){
    alert("Password and Confirm Password should be same");
    return;
  }
  localStorage.setItem("user",JSON.stringify(data));
  route.push("/login");
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

<style lang="scss" scoped></style>