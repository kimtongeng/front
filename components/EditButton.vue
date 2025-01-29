<template>
          <button data-modal-toggle="crud-modal" data-modal-target="crud-modal" @click="ButtonAction"  type="button" class="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{{ $t(props.text) }}</button>
</template>

<script setup>
const props = defineProps({
  text:{
    type:String,
    default:'edit'
  }
})
const emit = defineEmits(['ButtonAction']);
const ButtonAction = () => {
  emit('ButtonAction')
}
</script>

