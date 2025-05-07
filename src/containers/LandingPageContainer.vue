<template>
    <main class="LandingPageContainer">
        <LandingPageComponent></LandingPageComponent>
    </main>
</template>

<script setup lang="ts">
import LandingPageComponent from '@/components/LandingPageComponent.vue';
import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
import { onMounted, watch } from 'vue';

    const AuthStore = useAuthStore()
    const { user } = storeToRefs(AuthStore)

    onMounted(() => {
        watch(user, (signedUser) => {
            if (signedUser) {
                router.push('/hub')
            }
        }, { immediate: true })
    })

</script>