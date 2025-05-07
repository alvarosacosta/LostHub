<template>
    <main class="SidebarContainer">
        <SidebarComponent :userProfile  @log-out="logOut" @logged-in="loggedIn" @toggle-sidebar="toggleSidebar"></SidebarComponent>
    </main>
</template>
  
<script setup lang="ts">
import SidebarComponent from '@/components/SidebarComponent.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';

    const authStore = useAuthStore();
    const { userProfile } = storeToRefs(authStore); 

    const emit = defineEmits<{
        (e: 'toggle-sidebar', closed: boolean): void
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
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

    async function logOut() : Promise<void> {
        try {
            await authStore.logOut();

            emit("showSuccess", "Se ha cerrado sesión de forma satisfactoria. ¡Adiós!")
            router.push('/')

        } catch (error : any) {
            emit("showError", error)
        }
    }
    
</script>