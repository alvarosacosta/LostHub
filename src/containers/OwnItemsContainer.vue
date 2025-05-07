<template>
    <main class="OwnItemsContainer">
        <OwnItemsComponent 
            :userItems
        />
    </main>
</template>
  
<script setup lang="ts">
import OwnItemsComponent from '@/components/OwnItemsComponent.vue';
import { onMounted } from 'vue';
import { useItemsStore } from '@/stores/ItemStore';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';

    const ItemsStore = useItemsStore()
    const AuthStore = useAuthStore()

    const { userItems } = storeToRefs(ItemsStore)
    const { user } = storeToRefs(AuthStore)

    onMounted(async () => {
        if(user.value){
            await ItemsStore.fetchUserItems(user.value.id);
        }
    });

</script>