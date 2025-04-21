<template>
    <main class="ProfileContainer">
        <ProfileComponent v-model:success="success" :userProfile @log-out="logOut()" @failure="showError" @update-user-info="updateUserInfo"></ProfileComponent>
    </main>
</template>

<script setup lang="ts">
import ProfileComponent from '@/components/ProfileComponent.vue';
import { UserDetails } from '@/interfaces/user';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { Ref, ref } from 'vue';

    const authStore = useAuthStore();
    const { userProfile } = storeToRefs(authStore); 
    const success : Ref<boolean> = ref(false); 

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    async function updateUserInfo(userUpdatedInfo : UserDetails) : Promise<void>{
        try {
            await authStore.updateUserInfo(userUpdatedInfo);

            success.value = true
            emit("showSuccess", "¡Éxito al actualizar tus datos!")

        } catch (error : any) {
            showError(error)
        }
    }

    function showError(error : string) : void {
        emit("showError", error)
    }

    async function logOut() : Promise<void> {
        try {
            await authStore.logOut();

            emit("showSuccess", "Se ha cerrado sesión de forma satisfactoria.")
            router.push('/')

        } catch (error : any) {
            showError(error)
        }
    }

</script>