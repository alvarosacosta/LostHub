<template>
    <main class="CreateItemComponent">
        <button class='back-button' @click="$router.back()"> Volver </button>
        <v-form class="v-window-container">
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
                            class="field top-field"
                            v-model=name
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

                        <v-file-input 
                            class="field"
                            v-model=files
                            label="Imágenes"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            multiple
                        ></v-file-input>
                        
                    </article>
                </v-window-item>

                <v-window-item :value="3">
                    <article class="window-step">
                        <v-text-field
                            class="field top-field"
                            v-model=location
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
                            label="¿Perdido en trasnporte público?"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            clearable
                            required
                        ></v-select>
                    </article>
                </v-window-item>

                <v-window-item :value="4">
                    <article class="window-step">
                        
                    </article>
                </v-window-item>

                <v-window-item :value="5">
                    <article class="window-step">
                        
                    </article>
                </v-window-item>
            </v-window>

            <v-card-actions>
                <v-icon v-if="step > 1" class="arrow" @click="step--" size="90">mdi-arrow-left-thick</v-icon>

                <v-spacer></v-spacer>

                <v-icon v-if="step < 5" class="arrow" @click="step++" size="90">mdi-arrow-right-thick</v-icon>
            </v-card-actions>
        </v-form>
    </main>
</template>

<script setup lang="ts">
import { computed, Ref, ref, watch, nextTick } from 'vue'
import L from 'leaflet';
import { Category, categoryToSubcategories, Color, Gender, PublicTransports, Subcategory } from '@/enums/item_enums';
import { getCurrentLocation } from '@/utils/geolocation';

    const type : Ref<string> = ref('');

    const name : Ref<string> = ref('');
    const category : Ref<Category | undefined> = ref();
    const subcategory : Ref<Subcategory | undefined> = ref();
    const description : Ref<string> = ref('');
    const color : Ref<Color | undefined> = ref();
    const gender : Ref<Gender | undefined> = ref();
    const files : Ref<File[] | undefined> = ref();
        
    const location : Ref<string> = ref('');
    const locationDescription : Ref<string> = ref('');
    const publicTransport : Ref<PublicTransports | undefined> = ref();
        
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

    const map = ref<L.Map | null>(null);
    const markerIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
        shadowSize: [41, 41]
    });


    watch(step, async (newStep) => {
        if (newStep === 3) {
            await nextTick();
            const mapContainer = document.getElementById('map');

            if (mapContainer && !map.value) {
                map.value = L.map(mapContainer).setView([40.4168, -3.7038], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                }).addTo(map.value);

                map.value.locate({ 
                    setView: true, 
                    maxZoom: 16, 
                    timeout: 10000 
                });

                map.value.on('locationfound', function(e) {
                    L.marker([e.latlng.lat, e.latlng.lng], { icon: markerIcon }).addTo(map.value)
                        .bindPopup('¡Tu ubicación!')
                        .openPopup();
                });

                map.value.on('locationerror', function(e) {
                    console.log('Error al obtener la ubicación:', e.message);
                });
                
            }
        }
    });

    const colorOptions = Object.values(Color)
    const genderOptions = Object.values(Gender)
    const categoryOptions = Object.values(Category);
    const publicTransportOptions = Object.values(PublicTransports); 

    const filteredSubcategories = computed(() => {
        return categoryToSubcategories[category.value as Category] || [];
    });


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

    .v-window-container {
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
        padding: 24px;
        min-height: 350px;

        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
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

    .field {
        width: 95%;
    }

    .top-field {
        padding-top: 1em;
    }

    .under-map {
        padding-top: 1.5em
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

</style>