<template>
    <main class="CreateItemContainer">
        <CreateItemComponent @failure="showError"></CreateItemComponent>
    </main>
</template>

<script setup lang="ts">
import CreateItemComponent from '@/components/CreateItemComponent.vue';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    function showError(error : string) : void {
        emit('showError', error)
    }

</script>