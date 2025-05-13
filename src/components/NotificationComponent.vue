<template>
  <main class="NotificationComponent">
    <article class="notification-content">
        <p class="title"><v-icon>mdi-bullhorn-outline</v-icon> ¡Se ha encontrado uno de tus objetos!</p>
        <p><strong>Parece que alguien ha encontrado tu</strong> {{ notification?.itemName }}</p>
        <p v-if="notification?.message" ><strong>Mensaje:</strong> {{ notification?.message }}</p>
        <p>
            <strong>Lugar donde se encontró:</strong> 
            {{ notification?.finding_location }}
            <v-icon @click="showMap = true" class="map-icon">mdi-map-search-outline</v-icon>
        </p>

        <section class="button-section">
            <button class="notification-button" @click="showAllInfo = true">Ver detalles</button>
            <button class="notification-button" @click="showNotMineInfo = true">Este objeto no es mio</button>
            <button class="notification-button" @click="showFoundInfo = true">He recuperado este objeto</button>
            <router-link class="notification-button last" :to="{ name: 'item-details', params: { id: notification?.itemID }}">Objeto asociado</router-link>
        </section>
    </article>

    <v-dialog v-model="showMap" scroll-strategy="close">
        <template v-slot>
            <div id="map"></div>
        </template>
    </v-dialog>

    <v-dialog v-model="showAllInfo" max-width="700" max-height="600" scroll-strategy="close">
        <template v-slot>
            <section class="info-dialog">
                <p class="info-text"><strong>Nombre / Descripción corta: </strong> {{ notification?.itemName }}</p>
                <p class="info-text" v-if="notification?.message"><strong>Mensaje:</strong> {{ notification?.message }}</p>
                <p class="info-text"><strong>Fecha:</strong> {{ notification?.findingDate }}</p>
                <p class="info-text" v-if="notification?.findingTime"><strong>Hora:</strong> {{ notification?.findingTime }}</p>
                <p class="info-text"><strong>Lugar donde se encontró:</strong> {{ notification?.finding_location }}</p>
                <p class="info-text" v-if="notification?.deliveryLocation"><strong>Lugar donde se ha entregado:</strong> {{ notification?.deliveryLocation }}</p>
                <p class="info-text"><strong>Correo del remitente:</strong> {{ notification?.sender_email }}</p>
                <p class="info-text" v-if="notification?.sender_phone"><strong>Teléfono del remitente:</strong> {{ notification.sender_phone }}</p>
            </section>
        </template>
    </v-dialog>

    <v-dialog v-model="showNotMineInfo" max-width="700" max-height="600" scroll-strategy="close">
        <template v-slot>
            <section class="info-dialog">
                <p><strong>¿Estás seguro?</strong> Esta acción <strong>NO</strong> se puede deshacer</p>
                <br>
                <p class="info-text-justified">Haga click en 'Si, borrar esta notificación' si ya has contactado con el 
                usuario que ha encontrado tu objeto y estás seguro de que no es realmente tuyo.</p>
                <br>
                <section class="button-section">
                    <button class="notification-button" @click="deleteNotification">Si, borrar esta notificación</button>
                    <button class="notification-button" @click="showNotMineInfo = false">No, mantener esta notificación</button>
                </section>
            </section>
        </template>
    </v-dialog>

    <v-dialog v-model="showFoundInfo" max-width="700" max-height="600" scroll-strategy="close">
        <template v-slot>
            <section class="info-dialog">
                <p><strong>¿Estás seguro?</strong> Esta acción <strong>NO</strong> se puede deshacer</p>
                <br>
                <p class="info-text-justified">Haga click en 'Si, he recuperado mi objeto' si ya has contactado con el 
                usuario que ha encontrado su objeto y ya lo has recuperado.</p>
                <br>
                <p class="info-text-justified">También se borrará el objeto asociado automáticamente de la base de datos.</p>
                <br>
                <section class="button-section">
                    <button class="notification-button" @click="deleteNotificationAndItem">Si, he recuperado mi objeto</button>
                    <button class="notification-button" @click="showFoundInfo = false">No, mantener esta notificación</button>
                </section>
            </section>
        </template>
    </v-dialog>
  </main>
</template>

<script setup lang="ts">
import { ItemFoundNotification } from '@/interfaces/notifications';
import { useLeafletStore } from '@/stores/LeafletStore';
import { nextTick, Ref, ref, watch } from 'vue';

    const emit = defineEmits<{
        (e: 'deleteNotification', notificationID: string): void
        (e: 'deleteNotificationAndItem', itemID: string): void
    }>()

    const props = defineProps<{
        notification: ItemFoundNotification  | null
    }>();

    const showAllInfo : Ref<boolean> = ref(false);
    const showNotMineInfo : Ref<boolean> = ref(false);
    const showFoundInfo : Ref<boolean> = ref(false);
    const showMap : Ref<boolean> = ref(false);

    const LeafletStore = useLeafletStore()
    watch(showMap, async (newStep) => {
        if (newStep) {
            await nextTick();
            LeafletStore.initMapWithFixedLatLng('map', props.notification?.latLong as number[])
        }
    });

    function deleteNotification() : void {
        if (props.notification?.id && props.notification?.itemID){
            emit('deleteNotification', props.notification?.id);
            showNotMineInfo.value = false
        }
    }

    function deleteNotificationAndItem() : void {
        if (props.notification?.id && props.notification?.itemID){
            emit('deleteNotificationAndItem', props.notification?.itemID);
            showFoundInfo.value = false
        }
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

    .NotificationComponent {
        background-color: var(--fourth-color); 
        border-left: 4px solid var(--second-accent-color);
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        color: var(--first-color); 
        animation: fadeIn 0.3s ease-in-out;

        width: 100%;
        height: fit-content;
        font-family: var(--font-inter);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
    }

    .notification-content {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .title {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: var(--first-accent-color); 
        font-family: var(--font-poppins);
    }

    .map-icon{
        margin-left: 10px;
    }

    .button-section {
        padding: 1em 0 .5em 0;

        display: flex;
        gap: 1em;
    }

    .notification-button{
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: var(--text-color);

        padding: 10px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

    }

    .last{
        margin-left: auto
    }

    .notification-button:hover{
        background-color: var(--second-accent-color);

    }

    .info-text, .info-text-justified{
        align-self: flex-start;
    }

    .info-text-justified{
        text-align: justify;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 700px) {
        .button-section {
            flex-direction: column;
        }

        .last{
            margin-left: 0
        }
    }
</style>