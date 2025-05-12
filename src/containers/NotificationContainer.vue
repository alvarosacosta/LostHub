<template>
    <main class="NotificationContainer">
        <NotificationComponent :notification></NotificationComponent>
    </main>
</template>

<script setup lang="ts">
import NotificationComponent from '@/components/NotificationComponent.vue';
import { ItemFoundNotification } from '@/interfaces/notifications';

    defineProps<{
        notification: ItemFoundNotification  | null
    }>();
    
</script>