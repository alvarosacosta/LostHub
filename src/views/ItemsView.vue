<template>
    <main class="ItemsView">
        <ItemsContainer
            @show-error="emit('showError', $event)"
        ></ItemsContainer>
    </main>
</template>

<script setup lang="ts">
import ItemsContainer from '@/containers/ItemsContainer.vue';

    const emit = defineEmits<{
        (e: 'showError', error: string): void;
    }>()

</script>
