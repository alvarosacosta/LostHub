<template>
    <main class="ItemsComponent">
        <article class="filter-container" v-if="items && items.length > 0 && showFilters">
            <section class="line first-line">
                <v-text-field
                    v-model="name"
                    class="name field"
                    label="Nombre / Descripción corta"
                    variant="solo-filled"
                    prepend-icon="mdi-magnify"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                    @click:prepend="showFilters = false"
                >
                </v-text-field>
    
                <v-text-field
                    v-model="location"
                    class="location field"
                    label="Ubicación"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-text-field>

                <v-select
                    v-model="color"
                    class="color field"
                    label="Color"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-select>
    
                <v-select
                    v-model="brand"
                    class="brand field"
                    label="Marca"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-select>

            </section>

            <section class="line second-line">
                <v-text-field
                    v-model="reward"
                    class="reward field"
                    label="Recompensa"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-text-field>
    
                <v-text-field
                    v-model="date"
                    class="date field"
                    label="Fecha de pérdida"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-text-field>
    
                <v-text-field
                    v-model="time"
                    class="time field"
                    label="Hora de pérdida"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-text-field>

                <v-select
                    v-model="publicTransport"
                    class="publicTransport field"
                    label="Transporte público"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-select>

            </section>

            <section class="line third-line">
                <v-select
                    v-model="category"
                    class="category field"
                    label="Categoría"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-select>

                <v-select
                    v-if="category"
                    v-model="subcategory"
                    class="subcategory field"
                    label="Subcategoría"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
                >
                </v-select>

                <v-select
                    v-if="category == 'Animal'"
                    v-model="gender"
                    class="gender field"
                    label="Sexo"
                    variant="solo-filled"
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    density="compact"
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
                >
                </v-text-field>

            </section>
            
        </article>
        <article class="filter-icon-container" v-else @click="showFilters = true">
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
import { Category, Subcategory, Gender, Color, Brand } from '@/enums/item_enums';
import { MixedItem } from '@/interfaces/items';
import { computed, Ref, ref } from 'vue';

    const props = defineProps<{
        items: MixedItem[]  | undefined
    }>();

    const name: Ref<string> = ref('');
    const location: Ref<string> = ref('');
    const publicTransport: Ref<string | undefined> = ref(undefined);
    const brand: Ref<Brand | undefined> = ref(undefined);
    const color: Ref<Color | undefined> = ref(undefined);
    const gender: Ref<Gender | undefined> = ref(undefined);
    const reward: Ref<string | undefined> = ref(undefined);
    const category: Ref<Category | undefined> = ref(undefined);
    const subcategory: Ref<Subcategory | undefined> = ref(undefined);
    const race: Ref<string | undefined> = ref(undefined);
    const date: Ref<string> = ref('');
    const time: Ref<string> = ref('');

    const showFilters : Ref<boolean> = ref(false)

    const filteredItems = computed(() => {
        if (!props.items) return [];

        return props.items
    });

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

        padding: 18px 24px 0 24px;

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

    .publicTransport{
        width: 33.2%;
    }

    .filter-icon-container{
        background-color: var(--first-accent-color);
        padding: 15px;

        border-radius: 1em;
        border: 2px solid var(--fourth-color);

        position: fixed;
        top: -20px;
        right: 20px;

        margin: 2em 0 2em 0;

        z-index: 10;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 1);
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
        margin: 15em 0 5em 0;
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

    }

    @media (max-width: 1300px) {
        .items {
            grid-template-columns: 320px 320px;
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