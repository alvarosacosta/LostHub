<template>
    <main class="NotifyFindingView">
        <NotifyFindingContainer 
            :itemID
            @show-error="showError"
        ></NotifyFindingContainer>
    </main>


</template>
  
<script setup lang="ts">
import NotifyFindingContainer from '@/containers/NotifyFindingContainer.vue';

    defineProps<{
        itemID: string
    }>()

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    function showError(error : string) : void {
        emit('showError', error)
    }
</script>