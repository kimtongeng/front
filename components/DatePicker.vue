<template>
  
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const emits = defineEmits(["update:modelValue"]);
</script>
