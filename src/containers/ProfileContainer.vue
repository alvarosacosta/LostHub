<template>
    <main class="ProfileContainer">
        <ProfileComponent v-model:success="success" :userProfile @update-user-info="updateUserInfo"></ProfileComponent>
    </main>
</template>

<script setup lang="ts">
import ProfileComponent from '@/components/ProfileComponent.vue';
import { UserDetails } from '@/interfaces/user';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { Ref, ref } from 'vue';

    const authStore = useAuthStore();
    const { userProfile } = storeToRefs(authStore); 
    const success : Ref<boolean> = ref(false); 

    async function updateUserInfo(userUpdatedInfo : UserDetails) : Promise<void>{
        try {
            await authStore.updateUserInfo(userUpdatedInfo);
            success.value = true

        } catch (error : any) {
            console.log("Error al actualizar los usuarios")
        }
    }
</script>