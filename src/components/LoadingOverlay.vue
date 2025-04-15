<template>
    <div v-if="loading" class="loader-overlay">
      <v-progress-circular indeterminate size="64" color="var(--first-color)" />
    </div>
</template>
  
<script setup lang="ts">
    defineProps<{ 
        loading: boolean 
    }>()

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