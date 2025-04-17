<template>
    <main class="ItemsComponent">
        <article class="items" v-if="items.length > 0">
            <section class="item" v-for="(item, index) in items" :key="index">
                <ItemCardContainer
                    :item
                />
            </section>
        </article>
        <p v-else class="no-events-label">No events available.</p>
    </main>
</template>

<script setup lang="ts">
import ItemCardContainer from '@/containers/ItemCardContainer.vue';
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

        margin: 5em 0em 5em 0em;
    }

    .item {
        text-decoration: none;
        color: inherit;

        display: flex;
        justify-content: center;
    }

</style>