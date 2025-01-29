<template>
  <div>


    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span class="sr-only">Open sidebar</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
                </path>
              </svg>
            </button>
            <a href="https://flowbite.com" class="flex ms-2 md:me-24">
              <!-- <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" /> -->
              <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">LIBRARY MANAGEMENT</span>
            </a>
          </div>

          <div class="flex items-center">

            <div class="flex items-center justify-end ms-3">
              
              <ThemeToggle></ThemeToggle>

              <select id="countries" v-model="lang"
                class="mr-9 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="kh">KHMER</option>
                <option value="en">ENGLISH</option>
              </select>

              <div>
                <button type="button"
                  class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span class="sr-only">Open user menu</span>

                  <Icon name="solar:user-circle-bold" size="50"  color="yellow" ></Icon>

                </button>
                <div id="dropdown-user"
                  class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
                  <div class="px-4 py-3">
                    <span class="block text-sm text-gray-900 dark:text-white">{{ user.userName }}</span>
                    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ user.email }}</span>
                  </div>
                  <ul class="py-2" aria-labelledby="user-menu-button">
                  
                    <li>
                      <NuxtLink to="/logout"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                        out</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </nav>
    <Sidebar></Sidebar>


    <div class="p-4 sm:ml-64">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-20">
        <slot></slot>
      </div>
    </div>

  </div>
</template>


<script setup>

import Sidebar from '~/components/Sidebar.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { setLocale } = useI18n();
const lang = ref("kh");
let user = ref({});
onMounted(()=>{
  const isLogin = localStorage.getItem("isLogin");
  user.value = JSON.parse(localStorage.getItem("user"));

  
  if(isLogin != "true"){
    router.push("/login");
  } 

})

// watched
watch(lang, (newValue, oldValue) => {
  setLocale(newValue);
})



// function




onMounted(async () => {
  useFlowbite(() => {
    initFlowbite();
  })

})


</script>

<style lang="scss" scoped></style>