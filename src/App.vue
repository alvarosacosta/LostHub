<template>
  <main class='main'>
    <SidebarComponent v-if="showSidebar" msg="Mi nombre"></SidebarComponent>
    <router-view class="main-content" :class="{ 'main-content-without-sidebar': !showSidebar }"/>

  </main>
</template>

<script setup lang="ts">
import SidebarComponent from './components/SidebarComponent.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

  const route = useRoute();
  const showSidebar = computed(() => route.meta.hasSidebar !== false);

</script>

<style>

.main {
  display: grid;
  grid-template-columns: 17.05em 1fr;
  
}

.main-content {
  grid-column: 2;
}

.main-content-without-sidebar {
  grid-column-start: 1;
  grid-column-end: 3;
}

</style>
