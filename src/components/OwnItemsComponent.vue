<template>
    <main class="OwnItemsComponent">
        <ItemsComponent 
            :items="userItems"
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemsComponent from '@/components/ItemsComponent.vue';
import { MixedItem } from '@/interfaces/items';

    const props = defineProps<{
        userItems: MixedItem[]  | undefined
    }>();

</script>