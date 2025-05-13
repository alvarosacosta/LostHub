<template>
    <main class="ItemsComponent">
        <article class="filter-container" v-show="showFilters" v-if="items && items.length > 0">
            <section class="all-content-lines">
                <section class="line first-line">
                    <v-text-field
                        v-model="name"
                        class="name field"
                        label="Nombre / Descripción corta"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-text-field>
        
                    <v-menu
                        v-model="locationMenu"
                        :close-on-content-click="false"
                        offset-y
                        >
    
                        <template #activator="{ props }">
                            <button
                                v-bind="props"
                                class="variable-options-button"
                                :class="{ 'filtered-button': anyFilterActiveFromLocation}"
                            >
                                Seleccionar ubicación
                            </button>
                        </template>
    
                        <v-card class="menu-card" color="var(--first-color)">
                            <v-text-field
                                v-model="location"
                                class="field"
                                label="Ubicación"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="compact"
                                clearable
                                hide-details
                            />
    
                            <section class="location-area-container">
                                <v-text-field
                                    v-model="locationRadio"
                                    class="field"
                                    prepend-icon="mdi-map-marker-radius"
                                    @click="showLocationDialog = true"
                                    @click:prepend="showLocationDialog = true"
                                    label="Ubicación en radio"
                                    variant="solo-filled"
                                    color="var(--first-color)"
                                    bg-color="var(--fourth-color)"
                                    density="compact"
                                    readonly
                                    clearable
                                    v-on:click:clear="onLocationClean"
                                    hide-details
                                />
    
                                <v-text-field
                                    class="field area-field"
                                    type="number"
                                    v-model=locationArea
                                    placeholder="Area (Km)"
                                    label="Area (Km)"
                                    color="var(--first-color)"
                                    bg-color="var(--fourth-color)"
                                    variant="solo-filled"
                                    hide-details
                                    density="compact"
                                />
    
                            </section>
                        </v-card>
                    </v-menu>
    
                    <v-dialog v-model="showLocationDialog" max-width="800" max-height="800" scroll-strategy="close" transition="fade-transition">
                        <template v-slot>
                            <article class="location-dialog-container">
                                <span class="map-tooltip">Haz click para marcar una ubicación</span>
                                <div id="map"></div>
    
                                <v-text-field
                                    v-model="locationRadio"
                                    class="field"
                                    label="Ubicación en radio"
                                    variant="solo-filled"
                                    color="var(--first-color)"
                                    bg-color="var(--fourth-color)"
                                    density="compact"
                                    readonly
                                    clearable
                                    v-on:click:clear="onLocationClean"
                                    hide-details
                                />
    
                                <section class="location-area-and-button">
    
                                    <v-text-field
                                        class="field"
                                        type="number"
                                        v-model=locationArea
                                        placeholder="Area (Km)"
                                        label="Area (Km)"
                                        color="var(--first-color)"
                                        bg-color="var(--fourth-color)"
                                        variant="solo-filled"
                                        hide-details
                                        density="compact"
                                    />
    
                                    <button
                                        v-bind="props"
                                        class="user-location-button"
                                        @click="locateUser()"
                                    >
                                        Compartir mi ubicación
                                    </button>
                                </section>
                            </article>
                        </template>
                    </v-dialog>
    
                    <v-menu
                        v-model="rewardMenu"
                        :close-on-content-click="false"
                        offset-y
                        >
    
                        <template #activator="{ props }">
                            <button
                                v-bind="props"
                                class="variable-options-button"
                                :class="{ 'filtered-button': anyFilterActiveFromReward}"
                            >
                                Seleccionar recompensa
                            </button>
                        </template>
    
                        <v-card class="menu-card" color="var(--first-color)">
                            <v-text-field
                                v-model="reward"
                                class="field"
                                type="number"
                                label="Recompensa"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="compact"
                                clearable
                                hide-details
                            >
                            </v-text-field>
    
                            <v-text-field
                                v-model="minReward"
                                class="field"
                                type="number"
                                label="Recompensa mínima"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="compact"
                                clearable
                                hide-details
                            >
                            </v-text-field>
    
                            <v-text-field
                                v-model="maxReward"
                                class="field"
                                type="number"
                                label="Recompensa máxima"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="compact"
                                hide-details
                                clearable
                            >
                            </v-text-field>
                        </v-card>
                    </v-menu>
    
                </section>
    
                <section class="line second-line">
                    <v-select
                        v-model="color"
                        :items="colorOptions"
                        class="color field"
                        label="Color"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-select>
        
                    <v-select
                        v-if="category !== 'Animal'"
                        v-model="brand"
                        :items="brandOptions"
                        class="brand field"
                        label="Marca"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-select>
    
                    <v-select
                        v-model="publicTransport"
                        :items="publicTransportOptions"
                        class="publicTransport field"
                        label="Transporte público"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-select>
    
                    <v-menu
                        v-model="dateTimeMenu"
                        :close-on-content-click="false"
                        offset-y
                        >
    
                        <template #activator="{ props }">
                            <button
                                v-bind="props"
                                class="variable-options-button"
                                :class="{ 'filtered-button': anyFilterActiveFromDateTime}"
                            >
                                Seleccionar fecha/hora
                            </button>
                        </template>
    
                        <v-card class="menu-card" color="var(--first-color)">
                            <v-text-field
                                v-model="displayDate"
                                class="field"
                                density="compact"
                                label="Fecha(s) de pérdida"
                                readonly
                                @click="menuDate = true"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                clearable
                                hide-details
                            >
                                <v-menu
                                    v-model="menuDate"
                                    activator="parent"
                                    transition="scale-transition"
                                    :close-on-content-click="false"
                                >
                                    <v-date-picker
                                        v-model="date"
                                        :max="maxDateToPick"
                                        @update:model-value="parseCustomDate"
                                        hide-header
                                        hide-actions
                                        show-adjacent-months
                                        variant="solo-filled"
                                        multiple
                                        bg-color="var(--fourth-color)"
                                    />
                                </v-menu>
                            </v-text-field>
    
                            <v-text-field
                                v-model="displayMaxDate"
                                class="field"
                                density="compact"
                                label="Fecha máxima"
                                readonly
                                @click="menuMaxDate = true"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                hide-details
                                clearable
                            >
                                <v-menu
                                    v-model="menuMaxDate"
                                    activator="parent"
                                    transition="scale-transition"
                                    :close-on-content-click="false"
                                >
                                    <v-date-picker
                                        v-model="maxDate"
                                        :max="maxDateToPick"
                                        @update:model-value="parseCustomDate"
                                        hide-header
                                        hide-actions
                                        show-adjacent-months
                                        variant="solo-filled"
                                        bg-color="var(--fourth-color)"
                                    />
                                </v-menu>
                            </v-text-field>
                
                            <v-text-field
                                v-model="time"
                                type="time"
                                class="time field"
                                label="Hora"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="compact"
                                hide-details
                                clearable
                            >
                            </v-text-field>
                        </v-card>
                    </v-menu>
    
                </section>
    
                <section class="line third-line">
                    <v-select
                        v-model="category"
                        :items="categoryOptions"
                        @update:model-value="onCategoryChange"
                        class="category field"
                        label="Categoría"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-select>
    
                    <v-select
                        v-if="category"
                        v-model="subcategory"
                        :items="filteredSubcategories"
                        class="subcategory field"
                        label="Subcategoría"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-select>
    
                    <v-select
                        v-if="category == 'Animal'"
                        v-model="gender"
                        :items="genderOptions"
                        class="gender field"
                        label="Sexo"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-select>
    
                    <v-text-field
                        v-if="category == 'Animal' && subcategory"
                        v-model="race"
                        class="race field"
                        label="Raza"
                        variant="solo-filled"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        density="compact"
                        clearable
                        hide-details
                    >
                    </v-text-field>
    
                </section>

                <article class="filter-icon-container icon-container-small" v-if="showFilters" @click="showFilters = !showFilters">
                    <v-icon class="filter-icon" size="20">mdi-magnify</v-icon>
                </article>

            </section>
        </article>
        
        <article class="filter-icon-container" v-if="!showFilters" @click="showFilters = !showFilters">
            <v-icon class="filter-icon" size="30">mdi-magnify</v-icon>

            <section class="filter-label-container" v-if="anyFilterActive">
                <span class="filter-label">FILTRADO</span>
            </section>
        </article>

        <article class="items" :class="{ 'items-with-filter': showFilters}" v-if="filteredItems && filteredItems.length > 0">
            <section class="item" v-for="(item, index) in filteredItems" :key="index">
                <ItemCardContainer
                    :item
                />
            </section>
        </article>

        <article v-else class="no-items">
            <p class="no-items-label">No hay objetos que mostrar</p>
        </article>
    </main>
</template>

<script setup lang="ts">
import ItemCardContainer from '@/containers/ItemCardContainer.vue';
import { Category, Subcategory, Gender, Color, Brand, PublicTransports, categoryToSubcategories } from '@/enums/item_enums';
import { MixedItem } from '@/interfaces/items';
import { useLeafletStore } from '@/stores/LeafletStore';
import { isInRadius } from '@/utils/mathUtils';
import { storeToRefs } from 'pinia';
import { computed, nextTick, onMounted, Ref, ref, watch } from 'vue';

    const emit = defineEmits<{
        (e: 'showError', error: string): void;
    }>()

    const props = defineProps<{
        items: MixedItem[]  | undefined
    }>();

    const name: Ref<string> = ref('');
    const location: Ref<string> = ref('');
    const publicTransport: Ref<PublicTransports | undefined> = ref(undefined);
    const brand: Ref<Brand | undefined> = ref(undefined);
    const color: Ref<Color | undefined> = ref(undefined);
    const gender: Ref<Gender | undefined> = ref(undefined);
    const reward: Ref<string | undefined> = ref(undefined);
    const minReward: Ref<string | undefined> = ref(undefined);
    const maxReward: Ref<string | undefined> = ref(undefined);
    const category: Ref<Category | undefined> = ref(undefined);
    const subcategory: Ref<Subcategory | undefined> = ref(undefined);
    const race: Ref<string> = ref('');
    const time: Ref<string> = ref('');
    const displayDate : Ref<string> = ref('')
    const displayMaxDate : Ref<string> = ref('')

    const date = ref([])
    const maxDate = ref([])
    const maxDateToPick = new Date();
    const menuMaxDate : Ref<boolean> = ref(false)
    const menuDate : Ref<boolean> = ref(false)
    const formatDate = (d: Date) => new Date(d).toLocaleDateString('es-ES')
    function parseCustomDate(val: (Date)[]) {
        if(val instanceof Date){
            displayDate.value = formatDate(val);

        } else {
            displayDate.value = val.map(formatDate).join(' ')
        }
    }

    function parseNormalDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day);
    }

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
        brand.value = undefined
        gender.value = undefined
    }

    const locationMenu : Ref<boolean> = ref(false)
    const rewardMenu : Ref<boolean> = ref(false)
    const dateTimeMenu : Ref<boolean> = ref(false)

    const showFilters : Ref<boolean> = ref(false)
    const showLocationDialog : Ref<boolean> = ref(false)

    const LeafletStore = useLeafletStore()
    const {location : locationRadio, latLng, defaultLatLng} = storeToRefs(LeafletStore)
    const locationArea : Ref<number> = ref(5)

    onMounted(() => {
        LeafletStore.cleanVariables();
    });

    function onLocationClean() {
        LeafletStore.cleanVariables();
        LeafletStore.initInteractuableMapEO('map');
    }

    watch(showLocationDialog, async (newStep) => {
        if (newStep) {
            await nextTick();
            LeafletStore.initInteractuableMapEO('map');
        }
    });

    async function locateUser(): Promise<void> {
        try {
            await LeafletStore.locateUser();

        } catch (err : any) {
            emit('showError', 'No se puede obtener tu ubicación. Por favor, habilita la geolocalización en tu navegador.');
        }
    }

    const filteredItems = computed(() => {
        return props.items?.filter((item: MixedItem) => {
            return (
                (!name.value || item.name.toLowerCase().includes(name.value.toLowerCase())) &&
                (!location.value || item.location.toLowerCase().includes(location.value.toLowerCase())) &&
                (!color.value || item.color === color.value) &&
                (!brand.value || item.brand === brand.value) &&
                (!displayMaxDate.value || itemHasDateBeforeOrEqual(displayMaxDate.value, item.date)) &&
                (!displayDate.value || displayDate.value.toLowerCase().includes(item.date.toLowerCase())) &&
                (!time.value || time.value && (isTimeInRange(time.value, item.time)) || !item.time) &&
                (!publicTransport.value || item.publicTransport === publicTransport.value) &&
                (!category.value || item.category === category.value) &&
                (!subcategory.value || item.subcategory === subcategory.value) &&
                (!gender.value || item.gender === gender.value) &&
                (!race.value || item.race && item.race.toLowerCase().includes(race.value.toLowerCase())) &&
                (!minReward.value || (item.type === 'Perdido' && parseFloat(item.reward) >= parseFloat(minReward.value))) &&
                (!maxReward.value || (item.type === 'Perdido' && parseFloat(item.reward) <= parseFloat(maxReward.value))) &&
                (!reward.value || (item.type === 'Perdido' && item.reward.toLowerCase().includes(reward.value.toLowerCase()))) &&
                (latLng.value[0] === defaultLatLng.value[0] && latLng.value[1] === defaultLatLng.value[1] || 
                isInRadius(latLng.value[0], latLng.value[1], item.latLong[0], item.latLong[1],  locationArea.value))
            );
        }) || [];
    });

    const anyFilterActive = computed(() => {
        return (
            anyFilterActiveFromLocation.value ||
            anyFilterActiveFromReward.value ||
            anyFilterActiveFromDateTime .value||
            name.value ||
            publicTransport.value ||
            brand.value ||
            color.value ||
            gender.value ||
            category.value ||
            subcategory.value ||
            race.value
        );
    });

    const anyFilterActiveFromLocation = computed(() => {
        return (
            location.value ||
            locationRadio.value
        );
    });

    const anyFilterActiveFromReward = computed(() => {
        return (
            reward.value ||
            minReward.value ||
            maxReward.value
        );
    });

    const anyFilterActiveFromDateTime = computed(() => {
        return (
            displayDate.value ||
            displayMaxDate.value ||
            time.value
        );
    });
    
    function isTimeInRange(time: string, timeRange: string): boolean {
        if(!timeRange){
            return false
        }

        const [startTime, endTime] = timeRange.split(' - ');

        const timeTotalMinutes = parseTimeToMinutes(time);
        const startTotalMinutes = parseTimeToMinutes(startTime);
        const endTotalMinutes = parseTimeToMinutes(endTime);

        return timeTotalMinutes >= startTotalMinutes && timeTotalMinutes <= endTotalMinutes;
    }

    function itemHasDateBeforeOrEqual(display: string, itemDateStr: string): boolean {
        const displayDateParsed = parseNormalDate(display);
        const itemDates = itemDateStr.split(' ');

        return itemDates.some(dateStr => {
            const parsed = parseNormalDate(dateStr);
            return parsed <= displayDateParsed;
        });
    }

    function parseTimeToMinutes(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

</script>

<style scoped lang="css">
    #map {
        min-height: 250px;
        width: 100%;

        border-radius: .8em;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, .9);
        border: 2px solid var(--fourth-color);
    }

    .map-tooltip {
        position: absolute;
        top: 10px;
        left: 62%;
        width: 35%;
        background-color: var(--second-color);
        color: var(--text-color);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 999;

        opacity: .9;

        text-align: center;
    }

    .ItemsComponent{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        position: relative;
    }

    .filter-container{
        margin: 1em 0em 2em 0em;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        border: 2px solid var(--fourth-color);
        border-radius: 1em;
        background-color: var(--second-color);

        gap: 1em;
        width: 82%;

        padding: 12px;

        position: fixed;
        top: 0;
        z-index: 10;

    }

    .all-content-lines{
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;

        position: relative; /* o auto/scroll, si hace scroll interno */
    }

    .line{
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        gap: 1em;
    }

    .field{
        width: 100%;
        color: var(--fourth-color);
    }

    .area-field{
        width: 33%;
    }

    .filter-icon-container{
        background-color: var(--first-accent-color);
        padding: 15px;

        border-radius: 1em;
        border: 2px solid var(--fourth-color);

        position: fixed;
        top: 7px;
        right: 20px;

        z-index: 10;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 1);

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
    }

    .icon-container-small{
        height: 35px;
        width: 35px;
        padding: 0px;

        position: absolute;
        top: -20px;
        right: -25px;

        overflow-y:visible;

    }

    .filter-icon-container:hover{
        background-color: var(--second-accent-color);
    }

    .filter-icon{
        color: var(--fourth-color);
        filter: drop-shadow(1px 1px 2.5px rgba(0, 0, 0, 1));
    }

    .filter-label{
        color: var(--text-color);
        font-weight: bold;
    }

    .items {
        display: grid;
        grid-template-columns: 750px 750px;
        gap: 2em;

        margin: 2em 0 2em 0;
    }

    .items-with-filter{
        margin: 14em 0 2em 0;
    }

    .item {
        text-decoration: none;
        color: inherit;

        display: flex;
        justify-content: center;
        align-self: center;
        height: fit-content;
        width: fit-content;
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

    .menu-card{
        display: flex;
        flex-direction: column;
        gap: 1em;

        min-width: 500px;
        height: 150px !important;

        padding: 1em;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
    }

    .variable-options-button, .user-location-button{
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: var(--text-color);

        padding: 8px 10px 8px 10px;
        cursor: pointer;
        text-align: center;

        max-width: 250px;
        width: 100%;
        border-radius: 5px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 1);

        align-self: flex-start;

    }

    .variable-options-button:hover, .user-location-button:hover{
        background-color: var(--second-accent-color);
    }

    .filtered-button{
        background-color: var(--second-accent-color);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
    }

    .location-area-container{
        display: flex;
        gap: 1em;
        width: 100%;
    }

    .location-dialog-container{
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 100%;
        gap: 1em;

        padding: 1em;
        border-radius: 1em;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        background-color: var(--first-color);
        border: 2px solid var(--fourth-color);
    }

    .location-area-and-button{
        display: flex;
        gap: 1em;
        width: 100%;
    }

    @media (max-width: 1835px) {
        .items {
            grid-template-columns: auto;
        }

        .filter-container{
            width: 70%;
        }
    }

    @media (max-width: 1300px) {
        .items {
            grid-template-columns: 320px 320px;
        }

    }

    @media (max-width: 1220px) {
        .filter-container{
            width: 86%;
        }

    }

    @media (max-width: 870px) {
        .items-with-filter{
            margin: 2em 0 5em 0;
        }

        .filter-container{
            display: block;
            width: 18em;
            max-height: 26em;
            right: 13px;
            overflow-y: auto;
        }

        .line{
            flex-direction: column;
            width: 100%;
            gap: 1em;
        }

        .variable-options-button{
            max-width: none;
        }

        .field{
            width: 100%;
        }

        .menu-card{
            min-width: 300px;
        }

        .icon-container-small{
            top: -15px;
            right: -15px;

            overflow-y:visible;

        }
    }

    @media (max-width: 730px) {
        .items {
            grid-template-columns: auto;
        }

    }

    @media (max-width: 429px) {
        .no-items-label{
            font-size: 1em;
        }

    }

</style>