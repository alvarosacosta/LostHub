<template>
    <main class="ItemCardContainer">
        <ItemCardComponent 
            :item
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemCardComponent from '@/components/ItemCardComponent.vue';
import { MixedItem } from '@/interfaces/items';

    defineProps<{
        item:  MixedItem | undefined
    }>()

    
</script>