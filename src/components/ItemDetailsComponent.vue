<template>
    <main class="ItemDetailsComponent">
        <span class="type">{{"OBJETO " + singleItem?.type }}</span>
        <router-link class='back-button' to="/hub"> Volver </router-link>
        <article class="item">
            <article v-if="singleItem?.url_images && singleItem?.url_images.length > 0" class="carousel-container">
                <section class="list">
                    <ul v-if="singleItem?.url_images.length > 1" class="list-preview-image">
                        <li 
                            v-for="(file, index) in singleItem?.url_images" 
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

                <v-window 
                    class="carousel" 
                    show-arrows 
                    v-model="selectedIndex"
                    @mouseenter="isHovered = true"
                    @mouseleave="isHovered = false"
                >
                    <template v-slot:prev="{ props }">
                        <v-icon class="carousel-arrow-prev" :class="{ 'arrow-visible': isHovered }" @click="props.onClick" size="90">mdi-arrow-left-thick</v-icon>
                    </template>
    
                    <template v-slot:next="{ props }">
                        <v-icon class="carousel-arrow-next" :class="{ 'arrow-visible': isHovered }" @click="props.onClick" size="90">mdi-arrow-right-thick</v-icon>
                    </template>
    
                    <v-window-item eager class="files" v-for="(file, index) in singleItem?.url_images" :key="index">
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
                <label class="label profile-label" for="profile-article">Usuario asociado</label>
                <section v-if="foreignUserProfile" class="profile">
                    <figure class="profile-image-container">
                        <img class="profile-image" :src="foreignUserProfile.profilePictureURL" alt="profile-image">
                    </figure>
                    <router-link v-if="foreignUserProfile.isPublic" class="profile-button" :to="{ name: 'foreign-profile', params: { userID: foreignUserProfile.id},  }">Perfil de usuario</router-link>
                    <p v-else class="profile-name">{{ foreignUserProfile.username }}</p>
                </section>
                
                <section class="interaction-buttons">
                    <section class="save-container">
                        <v-icon class="save-icon" size="80">mdi-content-save</v-icon>
                        <span class="tooltip">Guardar petición</span>
                    </section>
                    <v-icon class="info-icon" @click="showInfoDialog = true" size="35">mdi-information-outline</v-icon>
                    <router-link v-if="singleItem" :to="{ name: 'notify-finding', params: { itemID: singleItem.id },  }" class="notify-container">
                        <v-icon class="notify-icon" size="80">mdi-bell</v-icon>
                        <span class="tooltip">Notificar hallazgo</span>
                    </router-link>
                </section>

                <v-dialog v-model="showInfoDialog" max-width="450" max-height="600" scroll-strategy="close">
                    <template v-slot>
                        <section class="info-dialog">
                            <v-icon color="var(--fourth-color)">mdi-penguin</v-icon>
                            <p class="info">
                                Puedes guardar una petición para poder acceder a ella fácilmente en el futuro,
                                para hacerlo simplemente dale click a 'Guardar petición'.

                            </p>
                            <br>
                            <p class="info">
                                También puedes notificar a un usuario de que has encontrado su objeto,
                                para hacerlo simplemente dale click a 'Notificar hallazgo'.
                            </p>
                            <br>
                        </section>
                    </template>
                </v-dialog>
            </article>

            <article class="resume-article">
                <section class="normal-section name-section">
                    <label class="label" for="name">Descripción corta / Nombre</label>
                    <span class="field name">{{ singleItem?.name }}</span>
                </section>

                <section class="down-section">
                    <section v-if="singleItem?.type === 'Perdido' && singleItem?.reward" class="reward-section">
                        <label class="label reward-label" for="reward">Recompensa</label>
                        <span class="reward">{{ singleItem?.reward + " €" }}</span>
                    </section>
                    <section class="categories-section">
                        <section class="category-section">
                            <label class="label" for="category">Categoría</label>
                            <span class="field category">{{ singleItem?.category }}</span>
                        </section>
        
                        <section v-if="singleItem?.subcategory" class="normal-section subcategory-section">
                            <label class="label" for="subcategory">Subcategoría</label>
                            <span class="field subcategory">{{ singleItem?.subcategory }}</span>
                        </section>
                    </section>
                </section>
            </article>

            <article class="main-text">

                <section class="color-gender-race-brand">
                    <section class="normal-section color-section">
                        <label class="label" for="color">Color</label>
                        <span class="field color">{{ singleItem?.color }}</span>
                    </section>

                    <section v-if="singleItem?.gender" class="normal-section gender-section">
                        <label class="label" for="gender">Sexo</label>
                        <span class="field gender">{{ singleItem?.gender }}</span>
                    </section>

                    <section v-if="singleItem?.race" class="normal-section race-section">
                        <label class="label" for="race">Raza</label>
                        <p class="field race">{{ singleItem?.race }}</p>
                    </section>

                    <section v-if="singleItem?.brand" class="normal-section brand-section">
                        <label class="label" for="brand">Marca</label>
                        <p class="field brand">{{ singleItem.brand }}</p>
                    </section>
                </section>

                <section class="date-time">
                    <section class="normal-section date-section">
                        <label v-if="singleItem?.type === 'Perdido'" class="label" for="date">Fecha(s) de pérdida</label>
                        <label v-else class="label" for="date-time">Fecha(s) de encuentro</label>
                        <span class="field date">{{ singleItem?.date }}</span>
                    </section>

                    <section v-if="singleItem?.time" class="normal-section time-section">
                        <label v-if="singleItem?.type === 'Perdido'" class="label" for="time">Hora de pérdida</label>
                        <label v-else class="label" for="time">Hora de encuentro</label>
                        <p class="field time">{{ singleItem.time }}</p>
                    </section>

                </section>

                <section class="normal-section location-section">
                    <label class="label odd-label" for="location">Última ubicación conocida</label>
                    <span class="field location">{{ singleItem?.location }} <v-icon class="map-icon" @click="showMap = true" >mdi-map-search-outline</v-icon></span>
                    <v-dialog v-model="showMap" scroll-strategy="close">
                        <template v-slot>
                            <div id="map"></div>
                        </template>
                    </v-dialog>
                </section>

                <section class="transport-container">
                    <section v-if="singleItem?.publicTransport && singleItem?.type === 'Perdido'" class="normal-section public-transport-section">
                        <label v-if="singleItem?.type === 'Perdido'" class="label odd-label" for="public-transport">Perdido en</label>
                        <label v-else class="label odd-label" for="public-transport">Encontrado en</label>
                        <span class="field public-transport">{{ singleItem?.publicTransport }}</span>
                    </section>

                    <section v-if="singleItem?.transportInfo" class="normal-section transportInfo-section">
                        <label class="label" for="transportInfo">Información sobre el transporte</label>
                        <p class="field transportInfo">{{ singleItem.transportInfo }}</p>
                    </section>

                </section>

                <section class="description-section">
                    <label class="label odd-label" for="description">Descripción del objeto</label>
                    <p class="field description">{{ singleItem?.detailedDescription }}</p>
                </section>
                
                <section v-if="singleItem?.locationDescription" class="location-description-section">
                    <label class="label odd-label" for="location-description">Descripción de lugar de pérdida</label>
                    <p class="field location-description">{{ singleItem?.locationDescription }}</p>
                </section>

                <section v-if="userProfile?.id === foreignUserProfile?.id" class="delete-button-section">
                    <button class="delete-button" @click="showDeleteDialog = true">BORRAR OBJETO DE NUESTROS SERVICIOS</button>
                    <v-dialog v-model="showDeleteDialog" max-width="450" max-height="600" scroll-strategy="close">
                        <template v-slot>
                            <section class="info-dialog">
                                <v-icon color="var(--fourth-color)">mdi-penguin</v-icon>
                                <p class="info">
                                    ¿Estás seguro de que quieres borrar este objeto?
                                </p>
                                <p>
                                    Esta acción no se puede deshacer.
                                </p>
                                <div class="buttons-in-dialog">
                                    <button class="delete-button" @click="deleteItem()">BORRAR OBJETO</button>
                                    <button class="cancel-button" @click="showDeleteDialog = false">CANCELAR</button>
                                </div>
                                <br>
                            </section>
                        </template>
                    </v-dialog>
                </section>
            </article>
        </article>
    </main>
</template>

<script setup lang="ts">
import { MixedItem } from '@/interfaces/items';
import { UserDetails } from '@/interfaces/user';
import L from 'leaflet';
import { nextTick, Ref, ref, watch } from 'vue';
    
    const props = defineProps<{
        singleItem: MixedItem | undefined
        foreignUserProfile: UserDetails | null
        userProfile?: UserDetails | null
    }>()

    const emit = defineEmits<{
        (e: 'deleteItem'): void
    }>()

    const map = ref<L.Map | null>(null);
    const markerIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    async function initMap() {
        const mapContainer = document.getElementById('map');
        if (mapContainer && props.singleItem) {
            map.value = L.map(mapContainer, {
                doubleClickZoom: false,
            }).setView([props.singleItem?.latLong[0], props.singleItem?.latLong[1]], 18);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map.value as L.Map);

            L.marker([props.singleItem?.latLong[0], props.singleItem?.latLong[1]], { icon: markerIcon }).addTo(map.value as L.Map);
        }
    }

    const selectedIndex: Ref<number> = ref(0)
    const isHovered: Ref<boolean> = ref(false)
    const showInfoDialog : Ref<boolean> = ref(false)
    const showDeleteDialog : Ref<boolean> = ref(false)
    const showMap : Ref<boolean> = ref(false)

    watch(showMap, async (newStep) => {
        if (newStep) {
            await nextTick();
            initMap();
        }
    });

    function deleteItem() : void {
        emit("deleteItem")
    }

</script>

<style scoped lang="css">
    #map {
        min-height: 300px;
        width: 50%;

        align-self: center;

        border-radius: .8em;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, .9);
    }


    .ItemDetailsComponent {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        opacity: 0;
        animation: aparecer 1s forwards;

        padding: 5em 0 5em 0;
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

        padding-bottom: 2em;

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

        position: relative;
    }

    .carousel {
        border-radius: 1em;
        border: 3px solid var(--first-color);

        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);

        position: relative;
        top: 3px;
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

        cursor: pointer;

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

    .no-image-container {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: var(--third-color);

        grid-column: 1;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .no-image {
        background-color: var(--second-color);
        border: 3px solid var(--first-color);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
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
        justify-content: space-evenly;

        position: relative;

    }

    .profile {
        display: flex;
        flex-direction: column;

        gap: 2em;
    }
    
    .profile-image-container {
        width: 10em;
        height: 10em;
        
        overflow: visible;
        position: relative;

        align-self: center;

    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit:cover;

        border-radius: 15px;
        border: 3px solid var(--fourth-color);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
    }

    .type {
        background-color: var(--first-color);
        color: var(--text-color);

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

        width: auto;
        min-width: 10.5em;

        position: relative;
        top: 1.5em;

    }

    .interaction-buttons{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        gap: 3em;

        position: relative;

        top: 1em;
    }

    .info-dialog{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        background-color: var(--second-color);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
        color: var(--text-color);
        border-radius: 1em;
        border: 3px solid var(--first-color);
        font-family: var(--font-poppins);
        padding: 24px;
        gap: 1em;
    }

    .info{
        text-align: justify;
    }

    .save-container, .notify-container {
        text-decoration: none;

        display: flex;
        align-items: center;
        justify-content: center;

        gap: 2em;

        background-color: var(--second-color);
        border: 3px solid var(--fourth-color);

        box-shadow: 4px 4px 5px rgba(0, 0, 0, 1);
        padding: .5em 1em 1em 1em;
        border-radius: 1.5em;


    }

    .save-icon, .notify-icon{
        cursor: pointer;
        color: var(--first-accent-color);
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .6));
    }

    .info-icon {
        position: absolute;
        left: 120%;
        bottom: 98%;

        cursor: pointer;
        color: var(--first-accent-color);
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, .9));
    }

    .save-icon:hover, .notify-icon:hover, .info-icon:hover{
        color: var(--second-accent-color);
    }

    .profile-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 10px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        width: 12em;
    }

    .profile-button:hover {
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

    .down-section {
        display: flex;

        gap: 1.5em;
    }

    .reward {
        background-color: var(--first-color);
        border-radius: 10px;
        border: 3px solid var(--fourth-color);
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
    
    .categories-section {
        display: flex;
        flex-direction: column;
        justify-content: center;

        width: 100%;
        gap: 2em;
        padding-top: .8em;
    }

    .category, .subcategory {
        display: flex;
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

    .label {
        position: relative;

        background-color: var(--second-color);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        color: var(--text-color);
        padding: .2em .4em .2em .4em;
        border-radius: .5em;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        opacity: .8;

        width: fit-content;
        top: 10%;
    }

    .reward-label{
        opacity: .95;
        border: 2px solid var(--fourth-color);
        font-size: 15px;
    }

    .odd-label{
        position: relative;
        top: .5em;
    }

    .profile-label{
        position: absolute;
        top: 69%;
        left: 15%;
    }

    .field {
        background-color: var(--first-color);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        padding: .6em .8em .5em .8em;

        min-height: 2.6em;
        height: auto;
        width: 100%;

        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;        
    }

    .date, .location, .time{
        text-align: center;
    }

    .map-icon{
        background-color: var(--second-color);
        padding: 20px;
        border-radius: 1em;
        margin-left: .4em;

        cursor: pointer;
    }

    .profile-name{
        background-color: var(--first-color);
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        padding: .6em .8em .5em .8em;

        min-height: 2.6em;
        min-width: 10em;
        height: auto;
        width: 100%;

        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word;  
        text-align: center;
    }

    .normal-section {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .time-section{
        align-self: center;
    }

    .name {
        font-weight: bold;
    }
    
    .description, .location-description {
        min-height: 10em;
        text-align: justify; 
    }

    .color-gender-race-brand, .date-time, .transport-container {
        display: flex;
        width: 100%;
        gap: 15px;
    }

    .delete-button-section{
        display: flex;
        align-items: center;
        justify-content: flex-end;

        padding-top: 1em;
    }

    .delete-button, .cancel-button{
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 10px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

    }

    .delete-button:hover, .cancel-button:hover{
        background-color: var(--second-accent-color);
    }

    .buttons-in-dialog{
        display: flex;
        gap: 1em;
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

    .carousel {
        position: relative;
    }

    .carousel-arrow-next {
        position: absolute;
        top: 50%;
        opacity: 1;
        z-index: 10;
        transition: transform 0.3s ease;

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

    .save-container, .notify-container {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        position: absolute;
        bottom: 92%;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--first-color);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        color: var(--text-color);
        padding: .7em;
        border-radius: .8em;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;

        border: 2px solid var(--fourth-color);
        
        opacity: 1;
    }

    @media (max-width: 1090px) {
        .item {
            width: 650px;

            display: grid;
            grid-template-columns: auto;
            grid-template-rows: auto auto auto auto;

            padding-bottom: 0;

        }

        .profile-article {
            grid-column: 1;
            grid-row: 4;

            align-items: center;
        }

        .carousel-container {
            grid-column: 1;
            grid-row: 1;

            width: 100%;
            align-items: center;
            justify-content: center;
        }

        .no-image-container {
            grid-column: 1;
            grid-row: 1;

            padding: 4.7em 0 4em 0;
        }

        .resume-article {
            padding: 0 40px 0 40px;
            grid-column: 1;
            grid-row: 2;
        }

        .main-text {
            grid-column: 1;
            grid-row: 3;
        }

        .interaction-buttons{
            flex-direction: row;

            padding-bottom: 1em;
            gap: 1em;
        }

        .info-icon {
            left: 109%;
        }

        .profile-label{
            left: 12%;
        }

    }

    @media (max-width: 700px) { 
        #map {
            width: 70%;
        }

        .item {
            width: 350px;
            font-size: smaller;

            padding-bottom: 0;
        }

        .list {
            display: none;
        }

        .carousel-container {
            width: 100%;
            align-items: center;
            justify-content: center;
        }

        .files {
            width: 280px;
            height: 400px;
        }

        .no-image {
            font-size: medium;

            width: 280px;
            height: 400px;

        }

        .no-image-container {
            grid-column: 1;
            grid-row: 1;

            width: 344px;
            height: 510px;

            padding: 0 0 1em 0;
        }

        .resume-article {
            padding: 0 1em 0 1em;
        }

        .interaction-buttons{
            flex-direction: row;

            gap: 1em;
        }

        .main-text {
            padding: 1em 1em 0 1em;
            width: 344px;
        }

        .profile-article {
            grid-column: 1;
            grid-row: 4;

            height: auto;
            width: 344px;
            gap: 2em;

            flex-direction: column;

            padding: 2em 0 2em 0;
        }

        .profile-image-container{
            display: none;
        }

        .profile-button {
            width: 15em;

            font-size: medium;
        }

        .info-icon {
            left: 103%;
            bottom: 0%;
        }

        .profile-label{
            left: 33.5%;
            top: 4.2%;
        }

        .location-section{
            position: relative;
        }

        .map-icon{
            position: absolute;
            left: 85%;

            box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        }

    }

</style>