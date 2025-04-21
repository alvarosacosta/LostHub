<template>
  <main class='main'>
    <LoadingOverlay v-if="loading" v-model:loading="loading" ></LoadingOverlay>

    <SidebarContainer @show-success="useStatusBarMessage" @show-error="useStatusBarError" @toggle-sidebar="toggleSidebar" v-if="showSidebar"></SidebarContainer>
    <router-view @show-success="useStatusBarMessage"  @show-error="useStatusBarError" class="main-content" :class="sidebarOptions()"/>
    <StatusBar v-if="statusBarError || statusBarMessage" v-model:msg="statusBarMessage" v-model:error="statusBarError"></StatusBar>

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
  const statusBarMessage : Ref<string> = ref('');

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

  function toggleSidebar(sidebarStatus: boolean): void {
    isClosed.value = sidebarStatus;
  }

  function sidebarOptions(): string {
    return isTablet.value || isClosed.value || !showSidebar.value
    ? 'main-content-without-sidebar'
    : 'main-content'
  }

  function useStatusBarMessage(message: string) : void {
    showLoader()

    setTimeout(() => {
        statusBarMessage.value = message;
    }, 620) 
  }

  function useStatusBarError(error: string) : void {
    statusBarError.value = error;
  }
  
  const loaderRoutes = ['/', '/profile'];
  router.beforeEach((to, from, next) => {
    isClosed.value = false;

    const isAValidRoute = loaderRoutes.includes(to.path);
    if (isAValidRoute) {
      showLoader()
    }

    next()
  })

  function showLoader() : void {
    loading.value = true
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
