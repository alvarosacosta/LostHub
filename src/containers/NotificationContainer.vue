<template>
    <main class="NotificationContainer">
        <NotificationComponent 
            :notification
            @delete-notification="deleteNotification"
            @delete-notification-and-item="deleteNotificationAndItem"
        ></NotificationComponent>
    </main>
</template>

<script setup lang="ts">
import NotificationComponent from '@/components/NotificationComponent.vue';
import { ItemFoundNotification } from '@/interfaces/notifications';
import { useItemsStore } from '@/stores/ItemStore';
import { useNotificationStore } from '@/stores/NotificationStore';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    defineProps<{
        notification: ItemFoundNotification  | null
    }>();

    const NotificationStore = useNotificationStore()
    const ItemStore = useItemsStore()
    async function deleteNotification(notificationID: string) : Promise<void> {
        try {

            await NotificationStore.deleteNotificationById(notificationID)
            
        } catch(err : any) {
            emit('showError', 'Ha habido un error al borrar la notificación.')
        }
    }

    async function deleteNotificationAndItem(itemID: string) : Promise<void> {
        try {

            await ItemStore.deleteItemById(itemID)
            
        } catch(err : any) {
            emit('showError', 'Ha habido un error al borrar la notificación y el objeto asociado.')
        }
    }

    
</script>