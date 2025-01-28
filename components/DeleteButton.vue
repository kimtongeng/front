<template>
<button data-modal-target="delete-modal"  data-modal-toggle="delete-modal" @click="ButtonAction" type="button" class="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t(props.text) }}</button>
</template>

<script setup>

const emit = defineEmits(['ButtonAction']);
const ButtonAction = () => {
  emit('ButtonAction')
}
const props = defineProps({
  text:{
    text:String,
    default:"delete"
  }
})

</script>

