<template>
  <div>
    <img src="" alt="" id="poster" ref="poster">
    <Table :title="'book_list'" :header="header" :listData="data" :action="true" @reload-data="reloadData">

      <template #action>
        <li>
          <EditButton @ButtonAction="editHandler"></EditButton>
        </li>
        <li>
          <DeleteButton @ButtonAction="deleteHandler"></DeleteButton>
        </li>
      </template>

      <template #filter>
        <div class="col-span-2">
          <label for="author" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">{{
            $t("author") }}</label>
          <select id="author" v-model="form.author"
            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">option 1</option>
            <option value="">option 2</option>
            <option value="">option 3</option>
          </select>
        </div>
      </template>

    </Table>
    <!-- modal -->
    <AddModal :title="titleType" @addClick="add" :typeAction="typeAction" @editClick="edit">
      <template #form>
        <div class="col-span-2">
          <label for="title" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">{{
            $t("title") }}</label>
          <input type="text" name="title" id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :placeholder="$t('title')" required="" v-model="form.title">
        </div>
        <div class="col-span-2">
          <label for="author" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">{{ $t("author")
            }}</label>
          <select id="author" v-model="form.author"
            class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="">option 1</option>
            <option value="">option 2</option>
            <option value="">option 3</option>
          </select>
        </div>
        <div class="col-span-2">
          <label for="genre" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">{{
            $t("publicDate") }}</label>
          <div class="relative">
            
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"></path>
              </svg>
            </div>
            <input type="text" ref="datepicker" datepicker v-model="dateData"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date" />
          </div>

        </div>
        <div class="col-span-2">
          <label for="genre" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">{{
            $t("genre") }}</label>
          <input type="text" name="genre" id="genre"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            :placeholder="$t('genre')" required="" v-model="form.genre">
        </div>
        <div class="col-span-2">

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload
            file</label>
          <input @change="fileHandler"
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input" type="file">

        </div>
        <div class="col-span-2">
          <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
            $t("description") }}</label>
          <textarea id="description" rows="4" v-model="form.description"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"></textarea>
        </div>


      </template>
    </AddModal>


    <DeleteModal></DeleteModal>


  </div>
</template>

<script setup>
import { useFlowbite } from '~/composables/useFlowbite';
import { default as axios } from 'axios';
const poster = ref(null);
const datepicker = ref(null);
const file = ref(null);
const { setLocale } = useI18n();
const localPath = useLocalePath();
const header = ref([
  {
    label: "id",
    key: "id",
    class: "text-left",
    isSort: true
  },
  {
    label: "image",
    key: "image",
    class: "text-left",
    isSort: true
  },
  {
    label: "title",
    key: "title",
    class: "text-left",
    isSort: true
  },
  {
    label: "author",
    key: "author",
    class: "text-left",
    isSort: true
  },
  {
    label: "publicationDate",
    key: "publicationDate",
    class: "text-left",
    isSort: true

  },
  {
    label: "genre",
    key: "genre",
    class: "text-left",
    isSort: true

  },
  {
    label: "description",
    key: "description",
    class: "text-left w-[25%]",
    isSort: false
  },
  {
    label: "publicationDate",
    key: "publicationDate",
    class: "text-left",
    isSort: true
  },
])
const dateData = reactive("");

let data = ref([]);
const titleType = ref("add_book");
const typeAction = ref("add");

const defaultForm = {
  title: null,
  author: null,
  publicationDate: null,
  genre: null,
  description: null,
  posterImageName: null,
  posterImageType: null,
  posterImageBytes: null,
  posterImageUrl: null,
};
let form = reactive({});
onMounted(async () => {
  useFlowbite(() => {
    initFlowbite();
  })
  // await fetchBooks();
  await fetchBooks();
  setForm();
})
const editHandler = () => {
  titleType.value = "edit_book"
  typeAction.value = "edit"
}
const deleteHandler = () => {
  alert(123)
}
const edit = () => {
  alert(123);
}
const setForm = () => {
  Object.assign(form, defaultForm);
}


// const url = 'https://cors-anywhere.herokuapp.com/https://library-render-oewo.onrender.com/v1/books/';

const fetchBooks = async () => {
  try {
    const response = await axios.get("https://library-render-oewo.onrender.com/v1/books/");
    data.value = response.data;
    
  } catch (error) {
    console.error(error);
  }
};
const getImage = async ()=>{
  try {
    const response = await axios.get("https://library-render-oewo.onrender.com/v1/books/18/poster");
    data.value = response.data;
    
  } catch (error) {
    console.error(error);
  }
}
const add = () => {
  console.dir(datepicker.value.value);
  console.log(file.value);

}
const fileHandler = (e) => {
  const file = e.target.files[0]; // Get the first selected file
  if (file) {
    console.log("File selected:", file.name);
    // Handle file processing here, e.g., uploading to a server
  } else {
    console.log("No file selected");
  }
}
const reloadData = ()=>{
  fetchBooks();
}
</script>

<style lang="scss" scoped></style>