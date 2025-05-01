<template>
    <main class="CreateItemContainer">
        <CreateItemComponent @failure="showError" @success="postItem" ></CreateItemComponent>
    </main>
</template>

<script setup lang="ts">
import CreateItemComponent from '@/components/CreateItemComponent.vue';
import { ItemImages, MixedItem } from '@/interfaces/items';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useItemsStore } from '@/stores/database';
import { storeToRefs } from 'pinia';

    const emit = defineEmits<{
        (e: 'showSuccess', message: string): void
        (e: 'showError', error: string): void
    }>()

    function showError(error : string) : void {
        emit('showError', error)
    }

    const ItemsStore = useItemsStore()
    const { lastItemPostID } = storeToRefs(ItemsStore)

    const AuthStore = useAuthStore()
    const { user } = storeToRefs(AuthStore)

    async function postItem(item : MixedItem, images : ItemImages) : Promise<void> {
        try {
            await ItemsStore.postItem(item, images, user.value.id);

            if (lastItemPostID.value) {
                emit('showSuccess', 'Se ha subido el objeto de forma satisfactoria.');

                router.push({
                    name: 'item-details',
                    params: { id: lastItemPostID.value }
                });

                lastItemPostID.value = ''

            } else {
                throw new Error('Proceso de subida de objeto fallida. No se puede obtener el objeto creado.')
            }


        } catch (error : any) {
            if (error){
                showError(error);

            } else {
                showError("Proceso de subida de objeto fallida. No se ha podido postear el objeto.");
            }

        }
    }
</script>