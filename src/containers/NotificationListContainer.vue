<template>
    <main class="NotificationListContainer">
        <NotificationListComponent :notifications="userNotifications" ></NotificationListComponent>
    </main>
</template>

<script setup lang="ts">
import NotificationListComponent from '@/components/NotificationListComponent.vue';
import { useNotificationStore } from '@/stores/NotificationStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';


const notificationStore = useNotificationStore();
const { userNotifications } = storeToRefs(notificationStore);

onMounted(() => {
    notificationStore.fetchUserNotifications();
    notificationStore.listenToRealtime();
});

</script>