<template>
    <main class="SignUpView">
        <SignUpContainer @show-success="useStatusBarMessage" @show-error="useStatusBarError"></SignUpContainer>
    </main>
</template>

<script setup lang="ts">
import SignUpContainer from '@/containers/SignUpContainer.vue';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    function useStatusBarMessage(message: string) : void {
        emit('showSuccess', message);
    }

    function useStatusBarError(error: string) : void {
        emit('showError', error);
    }

</script>