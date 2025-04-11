<template>
    <main class="LostItemDetailsComponent">
        <button class='back-button' onclick="history.back()"> Volver </button>
        <article class="item">
            <article v-if="item?.files !== undefined" class="carousel-container">
                <section class="list">
                    <ul v-if="item?.files.length > 1" class="list-preview-image">
                        <li 
                            v-for="(file, index) in item?.files" 
                            :key="index" 
                            @click="selectedIndex = index"
                        >
                            <img 
                                class="preview-image" 
                                :class="{'selected-image': selectedIndex == index}"
                                :src="file" 
                                alt="preview-image" 
                            />
                        </li>
                    </ul>
                </section>

                <v-window class="carousel" show-arrows v-model="selectedIndex">
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
            </article>

            <article v-else class="no-image-container">
                <section class="no-image">
                    <section class="no-image-content">
                        <span class="no-image-text">Sin imágenes</span>
                        <v-icon class="no-image-icon">mdi-penguin</v-icon>
                    </section>
                </section>
            </article>

            <article class="profile-article">
                <section class="profile">
                    <figure class="profile-image-container">
                        <img class="profile-image" src="@\assets\mock-profile.png" alt="profile-image">
                    </figure>
                    <label class="profile-name" for="profile-image-container">Nombre de usuario</label>
                </section>
                
                <section class="navigation-buttons-and-type">
                    <span class="type">{{"OBJETO " + item?.type }}</span>
                    <button class="profile-button">Perfil de usuario</button>
                    <button class="notification-button">¡LO ENCONTRÉ!</button>
                </section>
            </article>

            <article class="resume-article">
                <section class="name-section">
                    <label for="name">NOMBRE DEL OBJETO</label>
                    <span class="name">{{ item?.name }}</span>
                </section>

                <section class="down-section">
                    <section class="reward-section">
                        <label for="reward">RECOMPENSA</label>
                        <span class="reward">{{ item?.reward + " €" }}</span>
                    </section>
    
                    <section class="categories-section">
                        <section class="category-section">
                            <label for="category">CATEGORÍA</label>
                            <span class="category">{{ item?.category }}</span>
                        </section>
        
                        <section v-if="item?.subcategory !== undefined" class="subcategory-section">
                            <label for="subcategory">SUBCATEGORÍA</label>
                            <span class="subcategory">{{ item?.subcategory }}</span>
                        </section>
                    </section>
                </section>
            </article>

            <article class="main-text">
                <section v-if="item?.isLostInPublicTransport" class="public-transport-section">
                    <label for="found-public-transport">ENCONTRADO EN</label>
                    <span class="found-public-transport">Taxi</span>
                </section>

                <section class="color-gender">
                    <section class="color-section">
                        <label for="color">COLOR</label>
                        <span class="color">{{ item?.color }}</span>
                    </section>

                    <section class="gender-section">
                        <label for="gender">SEXO</label>
                        <span v-if="item?.gender !== undefined" class="gender">{{ item?.gender }}</span>
                    </section>
                </section>

                <section class="date-time-location">
                    <section class="date-time-section">
                        <label for="date-time">FECHA Y HORA</label>
                        <span class="date-time">{{ item?.dateTime }}</span>
                    </section>

                    <section class="location-section">
                        <label for="location">LOCALIZACIÓN</label>
                        <span class="location">{{ item?.location }}</span>
                    </section>
                </section>

                <section class="description-section">
                    <label for="description">DESCRIPCIÓN DEL OBJETO</label>
                    <p class="description">{{ item?.detailedDescription }}</p>
                </section>

                <section v-if="item?.locationDescription !== undefined" class="location-description-section">
                    <label for="location-description">DESCRIPCIÓN DE LUGAR DE PÉRDIDA</label>
                    <p class="location-description">{{ item?.locationDescription }}</p>
                </section>

            </article>
        </article>
    </main>
</template>

<script setup lang="ts">
import { LostItem } from '@/interfaces/items';
import { Ref, ref } from 'vue';
    
    defineProps<{
        item: LostItem | undefined
    }>()

    const selectedIndex: Ref<number> = ref(0)

</script>

<style scoped lang="css">
    .LostItemDetailsComponent {
        display: flex;
        align-items: center;
        justify-content: center;

        opacity: 0;
        animation: aparecer 1s forwards;

        padding: 5em;
    }

    .item {
        color: var(--text-color);
        background-color: var(--third-color);
        border-radius: .5em;

        width: 1000px;

        display: grid;
        grid-template-columns: 30em auto;
        grid-template-rows: auto auto auto;

        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
        border: 3px solid var(--first-color);

        padding-bottom: 4em;

    }

    .carousel-container {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 30em;
        height: 40em;

        gap: 10px;

        grid-column: 1;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .carousel {
        border-radius: 1em;
        border: 3px solid var(--first-color);

        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
    }
    
    .list {
        height: 500px;
    }

    .list-preview-image {
        list-style: none;
        height: auto;

        background-color: var(--second-color);
        border: 2.5px solid var(--first-color);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
        border-radius: .3em;

        padding: 6px;

    }

    .preview-image {
        cursor: pointer;

        width: 48px;
        height: 75px;
        object-fit:cover;
        
        border: 2.5px solid var(--first-color);
        border-radius: .5em;
    }

    .selected-image {
        border: 2.5px solid var(--fourth-color);
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

    }

    .no-image-container {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--third-color);
    }

    .no-image {
        background-color: var(--second-color);
        border: 3px solid var(--first-color);
        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: larger;

        width: 320px;
        height: 500px;
    }

    .no-image-content {
        background-color: var(--first-color);
        padding: .6em;
        border-radius: 15px;

        display: flex;
        gap: .6em;
    }
    
    .profile-article {
        height: 20em;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 2.5em;
    }

    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 1em;
    }
    
    .profile-image-container {
        width: 150px;
        height: 170px;
        
        overflow: visible;
        position: relative;

    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit:cover;

        border-radius: 15px;
        border: 3px solid var(--first-color);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
    }

    .navigation-buttons-and-type {
        display: flex;
        flex-direction: column;
    }

    .type {
        background-color: var(--first-color);

        font-size: larger;
        font-weight: bold;
        padding: .8em;

        text-transform: uppercase;

        border-radius: 10px;
        border: 2px solid var(--fourth-color);

        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        display: flex;
        text-align: center;
        align-self: center;

        position: relative;
        bottom: 4em;
    }

    .notification-button, .profile-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 10px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        margin: 1em;
        margin-right: 1.2em;

        width: 12em;

        position: relative;
        bottom: 2em;
    }

    .notification-button:hover, .profile-button:hover {
        background-color: var(--second-accent-color);
    }

    .resume-article {
        grid-column: 2;
        gap: 2em;

        display: flex;
        align-self: center;
        flex-direction: column;

        padding: 0 3em 0 1em;
        height: 20em;

        grid-column: 2;
        grid-row: 2;
    }

    .reward {
        background-color: var(--first-color);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        padding: .6em .5em .5em .8em;

        height: 5em;
        width: 5em;

        display: flex;
        justify-content: center; 
        align-items: center;     
        text-align: center;    
        
        font-weight: bold;
        font-size: xx-large;

    }
    
    .down-section {
        display: flex;
        align-self: center;
        justify-content: center;

        gap: 5em;
    }

    .categories-section {
        display: flex;
        flex-direction: column;
        align-self: center;

        gap: 2em;
        padding-top: .8em;
    }

    .category, .subcategory {
        display: flex;
        justify-content: center; 
        align-items: center;     
        text-align: center; 
    }

    .main-text {
        border-radius: 0em .5em .5em 0em;

        display: flex;
        flex-direction: column;

        padding: 0 40px 0 40px;
        gap: 1em;

        height: fit-content;
        grid-row: 3;
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .profile-name, .name, .found-public-transport, .no-location, .category, .subcategory, .color, .gender, .date-time, .location, .description, .location-description {
        background-color: var(--first-color);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        padding: .6em .5em .5em .8em;
        height: 2.6em;
        width: 100%;

        white-space: nowrap;         
        overflow: hidden;            
        text-overflow: ellipsis;        
    }

    .name-section, .category-section, .reward-section, .public-transport-section, .color-section, .gender-section, .date-time-section, .location-section {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .name {
        font-weight: bold;
    }
    
    .description, .location-description {
        min-height: 10em;
        height: auto;   
    }

    .color-gender, .date-time-location {
        display: flex;
        width: 100%;
        gap: 15px;
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
        animation: aparecer 0.5s;

    }

    .carousel:not(:hover) .carousel-arrow-next{
        transform: translateX(100px);
        animation: desaparecer 0.5s;
    
    }

    .carousel:hover .carousel-arrow-prev{
        transform: translateX(-20px);
        animation: aparecer 0.5s;

    }

    .carousel:not(:hover) .carousel-arrow-prev{
        transform: translateX(-100px);
        animation: desaparecer 0.5s;

    }

</style>