<template>
  <div>
    <Table :title="'book_list'" @addHandler="addHandler" :header="header" :listData="data" :action="true" @reload-data="reloadData">
      
      <template #action="{row}">  
        <li>
          <EditButton @ButtonAction="editHandler(row.id)"></EditButton>
        </li>
        <li>
          <DeleteButton @ButtonAction="deleteHandler(row.id)"></DeleteButton>
        </li>
      </template>
      <template #name="item">

      </template>
      <template #filter>
        
      </template>

    </Table>
    <!-- modal -->
    <AddModal ref="model" :title="titleType" @addClick="add" :typeAction="typeAction" @editClick="edit">
      <template #form>
        <div class="col-span-2">
          <label for="name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">{{
            $t("name") }}</label>
          <input type="text" name="name" id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :placeholder="$t('name')" required="" v-model="form.name">
        </div>
      </template>
    </AddModal>


    <DeleteModal></DeleteModal>


  </div>
</template>

<script setup>
import { useFlowbite } from '~/composables/useFlowbite';
import { default as axios } from 'axios';
const posterBase64 = ref(null);
const datepicker = ref(null);
const { setLocale } = useI18n();
const localPath = useLocalePath();
const model = ref(null);
const header = ref([
  {
    label: "name",
    key: "name",
    class: "text-left",
    isSort: true
  },
  
])


let data = ref([]);
const titleType = ref("add_book");
const typeAction = ref("add");

const defaultForm = {
  id:null,
  name:null
};
let form = reactive({});
onMounted(async () => {
  useFlowbite(() => {
    initFlowbite();
  })
  // await fetchAuthor();
  await fetchAuthor();
  setForm();
})
const editHandler = (id) => {
  titleType.value = "edit_book"
  typeAction.value = "edit"

  model.value.openModel(id);

  
}
const deleteHandler =async (id) => {
  try {
    
  } catch (error) {
    console.error(error); 
  }
}
const edit = async (id) => {


}
const setForm = () => {
  Object.assign(form, defaultForm);
}


// const url = 'https://cors-anywhere.herokuapp.com/https://library-render-oewo.onrender.com/v1/books/';

const fetchAuthor = async () => {
  try {
   
    data.value =JSON.parse(localStorage.getItem('author'));
    console.log(data.value);
    
  } catch (error) {
    console.error(error);
  }
};

const getImage = (image)=>{
  return `data:image/png;base64,${image}`
}

// const add = () => {
//   console.dir(datepicker.value.value);
//   console.log(form.poster);

// }
const add = async () => {
  form.id = Number(form.length) + 1;
  localStorage.setItem("author",JSON.stringify(form));
  setForm();
};
const reloadData = () => {
  fetchAuthor();
}
const addHandler = ()=>{
  typeAction.value = "add";
  model.value.openModel();
}
</script>

<style lang="scss" scoped></style>