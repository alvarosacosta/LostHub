<template>
    <main class="ItemCardComponent">
        <article class="item-card">
            <v-window v-if="item?.url_images && item?.url_images.length > 0" class="carousel" show-arrows>
                <template v-slot:prev="{ props }">
                    <v-icon class="carousel-arrow-prev" @click="props.onClick" size="90">mdi-arrow-left-thick</v-icon>
                </template>

                <template v-slot:next="{ props }">
                    <v-icon class="carousel-arrow-next" @click="props.onClick" size="90">mdi-arrow-right-thick</v-icon>
                </template>

                <v-window-item eager class="files" v-for="(file, index) in item?.url_images" :key="index">
                    <v-dialog max-width="800" max-height="800" scroll-strategy="close" transition="fade-transition">
                        <template v-slot:activator="{ props: activatorProps }">
                            <img v-bind=activatorProps :src="file" alt="file-image" class="file-image" />
                        </template>

                        <template v-slot>
                            <img :src="file" alt="file-image" class="full-file-image" />
                        </template>
                    </v-dialog>
                </v-window-item>
            </v-window>

            <section v-else class="no-image">
                <section class="no-image-content">
                    <span class="no-image-text">Sin imágenes</span>
                    <v-icon class="no-image-icon">mdi-penguin</v-icon>
                </section>
                    
            </section>

            <div class="line"></div>

            <section class="main-text">
                <section class="head-text">
                    <span class="type">{{ item?.type }}</span>
                    <span class="name">{{ item?.name }}</span>

                </section>

                <span class="category">{{ item?.category }}</span>

                <section class="color-gender">
                    <span class="color">{{ item?.color }}</span>
                    <span v-if="item?.gender" class="gender">{{ item?.gender }}</span>
                </section>

                <p class="small-description">{{ item?.detailedDescription }}</p>

                <section class="date-time-location">
                    <span class="date-time">{{ formattedDateTime }}</span>
                    <span class="location">{{ item?.location }}</span>
                </section>

                <section class="reward-arrow">
                    <span v-if="item?.type === 'Perdido'" class="reward">{{ item?.reward + " €" }}</span>
                    <router-link :to="{ name: 'item-details', params: { id: item?.id },  }">
                        <v-icon class="view-details-arrow" size="100">mdi-arrow-right-thick</v-icon>
                    </router-link>
                </section>
            </section>
        </article>
    </main>
</template>

<script setup lang="ts">
import { MixedItem } from '@/interfaces/items';
import { ref, Ref, watch } from 'vue';
    
    const props = defineProps<{
        item: MixedItem | undefined
    }>()

    const formattedDateTime : Ref<string| undefined> = ref(props.item?.dateTime)
    watch(
        () => props.item?.dateTime,
        (newDateTime) => {
            if (newDateTime) {
            formattedDateTime.value = newDateTime.replace('T', ' ');
            }
        },
        { immediate: true }
    );

</script>

<style scoped lang="css">

    .ItemCardComponent {
        opacity: 0;
        animation: aparecer 1s forwards;

        border: 3px solid var(--first-color);
        border-radius: .8em;
    }

    .item-card {
        color: var(--text-color);

        width: 900px;
        height: 500px;

        display: grid;
        grid-template-columns: 320px 3px auto;

        opacity: 0;
        animation: aparecer 1s forwards;

        border-radius: 1em;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 1);


    }

    .carousel {
        border-radius: .5em 0em 0em .5em;
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

        cursor: pointer;

        border-radius: .5em 0em 0em .5em;
    }

    .full-file-image{
        border-radius: 1em;
        border: 3px solid var(--first-color);
        box-shadow: 0px 0px 12px rgba(0, 0, 0, .8);

        max-width: 100%;
        object-fit: contain;
        display: block;
        margin: 0 auto;
    }

    .no-image {
        background-color: var(--third-color);
        
        display: flex;
        align-items: center;
        justify-content: center;
    
        font-size: larger;
        
        border-radius: .5em 0em 0em .5em;
    }

    .no-image-content {
        background-color: var(--first-color);
        padding: .6em;
        border-radius: 15px;

        display: flex;
        gap: .6em;
    }

    .line {
        width: 3px;
        height: 500px;
        background-color: var(--first-color);

        grid-column: 2;
        box-shadow: 2.5px 1px 5px rgba(0, 0, 0, .8);
        z-index: 2;

    }

    .main-text {
        background-color: var(--second-color);
        border-radius: 0em .5em .5em 0em;
        
        grid-column: 3;

        display: flex;
        flex-direction: column;

        padding: 18px;
        gap: 1em;

        height: 500px;
    }

    .name, .category, .color, .gender, .date-time, .location, .reward, .small-description {
        background-color: var(--first-color);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        padding: .6em .8em .5em .8em;
        width: 100%;
        height: 2.6em;

        white-space: nowrap;         
        overflow: hidden;            
        text-overflow: ellipsis;        
        
    }

    .head-text {
        display: flex;
        align-items: center;
        font-weight: bold;

        gap: 15px;
    }

    .name {
        width: 100%;
    }

    .type {
        background-color: var(--first-color);

        font-size: large;
        padding: .8em;

        width: fit-content;
        text-transform: uppercase;

        border-radius: 10px;
        border: 2px solid var(--fourth-color);

        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
    }
    
    .small-description {

        white-space: normal; 
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;

        overflow: hidden;
        text-align: justify; 

        line-height: 1.7em;
        height: 9.25em;

        padding-top: 6px;

    }

    .color-gender, .date-time-location {
        display: flex;
        gap: 15px;
    }

    .date-time-location, .reward {
        width: 80%;
    }

    .reward-arrow {
        display: flex;
        height: 3em;
    }

    .view-details-arrow {
        bottom: 56px;
        left: 15px;
    }

    /* Carousel arrows */
    .view-details-arrow, .carousel-arrow-prev, .carousel-arrow-next {
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .6));
        color: var(--first-accent-color);

        position: relative;
    }

    .view-details-arrow:hover, .carousel-arrow-prev:hover, .carousel-arrow-next:hover {
        color: var(--second-accent-color);

    }

    .carousel-arrow-prev, .carousel-arrow-next {
        transition: transform 0.5s ease; 
        
    }

    .carousel:hover .carousel-arrow-next{
        transform: translateX(20px);
        animation: aparecer 0.5s
    }

    .carousel:not(:hover) .carousel-arrow-next{
        transform: translateX(100px);
        animation: desaparecer 0.5s
    }

    .carousel:hover .carousel-arrow-prev{
        transform: translateX(-20px);
        animation: aparecer 0.5s
    }

    .carousel:not(:hover) .carousel-arrow-prev{
        transform: translateX(-100px);
        animation: desaparecer 0.5s
    }

    @media (max-width: 950px) {

        .item-card {
            width: 320px;
            height: 613.5px;

            grid-template-columns: auto;
            grid-template-rows: 250px 3px auto;

        }

        .carousel {
            grid-row: 1;
            grid-column: 1;

            border-radius: .5em .5em 0 0;
        }

        .files {
            width: 320px;
            height: 250px;
            
            overflow: visible;
            position: relative;

            border-radius: .5em .5em 0 0;

        }

        .file-image {
            width: 100%;
            height: 100%;
            object-fit:cover;

            border-radius: .5em .5em 0 0;

        }

        .no-image {
            grid-row: 1;
            grid-column: 1;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: larger;

            border-radius: .3em .3em 0 0;

        }

        .line {
            grid-row: 2;
            grid-column: 1;

            width: 320px;
            height: 3px;

            box-shadow: 0px 1.5px 3px rgba(0, 0, 0, .6);

        }

        .main-text {
            grid-column: 1;
            grid-row: 3;
            
            border-radius: 0 0 .5em .5em;

            height: 361px;
            width: 320px;
            font-size: small;

        }

        .type {
            font-size: small;
        }

        .date-time-location, .reward {
            width: 65%;
        }

        .small-description {
            padding-top: .3em;
            padding-left: .7em;
            -webkit-line-clamp: 3;

            height: 5.5em;
        }
    }
    
</style>