<template>
    <!-- Main modal -->
    <div>
        <div id="crud-modal" style="background-color: #0e1110bd;  justify-content: center; align-items: center;"
            class="overflow-y-auto  hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-2/4 max-w-xlg max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
                            {{ $t(props.title) }}
                        </h2>
                        <button type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            @click="openModel">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <form class="p-4 md:p-5">
                        <div class="grid gap-4 mb-4 grid-cols-2">
                            <slot name="form"></slot>
                        </div>
                        <button type="button" @click="addItem"
                            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                            {{ $t(props.typeAction) }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
    },
    typeAction: {
        type: String,
    }
})
const emit = defineEmits(["addClick", "editClick"]);
const idData = ref(null);
const openModel = (id) => {
    idData.value = id;
    const modal = document.getElementById('crud-modal')
    if (modal) {
        modal.classList.toggle('hidden')
        modal.classList.toggle('flex')
        // Toggle the 'hidden' class
    }
 
}
const addItem = () => {
    const modal = document.getElementById('crud-modal')
    if (modal) {
        modal.classList.toggle('hidden')
        modal.classList.toggle('flex')
    }
    if (props.typeAction == "add") {
        emit("addClick");
    }
    else {
        emit("editClick",idData.value);
    }
}
defineExpose({ openModel });

</script>

<style>
.flex {
    display: flex !important;
}
</style>