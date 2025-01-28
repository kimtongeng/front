<template>
  <div>
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar">
      <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul class="space-y-2 font-medium" >
        
      
          <li v-for="item,index in visibility">

            <div v-if="item.type == 'sub'">

              <div @click="dropChild(item.id)" class="mb-2 flex items-center cursor-pointer p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Icon :name="item.icon" size="25"></Icon>
                <span class="ms-3">{{ $t(item.label) }}</span>
                <Icon name="material-symbols:arrow-forward-ios-rounded" class="ml-auto" style="transition: all 0.4s ease;" :class="{ 'rotate-90': item.isVisible || $route.path.includes(item.path)}"></Icon>
              </div>  

              <ul class="pl-4 overflow-hidden"  :class="{ childActive: item.isVisible || $route.path.includes(item.path), child: !item.isVisible }">
                <li v-for="itemChild,index in item.children" :key="index">
                  <NuxtLink 
                    :to="itemChild.path"
                    :class="{active: $route.path.includes(item.path)}"
                    class=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <Icon :name="itemChild.icon" size="25"></Icon>
                    <span class="ms-3">{{ $t(itemChild.label) }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div v-if="item.type == 'link'">
              <NuxtLink 
                :to="item.path"
                :class="{active: $route.path.includes(item.path)}"
                class=" flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Icon :name="item.icon" size="25"></Icon>
                <span class="ms-3">{{ $t(item.label) }}</span>
              </NuxtLink>
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

  const visibility = ref([
  {
    id: 1,
    type:"link",
    icon:"solar:code-scan-line-duotone",
    label:"dashboard",
    key:"dashboard",
    path:"/dashboard",
  }, 
  {
    id: 1,
    type:"link",
    icon:"solar:book-2-broken",
    label:"book_list",
    key:"book_list",
    path:"/book_list",
  },
  {
    id: 2,
    type:"link",
    icon:"solar:notebook-bookmark-broken",
    label:"book_type",
    key:"booK_type",
    path:"/book_type",
  },
  {
    id: 4,
    type:"link",
    icon:"solar:user-speak-broken",
    label:"author",
    key:"author",
    path:"/author",
  },
  {
    id: 5,
    type:"link",
    icon:"solar:users-group-two-rounded-line-duotone",
    label:"student",
    key:"student",
    path:"/student",
  },

  // {
  //   id: 6,
  //   isVisible: false,
  //   type:"sub",
  //   label:"setting",
  //   path:"/setting",
  //   icon:"solar:settings-outline",
  //   children: [
  //     { 
  //       id:7,
  //       isVisible: false ,
  //       icon:"solar:user-id-outline",
  //       label:"about",
  //       key:"about",
  //       path:"/logout",
  //     },

  //   ],
  // },

]);

  onMounted(() => {
  })

function isChild(child){
  openChild.value.push(child)
  console.log(openChild.value);
}
function dropChild(id){
  const item = visibility.value.find(item => item.id === id);
  if(item){
    item.isVisible = !item.isVisible;
  }
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
.child {
  overflow: hidden;
  max-height: 0;
  transition: all 1s ease;
}
.childActive {
  max-height: 500px; /* Adjust to a reasonable maximum height */
  transition: all 1s ease;
}
</style>
