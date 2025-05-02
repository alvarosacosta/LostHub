<template>
    <main class="ItemsContainer">
        <ItemsComponent 
            :items
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemsComponent from '@/components/ItemsComponent.vue';
import { onMounted, Ref, ref } from 'vue';
import { useItemsStore } from '@/stores/ItemStore';
import { MixedItem } from '@/interfaces/items';

    const ItemsStore = useItemsStore()
    var items : Ref<MixedItem[] | undefined> = ref(undefined)

    onMounted(async () => {
        await ItemsStore.fetchAllItems();
        items.value = ItemsStore.allItems; 
    });

</script>