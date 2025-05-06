<template>
    <main class="ItemCardComponent">
        <article class="item-card">
            <v-window 
                v-if="item?.url_images && item?.url_images.length > 0" 
                class="carousel" 
                show-arrows
                @mouseenter="isHovered = true"
                @mouseleave="isHovered = false"
            >
                <template v-slot:prev="{ props }">
                    <v-icon class="carousel-arrow-prev" :class="{ 'arrow-visible': isHovered }" @click="props.onClick" size="90">mdi-arrow-left-thick</v-icon>
                </template>

                <template v-slot:next="{ props }">
                    <v-icon class="carousel-arrow-next" :class="{ 'arrow-visible': isHovered }" @click="props.onClick" size="90">mdi-arrow-right-thick</v-icon>
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

                <label class="description-label">Descripción</label>
                <p class="small-description">{{ item?.detailedDescription }}</p>
                
                <label class="location-label">Ubicación de pérdida</label>
                <p class="location">{{ item?.location }}</p>
                
                <label v-if="item?.type === 'Perdido' && item?.reward" class="reward-label">Recompensa de búsqueda</label>
                <p v-if="item?.type === 'Perdido' && item?.reward" class="reward">{{ item?.reward + " €" }}</p>

                <router-link class="view-details-arrow-container" :to="{ name: 'item-details', params: { id: item?.id },  }">
                    <label class="tooltip-arrow" for="view-details-arrow">Ver detalles</label>
                    <v-icon class="view-details-arrow" size="90">mdi-arrow-right-thick</v-icon>
                </router-link>
            </section>
        </article>
    </main>
</template>

<script setup lang="ts">
import { MixedItem } from '@/interfaces/items';
import { ref } from 'vue';
    
    const props = defineProps<{
        item: MixedItem | undefined
    }>()

    const isHovered = ref(false)

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

        width: 750px;
        height: 350px;

        display: grid;
        grid-template-columns: 320px 3px auto;

        opacity: 0;
        animation: aparecer 1s forwards;

        border-radius: 1em;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 1);


    }

    .carousel {
        border-radius: .5em 0em 0em .5em;

        position: relative;
    }

    .files {
        width: 320px;
        height: 350px;
        
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
        height: 350px;
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

        height: 350px;

        position: relative
    }

    .name, .location, .reward, .small-description {
        background-color: var(--first-color);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        padding: .6em .8em .5em .8em;
        width: 100%;
        height: 2.6em;

        white-space: nowrap;         
        overflow: hidden;            
        text-overflow: ellipsis; 
        word-break: break-word;
        overflow-wrap: break-word;    
        
    }

    .location, .small-description{
        max-width: 390px; 
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
        -webkit-line-clamp: 2;

        overflow: hidden;
        text-align: justify; 

        line-height: 1.7em;
        height: 4em;

        padding-top: 6px;

    }

    .reward {
        width: 70%;
        height: 3.2em;
        font-size: xx-large;
        font-weight: bold;
        border: 2px solid var(--fourth-color);
        display: flex;
        justify-content: center; 
        align-items: center;    
        text-align: center;
        
    }

    .description-label, .location-label, .reward-label {
        position: absolute;
        background-color: var(--second-color);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        color: var(--text-color);
        padding: .2em .4em .2em .4em;
        border-radius: .5em;
        font-size: 10px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        opacity: .7;

    }

    .description-label {
        top: 24%;
    }

    .location-label{
        top: 47%;
    }

    .reward-label {
        top: 63%;
        opacity: 1;
        font-size: 13px;
    }

    .view-details-arrow-container{
        position: absolute;
        bottom: 6%;
        left: 74%;
    }

    .tooltip-arrow {
        position: absolute;
        bottom: 70%;
        left: 80%;
        transform: translateX(-50%);
        background-color: var(--first-color);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        color: var(--text-color);
        padding: .7em;
        border-radius: .5em;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        
        transition-delay: 0s;
        transition: opacity 0.3s ease;
        
        opacity: 0;
    }

    .view-details-arrow-container:hover .tooltip-arrow {
        opacity: .9;
        transition-delay: 0.7s;
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
    
    .view-details-arrow:hover{
        transform: scale(1.1);

    }

    .carousel {
        position: relative;
    }

    .carousel-arrow-next {
        position: absolute;
        top: 50%;
        opacity: 1;
        transition: transform 0.3s ease;
        z-index: 10;

        transform: translateY(-50%) translateX(500px); 
    }

    .carousel-arrow-prev {
        position: absolute;
        top: 50%;
        opacity: 1;
        z-index: 10;
        transition: transform 0.3s ease;

        transform: translateY(-50%) translateX(-200px);
    }

    .arrow-visible.carousel-arrow-prev {
        transform: translateY(-50%) translateX(-15px);
        opacity: 1;
    }

    .arrow-visible.carousel-arrow-next {
        transform: translateY(-50%) translateX(210px);
        opacity: 1;
    }
    
    @media (max-width: 1300px) {

        .item-card {
            width: 320px;
            height: 585px;

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

            height: 331.5px;
            width: 320px;
            font-size: small;

            gap: 1.5em;

        }

        .view-details-arrow-container{
            bottom: 10%;
            left: 70%;
        }

        .description-label {
            top: 21%;
        }

        .location-label{
            top: 43%;
        }

        .reward-label {
            top: 60%;
            font-size: 12px;
        }

        .type {
            font-size: small;
        }

        .reward {
            width: 70%;
        }

    }
    
</style>