<template>
    <main class="ItemDetailsView">
        <ItemDetailsContainer 
            :id
        />
    </main>
</template>

<script setup lang="ts">
import ItemDetailsContainer from '@/containers/ItemDetailsContainer.vue';

    const props = defineProps<{
        id: string
    }>()

</script>
