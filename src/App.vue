<template>
  <main class='main'>
    <LoadingOverlay v-if="loading" v-model:loading="loading" ></LoadingOverlay>

    <SidebarContainer @show-success="useStatusBarMessage" @show-error="useStatusBarError" @toggle-sidebar="toggleSidebar" v-if="showSidebar"></SidebarContainer>
    <router-view @show-success="useStatusBarMessage"  @show-error="useStatusBarError" class="main-content" :class="sidebarOptions()"/>
    <StatusBar v-if="statusBarError || statusBartext" :msg="statusBartext" :error="statusBarError"></StatusBar>

  </main>
</template>

<script setup lang="ts">
import SidebarContainer from '@/containers/SidebarContainer.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import StatusBar from './components/StatusBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref, Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

  const loading : Ref<boolean> = ref(false)

  const route = useRoute();
  const router = useRouter();

  const statusBarError : Ref<string> = ref('');
  const statusBartext : Ref<string> = ref('');

  const showSidebar = computed(() => route.meta.hasSidebar !== false);
  var isClosed : Ref<boolean> = ref(false);

  const windowWidth = ref(window.innerWidth);
  const isTablet = computed(() => windowWidth.value < 1220);

  const updateWindowWidth = () => {
      windowWidth.value = window.innerWidth;
  };

  const authStore = useAuthStore();

  async function restartUser() : Promise<void> {
    await authStore.init();
  }
  
  onMounted(() => {
    restartUser();
    window.addEventListener('resize', updateWindowWidth);

  });

  function toggleSidebar(closed: boolean): void {
    isClosed.value = closed;
  }

  function sidebarOptions(): string {
    return isTablet.value || isClosed.value || !showSidebar.value
    ? 'main-content-without-sidebar'
    : 'main-content'
  }

  function useStatusBarMessage(message: string) : void {
    statusBartext.value = message; 
    startTimeOfStatusBar();
  }

  function useStatusBarError(error: string) : void {
    statusBarError.value = error;
    startTimeOfStatusBar();
  }

  function startTimeOfStatusBar() : void {
    setTimeout(() => {
      statusBarError.value = '';
      statusBartext.value = '';
    }, 5500); 
  
  }
  
  const loaderRoutes = ['/', '/profile'];
  router.beforeEach((to, from, next) => {
    isClosed.value = false;

    const showLoader = loaderRoutes.includes(to.path);
    loading.value = showLoader

    next()
  })

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
