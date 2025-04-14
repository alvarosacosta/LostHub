<template>
    <main class="SidebarContainer">
        <SidebarComponent @toggle-sidebar="toggleSidebar"></SidebarComponent>
    </main>
</template>
  
<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';

    const emit = defineEmits<{
        (e: 'toggle-sidebar', closed: boolean): void
    }>()

    function toggleSidebar(closed : boolean) : void {
        emit('toggle-sidebar', closed)
    }
    
</script>