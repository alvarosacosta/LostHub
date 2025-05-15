<template>
    <main class="NotificationListComponent">
        <article class="items" v-if="notifications && notifications.length > 0">
            <section class="item" v-for="( notification, index ) in notifications" :key="index">
                <NotificationContainer :notification></NotificationContainer>
            </section>
        </article>

        <article v-else class="no-items">
            <p class="no-items-label">No hay notificaciones que mostrar</p>
        </article>
    </main>
</template>

<script setup lang="ts">
import NotificationContainer from '@/containers/NotificationContainer.vue';
import { ItemFoundNotification } from '@/interfaces/notifications';

    defineProps<{
        notifications: ItemFoundNotification[]  | undefined
    }>();
    
</script>

<style scoped lang="css">
    .NotificationListComponent{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        position: relative;

        opacity: 0;
        animation: aparecer 1s forwards;

        margin-left: 2em;
        margin-right: 2em;

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
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);

        max-width: 1500px;
        width: 100%;
        padding: 1.5em;

        margin-top: 1.5em;
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