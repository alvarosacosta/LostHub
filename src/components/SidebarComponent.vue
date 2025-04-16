<template>
    <v-icon class="hamburger" @click="toggleSidebar()" v-if="isClosed">mdi-menu</v-icon>
    <main v-else class="SidebarComponent">
        <article class="main-content">
            <section class="user-section">
                <v-icon class="close" @click="toggleSidebar()" size="38">mdi-close-thick</v-icon>
                <section class="user-content">
                    <img class="user-icon" src="@/assets/imagen_de_perfil.png" alt="user-icon" />
                    <v-dialog v-model="dialogVisible" max-width="450" max-height="600" scroll-strategy="close">
                        <template v-slot:activator="{ props: activatorProps }">
                            <button 
                                v-bind="activatorProps" 
                                class="login-button"
                                >
                                Iniciar sesión
                            </button>
                        </template>

                        <template v-slot>
                            <LogInContainer @logged-in="loggedIn"></LogInContainer>
                        </template>
                    </v-dialog>
                </section>
            </section>

            <section class="navigation">
                <router-link class="navigation-button" to="/profile">Perfil de usuario</router-link>
                <router-link class="navigation-button" to="/">Objetos perdidos</router-link>
                <router-link class="navigation-button" to="/notifications">Notificaciones</router-link>
                <router-link class="navigation-button" to="/about-us">Quiénes somos</router-link>
            </section>
        </article>

        <section class="secondary-content">
            <a class='github-ref' href="https://github.com/alvarosacosta">
                <img class="github-icon" src="@/assets/github.png" alt="github-icon"/>
            </a>

            <router-link class="publish-button" to="/new-post">
                <img class="new-post-icon" src="@/assets/pluma-publicación.png" alt="new-post-icon" />
            </router-link>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue';
import LogInContainer from '@/containers/LogInContainer.vue';

    var isClosed : Ref<boolean> = ref(false);   
    const dialogVisible = ref(false);
    const windowWidth = ref(window.innerWidth);

    const emit = defineEmits<{
        (e: 'toggle-sidebar', closed: boolean): void
        (e: 'loggedIn', error?: string): void
    }>()

    const isTablet = computed(() => windowWidth.value < 1220);

    const updateWindowWidth = () => {
        windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener('resize', updateWindowWidth);

        if (window.innerWidth < 1220) {
            isClosed.value = true;
            emit('toggle-sidebar', true);
        }
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateWindowWidth);
    });

    watch(isTablet, (val) => {
        if (val) {
            isClosed.value = true;
            emit('toggle-sidebar', isClosed.value);
        }
    });

    function toggleSidebar() : void {
        isClosed.value = !isClosed.value;
        emit('toggle-sidebar', isClosed.value)
    }

    function loggedIn(error: string | undefined) : void {
        emit('loggedIn', error);
        dialogVisible.value = false;
    }
    
</script>
  
<style scoped lang="css">
    .hamburger {
        position: fixed;
        cursor: pointer;
        top: 20px;
        left: 20px;

        padding: 1em;

        background-color: var(--first-accent-color);
        color: var(--text-color);

        box-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
        border-radius: 5px;

        z-index: 2;
    }

    .hamburger:hover {
        background-color: var(--second-accent-color);
    }

    .SidebarComponent {
        width: 17em;
        height: 100%;

        background-color: var(--third-color);
        color: var(--text-color);

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        box-shadow: 4px 0px 15px rgba(0, 0, 0, 0.5);
        position: fixed;

        border-right: 3.5px solid var(--first-color);

        z-index: 2;
    }

    .closed {
        display: none;
    }

    .main-content {
        display: flex;
        flex-direction: column;
    }

    .user-section {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .7em;
        padding-right: .9em;

        background-color: var(--second-color);
        height: 4.8em;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 1);
    }

    .close {
        color: var(--first-accent-color);
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, .6));
    }

    .close:hover {
        cursor: pointer;
        color: var(--second-accent-color);
    }

    .user-content {
        display: flex;
        align-items: center;
        gap: 15px;

        background-color: var(--first-color);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        padding: 8.5px;
        border-radius: 10px;
    }

    .user-icon {
        width: 35px;
    }

    .login-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 5px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        width: 10em;
        font-size: small;
    }

    .login-button:hover {
        background-color: var(--second-accent-color);
    }

    .navigation {
        display: flex;
        flex-direction: column;
        margin-top: .8em;
    }

    .navigation-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 10px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        margin: 1em;
        margin-right: 1.2em;
    }

    .navigation-button:hover {
        background-color: var(--second-accent-color);
    }

    .secondary-content {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-left: .9em;
    }

    .github-icon {
        width: 50px;
    }

    .publish-button {
        background-color: var(--first-accent-color);
        border-radius: 10em;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        width: 70px;
        height: 70px;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        bottom: 30px;
        left: 20px;
        
    }

    .publish-button:hover {
        background-color: var(--second-accent-color);
    }

    .new-post-icon {
        width: 35px;
    }

</style>