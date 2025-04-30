<template>
    <main class="CreateItemView">
        <CreateItemContainer @show-error="showError"></CreateItemContainer>
    </main>
</template>

<script setup lang="ts">
import CreateItemContainer from '@/containers/CreateItemContainer.vue';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    function showError(error : string) : void {
        emit('showError', error)
    }

</script>