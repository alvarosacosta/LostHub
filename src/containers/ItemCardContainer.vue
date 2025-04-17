<template>
    <main class="ItemCardContainer">
        <ItemCardComponent 
            :item
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemCardComponent from '@/components/ItemCardComponent.vue';
import { LostItem } from '@/interfaces/items';

    defineProps<{
        item: LostItem
    }>()

    
</script>