<template>
  <div>
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar">
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium" >
          <li v-for="item,index in menuData" :key="index">
            
            <NuxtLink v-if="!item.child"
              :to="item.url"
              :class="{active: route.path === item.url }"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Icon :name="item.icon" size="25"></Icon>
              <span class="ms-3">{{ $t(item.label) }}</span>
            </NuxtLink>


            <div v-if="item.child">
              <div  @click="isChild(item.url)"
                :class="{ activeParent : route.path.includes(item.url) }"
                class="flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Icon :name="item.icon" size="25"></Icon>
                <span class="ms-3">{{ $t(item.label) }}</span>
                <Icon name="material-symbols:arrow-forward-ios-rounded" class="ml-auto"></Icon>
              </div>  
              <ul class="pl-5">
                <li v-for="childItem,index in item.child" 
                :class="{ activeChild : route.path.includes(childItem.url) }" 
                style="display: none;"
                >
                <NuxtLink
                  :to="childItem.url"
                  :class="{active: route.path === childItem.url }"
                  class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <Icon :name="childItem.icon" size="25"></Icon>
                  <span class="ms-3">{{ $t(childItem.label) }}</span>
                </NuxtLink></li>
              </ul>
            </div>
            
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import menuData from "../mockup/menu.js"
import {ref} from "vue"
const route = useRoute()

  const openChild = ref([]);

onMounted(() => {
})

function isChild(child){
  openChild.value.push(child)
  console.log(openChild.value);
  
}

</script>

<style scoped>
.active{
  background-color: rgba(74, 91, 99, 0.668);
}
.activeParent{
  background-color: rgba(74, 91, 99, 0.224);
  margin-bottom: 5px;
}
.activeChild{
  display: block !important;
}
</style>
