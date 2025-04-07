<template>
    <main class="LostObjectsComponent">
        <article class="objects" v-if="objects.length > 0">
            <router-link class="object-card" v-for="(object, index) in objects" :key="index" to="object.card">
                <div>
                    <div>
                        <h1>{{ object.name }}</h1>
                        <p>{{ object.description }}</p>
                        <p>{{ object.date }}</p>
                    </div>
                </div>
            </router-link>
        </article>
        <p v-else class="no-events-label">No events available.</p>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import logo from '@/assets/logo.png';

const objects = ref([
{ name: 'Perro', date: '2025-06-10', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
{ name: 'Cartera', date: '2025-01-22', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
{ name: 'Yoyó', date: '2025-10-29', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
{ name: 'Lápiz', date: '2025-07-15', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
{ name: 'Carpeta', date: '2025-04-07', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
{ name: 'Tupper', date: '2025-12-12', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
{ name: 'Cuadro', date: '2025-08-04', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
]);

</script>

<style scoped lang="css">
    .objects {
        display: flex;
        flex-direction: column;
        gap: 5em;

        margin: 5em;
    }

    .object-card {
        text-decoration: none;
        background-color: var(--first-color);
        color: var(--text-color);

        padding: 1em;
        border-radius: .5em;

        opacity: 0;
        animation: aparecer 1s forwards;
    }
</style>