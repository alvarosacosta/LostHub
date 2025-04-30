<template>
    <main class="StatusBar" :class="{'slide-fast': forcingClose}">
        <article class="success" v-if="msg">
            <p>{{ msg }}</p>
        </article>
        <article class="failure" v-if="error">
            <p>{{ error }}</p>
        </article>
    </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, Ref, ref } from 'vue';
    const emit = defineEmits<{
        (e: 'update:msg', msg: string): void
        (e: 'update:error', msg: string): void
    }>()

    defineProps<{
        msg: string,
        error: string
    }>()

    const forcingClose : Ref<boolean> = ref(false);

    onMounted(() => {
        setTimeout(() => {
            closeStatusBar()
        }, 5500); 
        
        setTimeout(() => {
            document.addEventListener('click', forceCloseStatusBar);
        }, 500)
    });

    onBeforeUnmount(() => {
        document.removeEventListener('click', forceCloseStatusBar);
    });

    function forceCloseStatusBar() : void {
        forcingClose.value = true; 

        setTimeout(() => {
            emit('update:msg', '');
            emit('update:error', '');
        }, 500); 
    }

    function closeStatusBar() : void {
        emit('update:msg', '');
        emit('update:error', '');
}

</script>

<style lang="css" scoped>
    .StatusBar {
        box-shadow: 0 2px 5px rgba(0, 0, 0, .8);

        display: flex;
        align-items: center;
        justify-content: center;

        color: var(--text-color);
        text-align: center;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;

        animation: down 5s ease forwards;
    }

    .success {
        background-color: var(--fourth-color);
        color: var(--first-accent-color);
        font-size: medium;

        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 1em;
    }

    .failure {
        background-color: var(--first-accent-color);
        color: var(--text-color);

        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        padding: 1em;
    }

    @keyframes down {
        0% {
            transform: translateY(-100px); 
        }
        15% {
            transform: translateY(0); 
        }
        80% {
            transform: translateY(0); 
        }
        100% {
            transform: translateY(-100px); 
        }
    }

    .slide-fast {
        animation: slideUp 0.5s ease-out forwards;
    }

    @keyframes slideUp {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-200px);
        }
    }

</style>