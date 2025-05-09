<template>
    <main class="NotificationListComponent">
        <article class="items">
            <section class="item" v-for="( yeka, index ) in yekanotifications" :key="index">
                <NotificationContainer :notification="yeka"></NotificationContainer>
            </section>
        </article>

        <!-- <article class="no-items">
            <p class="no-items-label">No hay notificaciones que mostrar</p>
        </article> -->
    </main>
</template>

<script setup lang="ts">
import NotificationContainer from '@/containers/NotificationContainer.vue';
import { MixedItem } from '@/interfaces/items';
import { ItemFoundNotification } from '@/interfaces/notifications';

    defineProps<{
        notifications?: MixedItem[]  | undefined
    }>();

    const yekanotifications: ItemFoundNotification[] = [
        {
            id: "notif_001",
            itemID: "item_1001",
            itemName: "Llaves rojas",
            senderID: "user_101",
            anonID: "anon_x1a2b3",
            receiverID: "user_201",
            findingDate: "2025-05-07",
            findingTime: "10:15",
            message: "Encontré tus llaves en el estacionamiento del centro comercial.",
            finding_location: "Centro Comercial Zona 10",
            deliveryLocation: "Recepción del centro comercial",
            sender_email: "juan.perez@example.com",
            sender_phone: "+50255551234",
            url_images: ["https://example.com/keys.jpg"],
            latLong: [14.6101, -90.5165]
        },
        {
            id: "notif_002",
            itemID: "item_1002",
            itemName: "Billetera del Raymon",
            senderID: "user_102",
            anonID: "anon_c4d5e6",
            receiverID: "user_202",
            findingDate: "2025-05-06",
            findingTime: "08:45",
            message: "Vi tu billetera tirada cerca de la entrada de la universidad.",
            finding_location: "Universidad San Carlos, entrada principal",
            deliveryLocation: "Secretaría administrativa",
            sender_email: "maria.gomez@example.com",
            sender_phone: "+50255552345",
            url_images: ["https://example.com/wallet.jpg"],
            latLong: [14.6038, -90.4891]
        },
        {
            id: "notif_003",
            itemID: "item_1003",
            itemName: "Teléfono",
            senderID: "user_103",
            anonID: "anon_z7y8x9",
            receiverID: "user_203",
            findingDate: "2025-05-05",
            findingTime: "19:20",
            message: "Recogí tu teléfono que dejaste en el bus ruta 203.",
            finding_location: "Parada final del bus 203",
            deliveryLocation: "Oficina de seguridad del terminal",
            sender_email: "carlos.mendez@example.com",
            sender_phone: "+50255553456",
            url_images: ["https://example.com/phone.jpg"],
            latLong: [14.5994, -90.5152]
        }
        ];
    
</script>

<style scoped lang="css">
    .NotificationListComponent{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        position: relative;

        margin: 2em;

    }

    .items {
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-self: center;
        gap: 1em;

        background-color: var(--third-color);
        border-radius: .7em;
        border: 2px solid var(--first-color);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        min-height: 93vh;
        max-width: 1500px;
        width: 100%;
        padding: 1.5em;
    }

    .item {
        text-decoration: none;
        color: inherit;

        width: 100%;
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