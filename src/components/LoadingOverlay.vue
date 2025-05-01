<template>
    <div class="loader-overlay">
      <v-progress-circular indeterminate size="64" color="var(--first-color)" />
    </div>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';

    const emit = defineEmits<{
        (e: 'update:loading', value: boolean): void
    }>()

    defineProps<{ 
        loading: boolean 
    }>()

    onMounted(() => {
        setTimeout(() => {
            closeOverlay()
        }, 700)
    })

    function closeOverlay() : void {
        emit('update:loading', false)
    }

</script>

<style scoped>
    .loader-overlay {
        position: fixed;
        inset: 0;
        background-color: var(--fourth-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

</style>