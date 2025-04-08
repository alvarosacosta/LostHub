<template>
    <main class="LostItemCardContainer">
        <LostItemCardComponent 
            :item
        />
    </main>
</template>
  
<script setup lang="ts">
import LostItemCardComponent from '@/components/LostItemCardComponent.vue';
import { LostItem } from '@/interfaces/items';

    defineProps<{
        item: LostItem
    }>()

    
</script>