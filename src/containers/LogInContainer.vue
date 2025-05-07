<template>
    <main class="LogInContainer">
        <LogInComponent @log-in="logIn"></LogInComponent>
    </main>


</template>
  
<script setup lang="ts">
import LogInComponent from '@/components/LogInComponent.vue';
import { User } from '@/interfaces/user';
import { useAuthStore } from '@/stores/AuthStore';


    const emit = defineEmits<{
        (e: 'loggedIn', error?: string): void
    }>()

    const authStore = useAuthStore();
    async function logIn(user : User) : Promise<void> {

        try {
            await authStore.logIn(user.email, user.password);

            if(authStore.user) {
                emit('loggedIn');
            }

        } catch (error : any) {
            emit('loggedIn', "Inicio de sesión fallido. Asegúrate de que el correo electrónico y la contraseña son correctos.");
        }

    }

</script>