<template>
    <main class="LostItemDetailsView">
        <LostItemDetailsContainer 
            :id
        />
    </main>
</template>

<script setup lang="ts">
import LostItemDetailsContainer from '@/containers/LostItemDetailsContainer.vue';

    const props = defineProps<{
        id: string
    }>()

</script>
