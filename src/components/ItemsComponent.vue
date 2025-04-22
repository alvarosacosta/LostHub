<template>
    <main class="ItemsComponent">
        <article class="items" v-if="items && items.length > 0">
            <section class="item" v-for="(item, index) in items" :key="index">
                <ItemCardContainer
                    :item
                />
            </section>
        </article>
        <section v-else class="no-items">
            <p class="no-items-label">No hay objetos que mostrar</p>
        </section>
    </main>
</template>

<script setup lang="ts">
import ItemCardContainer from '@/containers/ItemCardContainer.vue';
import { MixedItem } from '@/interfaces/items';

    defineProps<{
        items: MixedItem[]  | undefined
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

    .no-items{
        display: flex;
        align-items: center;
        justify-content: center;

        height: 100vh;
        width: 100%;
    }

    .no-items-label{
        background-color: var(--second-color);
        color: var(--text-color);
        text-shadow: 0px 4px 5px rgba(0, 0, 0, 1);
        padding: 1em;
        border-radius: .4em;

        box-shadow: 0px 4px 5px rgba(0, 0, 0, 1);
    }

    @media (max-width: 429px) {
        .no-items-label{
            font-size: 1em;
        }

    }

</style>