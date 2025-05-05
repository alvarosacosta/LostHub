<template>
    <main class="ItemDetailsContainer">
        <ItemDetailsComponent 
            :singleItem
            :foreignUserProfile
            :userProfile
            @deleteItem="deleteItem"
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemDetailsComponent from '@/components/ItemDetailsComponent.vue';
import { useItemsStore } from '@/stores/ItemStore';
import { useAuthStore } from '@/stores/AuthStore';
import { onMounted} from 'vue';
import { storeToRefs } from 'pinia';
import router from '@/router';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    const props = defineProps<{
        id: string
    }>()

    const ItemsStore = useItemsStore()
    const AuthStore = useAuthStore()

    const { foreignUserProfile, userProfile } = storeToRefs(AuthStore);  
    const { fetchedUserID, singleItem } = storeToRefs(ItemsStore);

    onMounted(async () => {
        await ItemsStore.fetchItemById(props.id);
        await ItemsStore.fetchUserIdByItemId(props.id);
        await AuthStore.fetchUserById(fetchedUserID.value);

    });

    async function deleteItem() : Promise<void>{
        try {
            if ( foreignUserProfile.value?.id !== userProfile.value?.id){
                throw new Error(`Unauthorized delete attempt by user ${userProfile.value?.id}`);
            }

            await ItemsStore.deleteItemById(props.id)

            router.push('/hub')
            emit('showSuccess', 'Se ha borrado el objeto de manera satisfactoria.')

        } catch(err : any) {
            console.error(err.message)
            emit('showError', 'Ha habido un error al borrar el objeto.')
        }
    }
    
</script>