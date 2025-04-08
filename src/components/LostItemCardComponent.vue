<template>
    <main class="LostItemCardComponent">
        <article class="item-card">
            <h1 class="name">{{ item.name }}</h1>
            <p class="category">{{ item.category }}</p>
            <p v-if="item.subcategory" class="subcategory">{{ item.subcategory }}</p>
            <p class="description">{{ item.detailedDescription }}</p>

            <p class="date-time">{{ item.dateTime }}</p>

            <section class="files" v-if="item.files && item.files.length > 0">
                <ul class="files-list">
                    <li class="file" v-for="file in item.files" :key="file">{{ file }}</li>
                </ul>
            </section>

            <p class="color">{{ item.color }}</p>
            <p v-if="item.gender" class="gender">{{ item.gender }}</p>

            <p class="location">{{ item.location }}</p>
            <p v-if="item.locationDescription" class="location-description">{{ item.locationDescription }}</p>

            <p class="public-transport-status">{{ item.isLostInPublicTransport ? 'Perdido en transporte público' : 'No perdido en transporte público' }}</p>
            <p class="public-status">{{ item.isPublic ? 'Es público' : 'No es público' }}</p>
        </article>
    </main>
</template>

<script setup lang="ts">
import { LostItem } from '@/interfaces/items';
    
    defineProps<{
        item: LostItem
    }>()

</script>

<style scoped lang="css">
    .item-card {
        background-color: var(--first-color);
        color: var(--text-color);

        padding: 1em;
        border-radius: .5em;

        opacity: 0;
        animation: aparecer 1s forwards;
    }

    .files-list {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    
</style>