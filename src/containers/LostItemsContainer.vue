<template>
    <main class="LostItemsContainer">
        <LostItemsComponent 
            :items
        />
    </main>
</template>
  
<script setup lang="ts">
import LostItemsComponent from '@/components/LostItemsComponent.vue';
import { Ref, ref } from 'vue';

import LostItems from '@/json/LostItems.json';
import { LostItem } from '@/interfaces/items';

const rawData = LostItems;
const items: Ref<LostItem[]> = ref(
    rawData.map(item => ({
        ...item,
        type: item.type = 'Perdido',
        gender: item.gender === 'Macho' ? item.gender = 'Macho' : item.gender === 'Hembra' ? item.gender = 'Hembra' : undefined,
    }))
);

</script>