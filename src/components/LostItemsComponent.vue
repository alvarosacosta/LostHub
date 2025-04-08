<template>
    <main class="LostItemsComponent">
        <article class="items" v-if="items.length > 0">
            <router-link class="router-to-item" v-for="(item, index) in items" :key="index" to="item.card">
                <LostItemCardContainer
                    :item
                />
            </router-link>
        </article>
        <p v-else class="no-events-label">No events available.</p>
    </main>
</template>

<script setup lang="ts">
import LostItemCardContainer from '@/containers/LostItemCardContainer.vue';
import { LostItem } from '@/interfaces/items';

    defineProps<{
        items: LostItem[]
    }>()

</script>

<style scoped lang="css">
    .items {
        display: flex;
        flex-direction: column;
        gap: 5em;

        margin: 5em;
    }

    .router-to-item {
        text-decoration: none;
        color: inherit;
    }

</style>