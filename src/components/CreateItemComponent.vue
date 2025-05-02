<template>
    <main class="CreateItemComponent">
        <button class='back-button' @click="$router.back()"> Volver </button>
        <article class="form">
            <section class="title-container">
                <h1 class="title">{{ currentTitle }}</h1>
                <span class="step-number">{{ step }}</span>

            </section>

            <section class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
            </section>

            <v-window class="window" v-model="step" :touch="false" >
                <v-window-item :value="1">
                    <v-form class="window-step" ref="firstForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
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
                    </v-form>
                </v-window-item>

                <v-window-item :value="2">
                    <v-form class="window-step" ref="secondForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
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
                                @update:model-value="onCategoryChange()"
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

                            <v-text-field 
                                v-if="category == 'Animal' && subcategory"
                                class="field"
                                v-model=race
                                :rules="raceRules"
                                placeholder="Raza"
                                label="Raza"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                clearable
                            ></v-text-field>

                            <v-select 
                                v-if="category !== 'Animal'"
                                class="field"
                                v-model=brand
                                :items="brandOptions"
                                placeholder="Marca"
                                label="Marca"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                clearable
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
                                v-model=files
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
                        
                    </v-form>
                </v-window-item>

                <v-window-item :value="3">
                    <v-form class="window-step" ref="thirdForm" @submit.prevent="onSubmit" v-slot="{ isValid }">

                        <span class="map-tooltip">Haz click para marcar una ubicación</span>
                        <div id="map"></div>

                        <v-text-field
                            class="field under-map"
                            style="pointer-events: none;"
                            v-model=location
                            :rules="requiredField"
                            placeholder="Ubicación *"
                            label="Ubicación *"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            readonly
                            required
                        ></v-text-field>

                        <v-textarea
                            class="field"
                            v-model=locationDescription
                            placeholder="Descripción de la ubicación"
                            label="Descripción de la ubicación"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                        ></v-textarea>

                        <section class="public-transport">
                            <v-select 
                                v-if="type === 'Encontrado'"
                                class="field"
                                v-model=publicTransport
                                :items="publicTransportOptions"
                                placeholder="Transporte público"
                                label="¿Encontrado en transporte público?"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                clearable
                            ></v-select>
    
                            <v-select 
                                v-if="type === 'Perdido'"
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
    
                            <v-text-field
                                v-if="publicTransport"
                                class="field"
                                v-model=transportInfo
                                :rules="infoTransportRules"
                                placeholder="Información sobre el transporte"
                                label="Información sobre el transporte"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                clearable
                            >
                            </v-text-field>
                        </section>
                    </v-form>
                </v-window-item>

                <v-window-item :value="4">
                    <v-form class="window-step" ref="fourthForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
                        <section class="datetime">
                            <v-text-field
                                v-model="displayDate"
                                label="Fecha(s) *"
                                required
                                :rules="requiredField"
                                readonly
                                @click="menu = true"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                prepend-icon="mdi-calendar"
                            >
                                <v-menu
                                    v-model="menu"
                                    activator="parent"
                                    transition="scale-transition"
                                    :close-on-content-click="false"
                                >
                                    <v-date-picker
                                        v-model="date"
                                        multiple
                                        :max="maxDate"
                                        @update:model-value="updateDisplay"
                                        hide-header
                                        hide-actions
                                        show-adjacent-months
                                        variant="solo-filled"
                                        bg-color="var(--fourth-color)"
                                    />
                                </v-menu>
                            </v-text-field>


                            <section class="time-container">
                                <v-text-field 
                                    class="time"    
                                    v-model="startTime"
                                    label="Entre las" 
                                    color="var(--first-color)"
                                    bg-color="var(--fourth-color)"
                                    variant="solo-filled"
                                    type="time"
                                    prepend-icon="mdi-clock-time-four-outline"
    
                                ></v-text-field>
    
                                <v-text-field 
                                    class="time"    
                                    v-model="endTime"
                                    :rules="endTimeRules"
                                    label="y las" 
                                    type="time"
                                    variant="solo-filled"
                                    color="var(--first-color)"
                                    bg-color="var(--fourth-color)"
                                    :disabled="!startTime"
                                ></v-text-field>
                            </section>

                            <v-switch
                                class="confidence"
                                v-model="confidence"
                                label="¿Estás seguro?" 
                                color="var(--first-accent-color)"
                            >
                            </v-switch>
                        </section>
                    </v-form>
                </v-window-item>

                <v-window-item :value="5">
                    <v-form class="window-step" ref="fifthForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
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

                            <section class="delivery-options">
                                <v-switch
                                    v-if="type === 'Encontrado'"
                                    class="field deliverySwitch"
                                    v-model=itemDelivered
                                    label="El objeto ha sido entregado en alguna oficina/lugar"
                                    color="var(--first-accent-color)"
                                    required
                                ></v-switch>
        
                                <v-text-field
                                    v-if="type === 'Encontrado' && itemDelivered"
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
                        </section>
                    </v-form>
                </v-window-item>
            </v-window>

            <v-card-actions>
                <v-icon v-if="step > 1" class="arrow" @click="step--" size="90">mdi-arrow-left-thick</v-icon>

                <v-spacer></v-spacer>

                <v-icon class="arrow" @click="onSubmit" size="90">mdi-arrow-right-thick</v-icon>
            </v-card-actions>
        </article>
    </main>
</template>

<script setup lang="ts">
import { Category, categoryToSubcategories, Color, Gender, PublicTransports, Subcategory, Brand, ItemType } from '@/enums/item_enums';
import { computed, Ref, ref, watch, nextTick } from 'vue'
import L from 'leaflet';
import { reverseGeocode } from '@/utils/nominatim';
import { FoundItem, Item, ItemImages, LostItem, MixedItem } from '@/interfaces/items';

    const type : Ref<string> = ref('Perdido');

    const name : Ref<string> = ref('');
    const category : Ref<Category | undefined> = ref();
    const subcategory : Ref<Subcategory | undefined> = ref();
    const description : Ref<string> = ref('');
    const color : Ref<Color | undefined> = ref();
    const gender : Ref<Gender | undefined> = ref();
    const race : Ref<string> = ref('');
    const brand : Ref<Brand | undefined> = ref();
    const files: Ref<File[] | undefined> = ref(undefined);
        
    const location : Ref<string> = ref('');
    const latLong : Ref<number[]> = ref([40.4168, -3.7038]);
    const locationDescription : Ref<string> = ref('');
    const publicTransport : Ref<PublicTransports | undefined> = ref();
    const transportInfo : Ref<string> = ref('');
    
    const date = ref([])
    const maxDate = new Date();
    const menu : Ref<boolean> = ref(false)
    const formatDate = (d: string | number | Date) => new Date(d).toLocaleDateString('es-ES')
    function updateDisplay(val: (string | number | Date)[]) {
        displayDate.value = val.map(formatDate).join(' ')
    }

    const confidence : Ref<boolean> = ref(false)
    const startTime = ref()
    const endTime = ref()
    const displayDate : Ref<string> = ref('')

    const itemDelivered : Ref<boolean> = ref(false)
    const reward : Ref<string> = ref('');
    const deliveryLocation : Ref<string> = ref('');
    
    const emit = defineEmits<{
        (e: 'success', item : MixedItem, images : ItemImages): void
        (e: 'failure', error: string): void
    }>()
        
    var step : Ref<number> = ref(1)
    const currentTitle = computed(() => {
        switch (step.value) {
            case 1: return '¿Perdiste o encontraste algo?'
            case 2: return '¿Qué?'
            case 3: return '¿Dónde?'
            case 4: return '¿Cuándo?'
            case 5: return 'Datos finales'
            default: return ''
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
    const brandOptions = Object.values(Brand);

    const filteredSubcategories = computed(() => {
        return categoryToSubcategories[category.value as Category] || [];
    });

    function onCategoryChange() : void {
        subcategory.value = undefined
        race.value = ''
        gender.value = undefined
    }

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
            userMarker = L.marker([lat, lng], { icon: markerIcon }).addTo(map.value as L.Map);
        }
        latLong.value = [lat, lng]
        location.value = await reverseGeocode(lat, lng);
    }

    async function initMap() {
        const mapContainer = document.getElementById('map');
        if (mapContainer && !map.value) {
            map.value = L.map(mapContainer, {
                doubleClickZoom: false,
            }).setView([40.4168, -3.7038], 10);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map.value as L.Map);
            
            map.value.locate({
                setView: true,
                maxZoom: 18,
                timeout: 10000,
            });
            
            map.value.on('locationfound', async function (e) {
                if (!userMarker) {
                    userMarker = L.marker([e.latlng.lat, e.latlng.lng], { icon: markerIcon }).addTo(map.value as L.Map);
                }

                (map.value as L.Map).setView([e.latlng.lat, e.latlng.lng], 18);

                latLong.value = [e.latlng.lat, e.latlng.lng]
                location.value = await reverseGeocode(e.latlng.lat, e.latlng.lng);
            });

            map.value.on('locationerror', function (e) {
                console.error('Error obtaining  ubication:', e.message);
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
            if (value?.length <= 20) return true
            return 'El nombre debe de tener menos de 20 carácteres.'
        },
    ]

    const endTimeRules = [
        (value: string) => {
            if (!value) return true;

            const [startHours, startMinutes] = startTime.value.split(':').map(Number);
            const [endHours, endMinutes] = value.split(':').map(Number);
            
            const startTotalMinutes = startHours * 60 + startMinutes;
            const endTotalMinutes = endHours * 60 + endMinutes;
            
            if (endTotalMinutes < startTotalMinutes) {
                return 'Hora final inválida';
            }
            
            return true;
        }
    ];

    const raceRules = [
        (value: string) => {
            return !value || value.length <= 20 || 'La raza debe de tener menos de 20 carácteres.';
        }
    ]

    const infoTransportRules = [
        (value: string) => {
            return !value || value.length <= 20 || 'La información sobre el transporte debe de tener menos de 15 carácteres.';
        }
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
    
    const firstForm = ref()
    const secondForm = ref()
    const thirdForm = ref()
    const fourthForm = ref()
    const fifthForm = ref()

    async function onSubmit() {

        switch (step.value) {
            case 1:
                var { valid } = await firstForm.value.validate()

                if (!type.value) {
                    emit('failure', 'Asegúrate de elegir una opción antes de continuar.');
                    return;
                }

                break;

            case 2:
                var { valid } = await secondForm.value.validate()

                if (files.value) {
                    const fileList = Array.isArray(files.value) ? files.value : [files.value];

                    if (fileList.length > 5) {
                        emit('failure', `Solo se pueden introducir como máximo 5 imágenes.`);
                        return;
                    }

                    for (const file of fileList) {
                        if (file.size > 5 * 1024 * 1024) {
                            emit('failure', 'Al menos una de las imágenes pesa más de 5MB.');
                            return;
                        }

                        if (!file.type.startsWith('image/')) {
                            emit('failure', `Al menos uno de los archivos no es una imagen.`);
                            return;
                        }
                    }
                }

                break;

            case 3:
                var { valid } = await thirdForm.value.validate()
                break;

            case 4:
                var { valid } = await fourthForm.value.validate()
                break;

            case 5:
                var { valid } = await fifthForm.value.validate()
                if (!valid) {
                    break;
                }

                const item : Item = {
                    type: type.value as ItemType,
                    name: name.value,
                    category: category.value as Category,
                    subcategory: subcategory.value,
                    detailedDescription: description.value,
                    color: color.value as Color,
                    gender: gender.value as Gender,
                    race: race.value,
                    brand: brand.value,

                    location: location.value,
                    latLong: latLong.value,
                    locationDescription: locationDescription.value,
                    publicTransport: publicTransport.value,
                    transportInfo: transportInfo.value,

                    date: displayDate.value,
                    time: startTime.value + ' - ' + endTime.value,
                    confidence: confidence.value
                }

                const itemFiles : ItemImages = {
                    itemImages: files.value,
                }

                if (type.value == 'Perdido'){
                    const lostItem : LostItem = {
                        ...item,
                        type: ItemType.Perdido,
                        reward: reward.value,
                    }

                    emit('success', lostItem, itemFiles)
                    return;

                } else if (type.value == 'Encontrado'){
                    const foundItem : FoundItem = {
                        ...item,
                        type: ItemType.Encontrado,
                        deliveryLocation: deliveryLocation.value

                    }

                    emit('success', foundItem, itemFiles)
                    return;

                } else {
                    emit('failure', 'Ha ocurrido un error inesperado al recoger los datos.');
                    return;
                }

            default:
                break;
        }

        if (!valid) {
            emit('failure', 'Hay campos incompletos o mal rellenados.');
            return;

        } else if (step.value < 5) {
            step.value++;
        }

    }
</script>

<style scoped lang="css">

    #map {
        min-height: 250px;
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

    .category-subcategory, .color-gender, .delivery-options {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 95%;
        gap: 1em;
    }

    .delivery-options {
        flex-direction: column;
    }

    .file-uploader{
        width: 95%;
    }

    ::v-deep(.v-file-upload, .v-file-upload-icon) {
        color: var(--first-color) !important;
    }

    .field {
        width: 95%;
    }

    .deliverySwitch{
        width: 60%;

    }

    .map-tooltip {
        position: absolute;
        top: 15px;
        left: 68%;
        width: 28.5%;
        background-color: var(--first-color);
        color: var(--text-color);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 999;

        opacity: .8;

        text-align: center;
    }

    .under-map {
        padding-top: .5em
    }

    .public-transport{
        display: flex;
        width: 95%;

        gap: 1em;
    }

    .datetime, .reward-delivery-location{
        display: flex;
        flex-direction: column;
        width: 95%;
        gap: 1em;
    }

    .time-container {
        display: flex;
        gap: 1em;
    }

    .confidence{
        display: flex;
        align-self: center;
        justify-self: center;
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
            min-height: 5em;
            font-size: large;
            font-weight: bold;

            border-radius: .1em;
        }
    }

</style>