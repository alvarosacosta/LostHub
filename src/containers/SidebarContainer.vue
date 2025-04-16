<template>
    <main class="SidebarContainer">
        <SidebarComponent @logged-in="loggedIn" @toggle-sidebar="toggleSidebar"></SidebarComponent>
    </main>
</template>
  
<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';

    const emit = defineEmits<{
        (e: 'toggle-sidebar', closed: boolean): void
        (e: 'showError', error: string): void
        (e: 'showSuccess', text: string): void
    }>()

    function toggleSidebar(closed : boolean) : void {
        emit('toggle-sidebar', closed)
    }

    function loggedIn(error: string | undefined) : void {
        if(error) {
            emit('showError', error);
        } else {
            emit('showSuccess', '¡Se ha iniciado sesión correctamente!');
        }
    }
    
</script>