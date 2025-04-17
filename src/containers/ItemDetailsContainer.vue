<template>
    <main class="ItemDetailsContainer">
        <ItemDetailsComponent 
            :item
        />
    </main>
</template>
  
<script setup lang="ts">
import ItemDetailsComponent from '@/components/ItemDetailsComponent.vue';
import LostItems from '@/json/LostItems.json';
import { LostItem } from '@/interfaces/items';
import { onBeforeMount, ref, Ref } from 'vue';

    const props = defineProps<{
        id: string
    }>()

    var item : Ref<LostItem | undefined> = ref(undefined)

    onBeforeMount(() => {
        const rawData = LostItems;
        const items: Ref<LostItem[]> = ref(
            rawData.map(item => ({
                ...item,
                type: item.type = 'Perdido',
                gender: item.gender === 'Macho' ? item.gender = 'Macho' : item.gender === 'Hembra' ? item.gender = 'Hembra' : undefined,
                files: item.files ? item.files = item.files : undefined
            }))
        );

        item = ref(items.value.find(item => item.id === props.id))
    })
    
</script>