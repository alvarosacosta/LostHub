<template>
    <main class="ItemsContainer">
        <ItemsComponent 
            :items
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemsComponent from '@/components/ItemsComponent.vue';
import { Ref, ref } from 'vue';

import LostItems from '@/json/LostItems.json';
import { LostItem } from '@/interfaces/items';

const rawData = LostItems as LostItem[];
const items: Ref<LostItem[]> = ref(
    rawData.map(item => ({
        ...item,
        type: 'Perdido',
        gender: item.gender === 'Macho' ? 'Macho' : item.gender === 'Hembra' ? 'Hembra' : undefined
    }))
);

</script>