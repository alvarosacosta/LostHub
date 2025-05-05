<template>
    <main class="ItemDetailsView">
        <ItemDetailsContainer 
            :id
            @show-error="showError"
            @show-success="showSuccess"
        />
    </main>
</template>

<script setup lang="ts">
import ItemDetailsContainer from '@/containers/ItemDetailsContainer.vue';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    const props = defineProps<{
        id: string
    }>()

    function showError(error : string) : void {
        emit('showError', error)
    }

    function showSuccess(message : string) : void {
        emit('showSuccess', message)
    }

</script>
