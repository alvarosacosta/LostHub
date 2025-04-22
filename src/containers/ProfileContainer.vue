<template>
    <main class="ProfileContainer">
        <ProfileComponent v-model:success="success" :foreignUserProfile :userProfile @log-out="logOut()" @failure="showError" @update-user-info="updateUserInfo"></ProfileComponent>
    </main>
</template>

<script setup lang="ts">
import ProfileComponent from '@/components/ProfileComponent.vue';
import { UserDetails } from '@/interfaces/user';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, Ref, ref } from 'vue';

    const props = defineProps<{
        userID?: string
    }>()
    
    const success : Ref<boolean> = ref(false); 

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    const AuthStore = useAuthStore();
    const { foreignUserProfile, userProfile } = storeToRefs(AuthStore);

    onMounted( async() => {
        if (props.userID){
            await AuthStore.fetchUserById(props.userID);

        } else {
            AuthStore.cleanForeignUser()
        }
        
    })

    async function updateUserInfo(userUpdatedInfo : UserDetails) : Promise<void>{
        try {
            await AuthStore.updateUserInfo(userUpdatedInfo);

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
            await AuthStore.logOut();

            emit("showSuccess", "Se ha cerrado sesión de forma satisfactoria.")
            router.push('/')

        } catch (error : any) {
            showError(error)
        }
    }

</script>