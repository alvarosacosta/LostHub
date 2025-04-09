<template>
    <main class="LostItemDetailsComponent">
        <article class="item">
            <v-window v-if="item?.files !== undefined" class="carousel" show-arrows>
                <template v-slot:prev="{ props }">
                    <v-icon class="carousel-arrow-prev" @click="props.onClick" size="90">mdi-arrow-left-thick</v-icon>
                </template>

                <template v-slot:next="{ props }">
                    <v-icon class="carousel-arrow-next" @click="props.onClick" size="90">mdi-arrow-right-thick</v-icon>
                </template>

                <v-window-item class="files" v-for="(file, index) in item?.files" :key="index">
                    <img :src="file" alt="file-image" class="file-image" />
                </v-window-item>
            </v-window>

            <section v-else class="no-image">
                <section class="no-image-content">
                    <span class="no-image-text">Sin imágenes</span>
                    <v-icon class="no-image-icon">mdi-penguin</v-icon>
                </section>
                    
            </section>

            <div class="vertical-line"></div>

            <section class="main-text">
                <span class="name">{{ item?.name }}</span>

                <span class="category">{{ item?.category }}</span>

                <section class="color-gender">
                    <span class="color">{{ item?.color }}</span>
                    <span v-if="item?.gender !== undefined" class="gender">{{ item?.gender }}</span>
                </section>

                <p class="small-description">{{ item?.detailedDescription }}</p>

                <section class="date-time-location">
                    <span class="date-time">{{ item?.dateTime }}</span>
                    <span class="location">{{ item?.location }}r</span>
                </section>

                <section class="reward-arrow">
                    <span class="reward">{{ item?.reward + " €" }}</span>
                    <router-link :to="{ name: 'item-details', params: { id: item?.id },  }">
                        <v-icon class="view-details-arrow" size="100">mdi-arrow-right-thick</v-icon>
                    </router-link>
                </section>
            </section>
        </article>
    </main>
</template>

<script setup lang="ts">
import { LostItem } from '@/interfaces/items';
    
    defineProps<{
        item: LostItem | undefined
    }>()

</script>

<style scoped lang="css">
    .LostItemDetailsComponent {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 100vh;
    }

    .item {
        color: var(--text-color);
        border-radius: .5em;

        width: 900px;
        height: 500px;

        display: grid;
        grid-template-columns: 320px 3px auto;

        opacity: 0;
        animation: aparecer 1s forwards;

        box-shadow: 10px 10px 20px rgba(0, 0, 0, .8);

    }

    .files {
        width: 320px;
        height: 500px;
        
        overflow: visible;
        position: relative;
    }

    .file-image {
        width: 100%;
        height: 100%;
        object-fit:cover;

        border-radius: .5em 0em 0em .5em;
    }

    .main-text {
        background-color: var(--second-color);
        border-radius: 0em .5em .5em 0em;
        grid-column: 3;

        display: flex;
        flex-direction: column;

        padding: 18px;
        gap: 1em;
    }

    .name, .category, .color, .gender, .date-time, .location, .reward, .small-description {
        background-color: var(--first-color);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        padding: .6em .5em .5em .8em;
        width: 80%;
        height: 2.6em;

        white-space: nowrap;         
        overflow: hidden;            
        text-overflow: ellipsis;        
        
    }

    .name {
        margin-bottom: .9em;
        width: 100%;

        font-weight: bold;

    }
    
    .small-description {
        height: 9.7em;   
        padding-top: .4em;

        white-space: normal; 
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
    }

    .color-gender, .date-time-location {
        display: flex;
        width: 80%;

        gap: 15px;
    }

    .color {
        width: 100%;
    }

    .reward-arrow {
        display: flex;
        height: 3em;
    }

    .view-details-arrow {
        bottom: 56px;
        left: 15px;
    }

    .view-details-arrow, .carousel-arrow-prev, .carousel-arrow-next {
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .6));
        color: var(--first-accent-color);

        position: relative;
    }

    .view-details-arrow:hover, .carousel-arrow-prev:hover, .carousel-arrow-next:hover {
        color: var(--second-accent-color);

    }

    .carousel-arrow-prev, .carousel-arrow-next {
        transform: translateX(0); 
        transition: transform 0.5s ease; 
    }

    .carousel:hover .carousel-arrow-next{
        transform: translateX(20px);
    }

    .carousel:not(:hover) .carousel-arrow-next{
        transform: translateX(100px);
    }

    .carousel:hover .carousel-arrow-prev{
        transform: translateX(-20px);
    }

    .carousel:not(:hover) .carousel-arrow-prev{
        transform: translateX(-100px);
    }

    .vertical-line {
        width: 3px;
        height: 500px;
        background-color: var(--first-color);

        grid-column: 2;
        box-shadow: 2.5px 1px 5px rgba(0, 0, 0, .8);
        z-index: 1;

    }

    .no-image {
        background-color: var(--second-color);

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: larger;
    }

    .no-image-content {
        background-color: var(--first-color);
        padding: .6em;
        border-radius: 15px;

        display: flex;
        gap: .6em;
    }
    
</style>