<template>
    <main class="NotifyFindingContainer">
        <NotifyFindingComponent 
            @success="uploadNotification"
            @failure="showError"
            :itemID
            :sender="userProfile"
            :receiver="foreignUserProfile"
        ></NotifyFindingComponent>
    </main>


</template>
  
<script setup lang="ts">
import NotifyFindingComponent from '@/components/NotifyFindingComponent.vue';
import { ItemFoundNotification } from '@/interfaces/notifications';
import { useAuthStore } from '@/stores/AuthStore';
import { useItemsStore } from '@/stores/ItemStore';
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

    const { foreignUserProfile, userProfile } = storeToRefs(AuthStore);  
    const { fetchedUserID } = storeToRefs(ItemsStore);

    onMounted(async () => {
        await ItemsStore.fetchUserIdByItemId(props.itemID);
        await AuthStore.fetchUserById(fetchedUserID.value);

    });

    async function uploadNotification(notification : ItemFoundNotification) : Promise<void> {
        console.log('YEKAAAAAA', notification)
    }

    function showError(error : string) : void {
        emit('showError', error)
    }

</script>