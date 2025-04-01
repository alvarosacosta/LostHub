<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <SidebarComponent v-if="showSidebar" msg="Mi nombre"></SidebarComponent>
  <router-view/>
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
  display: flex;

}

</style>
