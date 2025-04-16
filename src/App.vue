<template>
  <main class='main'>
    <LoadingOverlay :loading></LoadingOverlay>

    <SidebarContainer @show-success="useStatusBarText" @show-error="useStatusBarError" @toggle-sidebar="toggleSidebar" v-if="showSidebar" msg="Mi nombre"></SidebarContainer>
    <router-view class="main-content" :class="sidebarOptions()"/>
    <StatusBar v-if="statusBarError || statusBartext" :msg="statusBartext" :error="statusBarError"></StatusBar>

  </main>
</template>

<script setup lang="ts">
import SidebarContainer from '@/containers/SidebarContainer.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import StatusBar from './components/StatusBar.vue';
import { useRoute } from 'vue-router';
import { computed, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import router from './router';
import { UserDetails } from './interfaces/user';

  const loading : Ref<boolean> = ref(false)
  const itemDetailsRoute : RegExp = /^\/item(\/.*)?$/

  const route = useRoute();

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
    watch(
      () => authStore.userProfile,
      (profile) => {
        if (profile) {
          console.log('Perfil cargado:', profile);
        }
      }
    );
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

  function useStatusBarText(text: string) : void {
    statusBartext.value = text; 
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

  router.beforeEach((to, from, next) => {
    const showLoader = itemDetailsRoute.test(to.path) || to.path === '/';
    loading.value = showLoader
    next()
  })

  router.afterEach(() => {
    setTimeout(() => {
      loading.value = false
    }, 300)
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
