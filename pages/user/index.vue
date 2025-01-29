<template>
  <div>
    <Table :header="header" :listData="data" :action="true">
      <template #action>
        <li  >
          <EditButton @ButtonAction="editHandler"></EditButton>
        </li>
        <li>
          <DeleteButton @ButtonAction="deleteHandler"></DeleteButton>
        </li>
      </template>
    </Table>
    <!-- modal -->
    <AddModal :title="'add_user'" @addClick="add">

      <template #form>

        <div class="col-span-2">
          <label for="name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            {{
               $t("user_name")
            }}
          </label>
          <input type="text" id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :placeholder="$t('user_name')" required="" v-model="user_name">
        </div>
        <div class="col-span-2">
          <label for="name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            {{
               $t("email")
            }}
          </label>
          <input type="text" id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :placeholder="$t('email')" required="" v-model="email">
        </div>

        <div class="col-span-2">
          <label for="password" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            {{
               $t("password")
            }}
          </label>
          <input type="password" id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :placeholder="$t('password')" required="" v-model="password">
        </div>
      </template>
    </AddModal>


    <DeleteModal></DeleteModal>


  </div>
</template>

<script setup>
import { useFlowbite } from '~/composables/useFlowbite';
import { useAxios } from '~/composables/useAxios';
const axios = useAxios();
const { setLocale } = useI18n();
const localPath = useLocalePath();

const user_name = ref(null);
const email = ref(null);
const password = ref(null);


const header = ref([
  {
    label: "id",
    key: "id",
    class: "text-left",
    isSort: true
  },
  {
    label: "user_name",
    key: "user_name",
    class: "text-left",
    isSort: true
  },
  {
    label: "email",
    key: "email",
    class: "text-left",
    isSort: true
  }
])
let data = ref([
  {
    id: 1,
    user_name:"admin",
    email:"admin@gmail.com",
    password:"admin"
  },
]);
onMounted(async () => {
  useFlowbite(() => {
    initFlowbite();
  })
  
  data.value = JSON.parse(localStorage.getItem("user")) ?? [] ;
  

})
const editHandler = ()=>{
  alert(132)
}
const deleteHandler=()=>{
  alert(123)
}



const add = () => {
  if (!user_name.value || !email.value || !password.value) {
    alert("Please fill in all fields");
    return;
  }

  // Determine the new ID (auto-increment logic)
  const lastId = data.value.length > 0 ? data.value[data.value.length - 1].id : 0;
  const id = lastId + 1;


  // Add the new user to the array
  data.value.push({
    id: id, // Assign the new auto-incremented ID
    user_name: user_name.value,
    email: email.value,
    password: password.value,
  });

  // Save updated data to localStorage
  localStorage.setItem("user", JSON.stringify(data.value));
};

</script>

<style lang="scss" scoped></style>