<template>
  <main class='main'>
    <SidebarContainer @toggle-sidebar="toggleSidebar" v-if="showSidebar" msg="Mi nombre"></SidebarContainer>
    <router-view class="main-content" :class="sidebarOptions()"/>

  </main>
</template>

<script setup lang="ts">
import SidebarContainer from '@/containers/SidebarContainer.vue';
import { useRoute } from 'vue-router';
import { computed, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue';

  const route = useRoute();
  const showSidebar = computed(() => route.meta.hasSidebar !== false);
  const windowWidth = ref(window.innerWidth);
  var isClosed : Ref<boolean> = ref(false);

  const isTablet = computed(() => windowWidth.value < 1220);

  const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
      window.addEventListener('resize', updateWindowWidth);
  });

  onBeforeUnmount(() => {
      window.removeEventListener('resize', updateWindowWidth);
  });

  watch(
    () => route.fullPath,
    () => {
      isClosed.value = false;
    }
  )

  function toggleSidebar(closed: boolean): void {
    isClosed.value = closed;
  }

  function sidebarOptions(): string {
    return isTablet.value || isClosed.value || !showSidebar.value
    ? 'main-content-without-sidebar'
    : 'main-content'
  }

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
