<template>
    <main class="ItemDetailsContainer">
        <ItemDetailsComponent 
            :singleItem
            :foreignUserProfile
            :fetchedUserID
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemDetailsComponent from '@/components/ItemDetailsComponent.vue';
import { useItemsStore } from '@/stores/ItemStore';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted} from 'vue';
import { storeToRefs } from 'pinia';

    const props = defineProps<{
        id: string
    }>()

    const ItemsStore = useItemsStore()
    const AuthStore = useAuthStore()

    const { foreignUserProfile } = storeToRefs(AuthStore);  
    const { fetchedUserID, singleItem } = storeToRefs(ItemsStore);

    onMounted(async () => {
        await ItemsStore.fetchItemById(props.id);
        await ItemsStore.fetchUserIdByItemId(props.id);
        await AuthStore.fetchUserById(fetchedUserID.value);

    });
    
</script>