<template>
    <main class="NotifyFindingContainer">
        <NotifyFindingComponent 
            @success="uploadNotification"
            @failure="showError"
            :item="singleItem"
            :sender="userProfile"
            :receiver="foreignUserProfile"
        ></NotifyFindingComponent>
    </main>


</template>
  
<script setup lang="ts">
import NotifyFindingComponent from '@/components/NotifyFindingComponent.vue';
import { ItemFoundNotification, NotificationImages } from '@/interfaces/notifications';
import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';
import { useItemsStore } from '@/stores/ItemStore';
import { useNotificationStore } from '@/stores/NotificationStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    const props = defineProps<{
        itemID: string
    }>()

    const ItemsStore = useItemsStore()
    const AuthStore = useAuthStore()
    const NotificationStore = useNotificationStore()

    const { foreignUserProfile, userProfile } = storeToRefs(AuthStore);  
    const { fetchedUserID, singleItem } = storeToRefs(ItemsStore);

    onMounted(async () => {
        await ItemsStore.fetchUserIdByItemId(props.itemID);
        await ItemsStore.fetchItemById(props.itemID);
        await AuthStore.fetchUserById(fetchedUserID.value);

    });

    async function uploadNotification(notification : ItemFoundNotification, images: NotificationImages) : Promise<void> {
        try {
            await NotificationStore.uploadNotification(notification, images)

            router.push('/hub')
            emit('showSuccess', 'Se ha enviado una notificación al usuario involucrado. ¡Muchas gracias!')

        } catch(err : any){
            emit('showError', 'No se ha podido enviar la notificación.')
        }
    }

    function showError(error : string) : void {
        emit('showError', error)
    }

</script>