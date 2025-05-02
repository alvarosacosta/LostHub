<template>
    <main class="ItemsComponent">
        <article class="filter-container" v-if="items && items.length > 0 && showFilters">
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
                >
                </v-text-field>
    
                <v-text-field
                    v-model="location"
                    prepend-icon="mdi-map-search-outline"
                    class="location field"
                    label="Ubicación"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                    clearable
                >
                </v-text-field>

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
                >
                </v-select>
    
                <v-select
                    v-model="brand"
                    :items="brandOptions"
                    class="brand field"
                    label="Marca"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                    clearable
                >
                </v-select>

            </section>

            <section class="line second-line">
                <v-text-field
                    v-model="reward"
                    class="reward field"
                    type="number"
                    label="Recompensa mínima"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                    clearable
                >
                </v-text-field>
    
                <v-text-field
                    v-model="displayDate"
                    class="date field"
                    density="compact"
                    label="Fecha de pérdida"
                    readonly
                    @click="menu = true"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    prepend-icon="mdi-calendar"
                    clearable
                >
                    <v-menu
                        v-model="menu"
                        activator="parent"
                        transition="scale-transition"
                        :close-on-content-click="false"
                    >
                        <v-date-picker
                            v-model="date"
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
    
                <v-text-field
                    v-model="time"
                    type="time"
                    class="time field"
                    label="Hora de pérdida"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                    clearable
                >
                </v-text-field>

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
                >
                </v-select>

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
                >
                </v-text-field>

            </section>
            <article class="filter-icon-container icon-container-small" v-if="showFilters" @click="showFilters = !showFilters">
                <v-icon class="filter-icon" size="20">mdi-magnify</v-icon>
            </article>
        </article>

        <article class="filter-icon-container" v-if="!showFilters" @click="showFilters = !showFilters">
            <v-icon class="filter-icon" size="30">mdi-magnify</v-icon>
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
import { computed, Ref, ref } from 'vue';

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
    const category: Ref<Category | undefined> = ref(undefined);
    const subcategory: Ref<Subcategory | undefined> = ref(undefined);
    const race: Ref<string> = ref('');
    const time: Ref<string> = ref('');

    const date = ref([])
    const displayDate : Ref<string> = ref('')
    const maxDate = new Date();
    const menu : Ref<boolean> = ref(false)
    const formatDate = (d: Date) => new Date(d).toLocaleDateString('es-ES')
    function updateDisplay(val: (Date)[]) {
        if(val instanceof Date){
            displayDate.value = formatDate(val);

        } else {
            displayDate.value = val.map(formatDate).join(' ')
        }
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
        gender.value = undefined
    }

    const showFilters : Ref<boolean> = ref(false)

    const filteredItems = computed(() => {
        return props.items?.filter((item: MixedItem) => {
            return (
                (!name.value || item.name.toLowerCase().includes(name.value.toLowerCase())) &&
                (!location.value || item.location.toLowerCase().includes(location.value.toLowerCase())) &&
                (!color.value || item.color === color.value) &&
                (!brand.value || item.brand === brand.value) &&
                (!displayDate.value || item.date.includes(displayDate.value)) &&
                (!time.value || time.value && isTimeInRange(time.value, item.time)) &&
                (!publicTransport.value || item.publicTransport === publicTransport.value) &&
                (!category.value || item.category === category.value) &&
                (!subcategory.value || item.subcategory === subcategory.value) &&
                (!gender.value || item.gender === gender.value) &&
                (!race.value || item.race && item.race.toLowerCase().includes(race.value.toLowerCase())) &&
                (!reward.value || (item.type === 'Perdido' && parseFloat(item.reward) >= parseFloat(reward.value)))
            );
        }) || [];
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

    function parseTimeToMinutes(time: string): number {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

</script>

<style scoped lang="css">
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
        background-color: var(--first-accent-color);

        width: 82%;

        padding: 12px 12px 0 12px;

        position: fixed;
        top: 0;
        z-index: 10;

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
        height: 3.1em;

        font-size: 18px;
    }

    .name{
        width: 37%;
    }

    .color, .brand {
        width: 20%;
    }

    .reward{
        width: 29.3%;
    }

    .date, .time{
        width: 39%;
    }

    .time{
        position: relative;
        bottom: 1px;
    }

    .publicTransport{
        width: 33.2%;
    }

    .filter-icon-container{
        background-color: var(--first-accent-color);
        padding: 15px;

        border-radius: 1em;
        border: 2px solid var(--fourth-color);

        position: fixed;
        top: 10px;
        right: 20px;

        z-index: 10;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 1);

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-container-small{
        height: 35px;
        width: 35px;
        padding: 0px;

        position: absolute;
        top: -10px;
        right: -10px;

    }

    .filter-icon-container:hover{
        background-color: var(--second-accent-color);
    }

    .filter-icon{
        color: var(--fourth-color);
        filter: drop-shadow(1px 1px 2.5px rgba(0, 0, 0, 1));
    }

    .items {
        display: grid;
        grid-template-columns: 750px 750px;
        gap: 2em;

        margin: 5em 0 5em 0;
    }

    .items-with-filter{
        margin: 14em 0 5em 0;
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

    @media (max-width: 1835px) {
        .items {
            grid-template-columns: auto;
        }

        .filter-container{
            width: 70%;
        }

        .name, .location{
            width: 25%;
        }

        .brand, .color{
            width: 20%;
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