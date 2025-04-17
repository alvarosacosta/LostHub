<template>
    <main class="SignUpContainer">
        <SignUpComponent @sign-up="signUp"></SignUpComponent>
    </main>
</template>
  
<script setup lang="ts">
import SignUpComponent from '@/components/SignUpComponent.vue';
import { User, UserDetails, UserProfileImage } from '@/interfaces/user';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    const authStore = useAuthStore();
    const router = useRouter();

    async function signUp(user: User, userDetails: UserDetails, userProfileImage: UserProfileImage): Promise<void> {
        try {
            await authStore.signUp(user, userDetails, userProfileImage);

            if(authStore.user) {
                emit('showSuccess', "Registro de usuario exitoso. ¡Bienvenido a Lost Hub!");
            }

            router.push('/');

        } catch (error : any) {
            if (error === 'Error during sign up: User already registered'){
                emit('showError', "Registro de usuario fallido. Este email ya está asociado a un usuario.");

            } else {
                console.error(error);
                emit('showError', "Registro de usuario fallido. Error desconocido.");
            }
        }
    }

</script>