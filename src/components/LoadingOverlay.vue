<template>
    <main class="loading-overlay">
      <v-progress-circular indeterminate size="64" color="var(--first-color)" />
    </main>
</template>
  
<script setup lang="ts">

</script>

<style scoped>
    .loading-overlay {
        position: fixed;
        inset: 0;
        background-color: var(--fourth-color);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

</style>