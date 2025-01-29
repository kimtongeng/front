<template>
    <div>
        <!-- header -->
        <div
            class="w-full mb-3 p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex justify-between flex-col">
            <div class="flex justify-between w-full">
                <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{{ $t(props.title) }}</h5>
                <div class="flex items-center">
                    <button type="button" @click="reload"
                        class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 flex items-center gap-1">
                        <Icon name="solar:refresh-circle-broken" size="18"></Icon>
                        {{
                            $t("refresh")
                        }}
                    </button>
                    <button type="button" data-modal-target="crud-modal" data-modal-toggle="crud-modal"
                        class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg  px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 text-sm uppercase flex items-center gap-1">
                        <Icon name="solar:add-circle-broken" size="18"></Icon>
                        {{
                            $t("add") }}
                    </button>
                </div>

            </div>


            <div class="flex mt-3 items-center">
                <div class="flex gap-1 w-1/2">
                    <div class="w-fit">
                        <select id="countries"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div class="w-fit">
                        <select id="sort_by"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option :value="null" selected>{{ $t("sort_by") }}</option>
                            <template v-for="itemHeader, index in props.header" :key="index">
                                <option :value="itemHeader.key" v-if="itemHeader.isSort">{{ itemHeader.label }}</option>
                            </template>
                        </select>
                    </div>
                    <div class="w-fit">
                        <select id="sort_type"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option :value="null" selected>{{ $t("sort_type") }}</option>
                            <option :value="item.type" v-for="item, index in sort_type_list" :key="index">{{ item.type
                                }}</option>
                        </select>
                    </div>
                </div>
                <div class="w-1/2 flex justify-end">

                    <div class="w-2/4">
                        <label for="default-search"
                            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="search" id="default-search"
                                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                :placeholder="$t('search')" required />
                            <button type="button"
                                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </div>

                    <button type="button" @click="filterHandel"
                        class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 flex items-center py-3.5 ms-3">
                        <Icon name="solar:filter-linear" size="25"></Icon>
                    </button>

                </div>
            </div>
        </div>

        <!-- filter -->
        <div v-if="showFilter"
            class="w-full mb-3 p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex justify-between flex-col">
            <slot name="filter"></slot>
        </div>
        <!-- table -->
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class=" text-gray-700 uppercase bg-gray-50  dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th v-if="action" class="ps-4">
                            {{ $t("action") }}
                        </th>
                        <th v-for="item, index in props.header" scope="col" :class="item.class" class="px-6 py-5"
                            :key="index">
                            {{ $t(item.label) }}
                        </th>
                    </tr>
                </thead>
                <tbody>

                    <tr class="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        v-for="item, index in props.listData" :key="index">
                        <td v-if="action">
                            <button @click="toggleDropdown(index)" @keydown.enter="toggleDropdown"
                                :id="`dropdownMenuIconButton-${index}`" :data-dropdown-toggle="`dropdownDots-${index}`"
                                class="inline-flex items-center ms-4 p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button" tabindex="0">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor" viewBox="0 0 4 15">
                                    <path
                                        d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                </svg>
                            </button>

                            <!-- Dropdown menu -->
                            <div :id="`dropdownDots-${index}`" v-show="isVisible && index === activeIndex"
                                class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    :aria-labelledby="`dropdownMenuIconButton-${index}`">
                                    <slot name="action" :row="item"></slot>
                                </ul>
                            </div>

                        </td>
                        <td class="px-6 py-4" :class="itemHeader.class" v-for="itemHeader, index in props.header"
                            :key="index">
                            <template v-if="$slots[itemHeader.key]">
                                <slot :name="itemHeader.key" :row="item"></slot>
                            </template>
                            <template v-else>
                                {{ item[itemHeader.key] }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <nav class="flex p-4 text-base dark:bg-gray-800 dark:border-gray-700 items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                aria-label="Table navigation">
                <span
                    class=" font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
                    <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span
                        class="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul class="inline-flex -space-x-px rtl:space-x-reverse h-8">
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page"
                            class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>




    </div>
</template>

<script setup>
import { useFlowbite } from '~/composables/useFlowbite';
import AddModal from './AddModal.vue';
const emit = defineEmits(["reloadData"])
const props = defineProps({
    header: {
        type: Array
    },
    listData: {
        type: Array
    },
    action: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
    },
    index: {
        type: Number,
        required: true,
    },

})
const isVisible = ref(false);

// Methods
const toggleDropdown = (index ) => {
    activeIndex.value =index
    isVisible.value = !isVisible.value;
};
const activeIndex = ref(null);
const showFilter = ref(false);

const sort_type_list = [
    { id: 1, type: "desc" },
    { id: 2, type: "ace" },

]
onMounted(() => {
    useFlowbite(() => {
        initFlowbite();
    })
})

const filterHandel = () => {
    showFilter.value = !showFilter.value;
}
const reload = () => {
    emit("reloadData");
}
</script>

<style scoped>
.text-clamp {
    overflow: hidden;
    display: block;
    max-height: 3em;
    /* Adjust for the number of lines */
    line-height: 1.5em;
    /* Match your text's line height */
}
</style>