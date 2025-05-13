<template>
    <main class="ItemsContainer">
        <ItemsComponent 
            :items
            @show-error="emit('showError', $event)"
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemsComponent from '@/components/ItemsComponent.vue';
import { onMounted, Ref, ref } from 'vue';
import { useItemsStore } from '@/stores/ItemStore';
import { MixedItem } from '@/interfaces/items';

    const emit = defineEmits<{
        (e: 'showError', error: string): void;
    }>()

    const ItemsStore = useItemsStore()
    var items : Ref<MixedItem[] | undefined> = ref(undefined)

    onMounted(async () => {
        await ItemsStore.fetchAllItems();
        items.value = ItemsStore.allItems; 
    });



</script>