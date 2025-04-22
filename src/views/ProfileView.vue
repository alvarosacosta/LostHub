<template>
    <main class="ProfileView">
        <ProfileContainer :userID @show-success="showSuccess" @show-error="showError"></ProfileContainer>
    </main>
</template>

<script setup lang="ts">
import ProfileContainer from '@/containers/ProfileContainer.vue';

    defineProps<{
        userID?: string
    }>()

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    function showError(error : string) : void {
        emit("showError", error)
    }

    function showSuccess(message : string) : void {
        emit("showSuccess", message)
    }

</script>