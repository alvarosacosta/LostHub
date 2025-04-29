<template>
    <main class="CreateItemComponent">
        <button class='back-button' @click="$router.back()"> Volver </button>
        <v-form class="form" ref="formRef" @submit.prevent="onSubmit" v-slot="{ isValid }">
            <section class="title-container">
                <h1 class="title">{{ currentTitle }}</h1>
                <span class="step-number">{{ step }}</span>

            </section>

            <section class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
            </section>

            <v-window class="window" v-model="step" :touch="false" >
                <v-window-item :value="1">
                    <article class="window-step">
                        <v-btn-toggle
                            class="type-buttons"
                            v-model=type
                            divided
                            required
                            
                        >
                            <v-btn 
                                density="comfortable"
                                base-color="var(--fourth-color)" 
                                color="var(--second-color)"
                                class="type-button" 
                                value="Perdido"
                            >He perdido algo</v-btn>

                            <v-btn 
                                density="comfortable"
                                base-color="var(--fourth-color)"
                                color="var(--second-color)" 
                                class="type-button" 
                                value="Encontrado"
                            >He encontrado algo</v-btn>
                        </v-btn-toggle>
                    </article>
                </v-window-item>

                <v-window-item :value="2">
                    <article class="window-step">
                        <v-text-field
                            class="field"
                            v-model=name
                            :rules="nameRules"
                            placeholder="Descripción corta / Nombre *"
                            label="Descripción corta / Nombre *"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            required
                        ></v-text-field>

                        <section class="category-subcategory">
                            <v-select 
                                class="field"
                                v-model=category
                                :items="categoryOptions"
                                :rules="requiredField"
                                placeholder="Categoría *"
                                label="Categoría *"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                clearable
                                required
                            ></v-select>
    
                            <v-select
                                class="field"
                                v-model=subcategory
                                :items="filteredSubcategories"
                                :rules="requiredField"
                                placeholder="Subcategoría"
                                label="Subcategoría"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                :disabled="!category"
                                clearable
                            ></v-select>
                        </section>

                        <v-textarea
                            class="field"
                            v-model=description
                            :rules="descriptionRules"
                            placeholder="Descripción detallada *"
                            label="Descripción detallada *"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            required
                        ></v-textarea>

                        <section class="color-gender">
                            <v-select 
                                class="field"
                                v-model=color
                                :items="colorOptions"
                                :rules="requiredField"
                                placeholder="Color *"
                                label="Color *"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                clearable
                                required
                            ></v-select>
    
                            <v-select 
                                v-if="category == 'Animal'"
                                class="field"
                                v-model=gender
                                :items="genderOptions"
                                placeholder="Sexo"
                                label="Sexo"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                clearable
                            ></v-select>
                        </section>

                        <section class="file-uploader">
                            <v-file-upload 
                                class="field"
                                :model-value=files
                                color="var(--fourth-color)"
                                density="compact"
                                variant="compact"
                                clearable 
                                multiple
                                accept="image/*"
                                show-size
                                icon="mdi-upload"
                                title="¡Arrastra tus imágenes aquí!"
                            ></v-file-upload>

                        </section>
                        
                    </article>
                </v-window-item>

                <v-window-item :value="3">
                    <article class="window-step">
                        <v-text-field
                            class="field"
                            v-model=location
                            :rules="requiredField"
                            placeholder="Ubicación *"
                            label="Ubicación *"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            required
                        ></v-text-field>

                        <div id="map"></div>

                        <v-textarea
                            class="field under-map"
                            v-model=locationDescription
                            placeholder="Descripción de la ubicación"
                            label="Descripción de la ubicación"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                        ></v-textarea>

                        <v-select 
                            class="field"
                            v-model=publicTransport
                            :items="publicTransportOptions"
                            placeholder="Transporte público"
                            label="¿Perdido en transporte público?"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            clearable
                        ></v-select>
                    </article>
                </v-window-item>

                <v-window-item :value="4">
                    <article class="window-step">
                        <section class="datetime">
                            <v-date-input 
                                class="date"
                                v-model="date" 
                                :rules="requiredField"
                                hide-actions
                                label="Fecha *" 
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                required
                            ></v-date-input>

                            <v-text-field
                                class="time"    
                                v-model="time"
                                :active="timeMenu"
                                :rules="requiredField"
                                label="Hora *" 
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                required
                            >
                                <v-menu
                                    v-model="timeMenu"
                                    :close-on-content-click="false"
                                    activator="parent"
                                    transition="scale-transition"
                                >
                                    <v-time-picker
                                        v-model="time"
                                        format='24hr'
                                        hide-header
                                        scrollable
                                        color="var(--first-color)"
                                        bg-color="var(--fourth-color)"
                                    ></v-time-picker>
                                </v-menu>
                            </v-text-field>
                        </section>
                    </article>
                </v-window-item>

                <v-window-item :value="5">
                    <article class="window-step">
                        <section class="reward-delivery-location">
                            <v-text-field
                                v-if="type === 'Perdido'"
                                class="field reward"
                                type="number"
                                v-model=reward
                                placeholder="Recompensa (€)"
                                label="Recompensa por la búsqueda (€)"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                required
                            ></v-text-field>
    
                            <v-text-field
                                v-if="type === 'Encontrado'"
                                class="field deliveryLocation"
                                v-model=deliveryLocation
                                :rules="requiredField"
                                placeholder="Ubicación de entrega *"
                                label="Ubicación donde se ha entregado el objeto *"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                required
                            ></v-text-field>
                        </section>
                    </article>
                </v-window-item>
            </v-window>

            <v-card-actions>
                <v-icon v-if="step > 1" class="arrow" @click="step--" size="90">mdi-arrow-left-thick</v-icon>

                <v-spacer></v-spacer>

                <v-icon v-if="step < 5" class="arrow" @click="step++" size="90">mdi-arrow-right-thick</v-icon>
                <v-icon v-if="step === 5" class="arrow" @click="onSubmit" size="90">mdi-arrow-right-thick</v-icon>
            </v-card-actions>
        </v-form>
    </main>
</template>

<script setup lang="ts">
import { Category, categoryToSubcategories, Color, Gender, PublicTransports, Subcategory } from '@/enums/item_enums';
import { computed, Ref, ref, watch, nextTick } from 'vue'
import L from 'leaflet';
import { reverseGeocode } from '@/utils/nominatim';

    const type : Ref<string> = ref('Perdido');

    const name : Ref<string> = ref('');
    const category : Ref<Category | undefined> = ref();
    const subcategory : Ref<Subcategory | undefined> = ref();
    const description : Ref<string> = ref('');
    const color : Ref<Color | undefined> = ref();
    const gender : Ref<Gender | undefined> = ref();
    const files: Ref<File | File[] | undefined> = ref(undefined);
        
    const location : Ref<string> = ref('');
    const latLong : Ref<number[] | undefined> = ref();
    const locationDescription : Ref<string> = ref('');
    const publicTransport : Ref<PublicTransports | undefined> = ref();
    
    const time = ref()
    const date = ref()
    const timeMenu : Ref<boolean> = ref(false)
    const dateTime : Ref<Date> = ref(new Date());
            
    const reward : Ref<string> = ref('');
    const deliveryLocation : Ref<string> = ref('');
        
    const step : Ref<number> = ref(1)
    const currentTitle = computed(() => {
        switch (step.value) {
            case 1: return '¿Perdiste o encontraste algo?'
            case 2: return '¿Qué?'
            case 3: return '¿Dónde?'
            case 4: return '¿Cuándo?'
            case 5: return 'Datos finales'
            default: return 'Account created'
        }
    })

    const totalSteps = 5
    const progressWidth = computed(() => {
        return (step.value / totalSteps) * 100
    })

    const colorOptions = Object.values(Color)
    const genderOptions = Object.values(Gender)
    const categoryOptions = Object.values(Category);
    const publicTransportOptions = Object.values(PublicTransports); 

    const filteredSubcategories = computed(() => {
        return categoryToSubcategories[category.value as Category] || [];
    });

    const map = ref<L.Map | null>(null);
    let userMarker: L.Marker | null = null;
    const markerIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });

    async function onMapClick(e: L.LeafletMouseEvent) {
            const { lat, lng } = e.latlng;

        if (userMarker) {
            userMarker.setLatLng([lat, lng]);
        } else {
            userMarker = L.marker([lat, lng], { icon: markerIcon }).addTo(map.value);
        }
        latLong.value = [lat, lng]
        location.value = await reverseGeocode(lat, lng);
    }

    async function initMap() {
        const mapContainer = document.getElementById('map');
        if (mapContainer && !map.value) {
            map.value = L.map(mapContainer, {
                doubleClickZoom: false,
            }).setView([40.4168, -3.7038], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map.value);
            
            map.value.locate({
                setView: true,
                maxZoom: 16,
                timeout: 10000,
            });
            
            map.value.on('locationfound', async function (e) {
                if (!userMarker) {
                    userMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: markerIcon }).addTo(map.value);
                }

                latLong.value = [e.latlng.lat, e.latlng.lng]
                location.value = await reverseGeocode(e.latlng.lat, e.latlng.lng);
            });

            map.value.on('locationerror', function (e) {
                console.error('Error al obtener la ubicación:', e.message);
            });

            map.value.on('click', onMapClick);
        }
    }

    watch(step, async (newStep) => {
        if (newStep === 3) {
            await nextTick();
            initMap();
        }
    });

    const requiredField = [
        (value: string) => {
            if (value) return true
            return 'Campo obligatorio.'
        }
    ]

    const nameRules = [
        (value: string) => {
            if (value) return true
            return 'Campo obligatorio.'
        },

        (value: string) => {
            if (value?.length <= 10) return true
            return 'El nombre debe de tener menos de 10 carácteres.'
        },
    ]

    const descriptionRules = [
        (value: string) => {
            if (value) return true
            return 'Campo obligatorio.'
        },

        (value: string) => {
            if (value?.length >= 50) return true
            return 'La descripción debe tener al menos 50 caractéres.'
        },
    ]

    function onSubmit() {
        console.log('Form submitted');
    }
</script>

<style scoped lang="css">

    #map {
        min-height: 300px;
        width: 95%;

        border-radius: .8em;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, .9);
    }

    .CreateItemComponent {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;

        opacity: 0;
        animation: aparecer 1s forwards;
    }

    .form {
        background-color: var(--third-color);
        color: var(--text-color);

        box-shadow: 0px 0px 11px rgba(0, 0, 0, .9);
        width: 100%;
        max-width: 1000px;
        display: flex;
        flex-direction: column;

        border-radius: 1.2em;
        border: 3px solid var(--first-color);

        margin: 1em;
    }

    .title-container {
        background-color: var(--second-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;

        border-radius: 1em 1em 0 0;
    }

    .title, .step-number {
        font-size: 22px;
        font-weight: 600;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .progress-bar-container {
        width: 100%;
        height: 5px;
        background-color: var(--fourth-color);
        overflow: hidden;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 1);
    }

    .progress-bar {
        height: 100%;
        background-color: var(--first-color);
        transition: width 0.3s ease;
    }

    .window-step {
        padding: 32px 24px 32px 24px;
        min-height: 350px;

        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        gap: .5em;
    }

    .type-buttons{
        height: 10em;
        width: 80%;
        box-shadow: 1px 2px 2px rgba(0, 0, 0, 1);
    }

    .type-button {
        width: 50%;
        font-size: larger;
        font-weight: bold;

        color: var(--first-color);
    }

    .category-subcategory, .color-gender {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 95%;
        gap: 1em;
    }

    .file-uploader{
        width: 95%;
    }

    .field {
        width: 95%;
    }

    .under-map {
        padding-top: 1.5em
    }

    .datetime, .reward-delivery-location{
        display: flex;
        flex-direction: column;
        width: 95%;
        gap: 1em;
    }

    .reward-delivery-location{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 95%;
        gap: 1em;
    }

    .reward, .deliveryLocation {
        width: 60%;
    }

    ::v-deep(.v-time-picker-clock__item) {
        color: var(--fourth-color) !important;
    }

    ::v-deep(.v-time-picker-clock) {
        background-color: var(--second-color) !important; 
    }

    .v-card-actions {
        background-color: var(--second-color);
        box-shadow: 0px -2px 2px rgba(0, 0, 0, 1);
        display: flex;
        align-items: center;
        padding: 12px 24px;

        border-radius: 0 0 1em 1em;
    }

    .arrow {
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .6));
        color: var(--first-accent-color);

        position: relative;
    }

    .arrow:hover {
        color: var(--second-accent-color);
        transform: scale(1.2);

    }

    @media (max-width: 745px) {
        .type-buttons{
            height: auto;
            width: auto;
            box-shadow: none;

            display: flex;
            flex-direction: column;
            gap: 1em;
        }

        .type-button {
            width: 100%;
            font-size: large;
            font-weight: bold;

            border-radius: 1em;
        }
    }

</style>