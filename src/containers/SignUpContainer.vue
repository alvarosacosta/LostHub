<template>
    <main class="SignUpContainer">
        <SignUpComponent @sign-up="signUp"></SignUpComponent>
    </main>
</template>
  
<script setup lang="ts">
import SignUpComponent from '@/components/SignUpComponent.vue';
import { User, UserDetails, UserProfileImage } from '@/interfaces/user';
import { useAuthStore } from '@/stores/auth';

    const emit = defineEmits<{
        (e: 'signedUp', error?: string): void
    }>()

    const authStore = useAuthStore();

    async function signUp(user: User, userDetails: UserDetails, userProfileImage: UserProfileImage): Promise<void> {
        try {
            await authStore.signUp(user, userDetails, userProfileImage);

            if(authStore.user) {
                emit('signedUp');
            }

        } catch (error : any) {
            emit('signedUp', "Registro de usuario fallido. Es probable que el usuario ya exista.");
        }
    }

</script>