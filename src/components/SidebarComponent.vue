<template>
    <v-icon class="hamburger" @click="toggleSidebar()" v-if="isClosed">mdi-menu</v-icon>
    <main v-else class="SidebarComponent">
        <article class="main-content">
            <section class="user-section">
                <v-icon class="close" @click="toggleSidebar()" size="38">mdi-close-thick</v-icon>

                <section v-if="!userProfile" class="user-content">
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

                <section v-else class="user-content">
                        <img class="logged-user-icon" :src="userProfile.profilePictureURL" alt="logged-user-icon" />
                        <p class="user-name">{{ userProfile.username }}</p>
                </section>
            </section>

            <section class="navigation">
                <router-link v-if="userProfile" :class="{ 'selected-button': route.path.endsWith('/hub')}" class="navigation-button" to="/hub">Objetos perdidos</router-link>
                <router-link v-if="userProfile" :class="{ 'selected-button': route.path.endsWith('/profile')}" class="navigation-button" to="/profile">Perfil de usuario</router-link>
                <router-link v-if="userProfile" :class="{ 'selected-button': route.path.endsWith('/own-items')}" class="navigation-button" to="/own-items">Mis objetos</router-link>
                <router-link v-if="userProfile" :class="{ 'selected-button': route.path.endsWith('/notifications')}" class="navigation-button" to="/notifications">Mis notificaciones</router-link>
                <router-link v-if="userProfile" class="navigation-button" to="/hub">Objetos guardados</router-link>
                <router-link class="navigation-button" to="/about-us">Quiénes somos</router-link>
            </section>

            <button v-if="userProfile" class="log-out-button" @click="logOut()">Cerrar sesión</button>
        </article>


        <section class="secondary-content">
            <a class='github-ref' href="https://github.com/alvarosacosta">
                <v-icon class="github-icon" size="50">mdi-github</v-icon>
            </a>
            
            <router-link v-if="userProfile" class="publish-button" to="/postItem">
                <span class="tooltip-post">Publicar un objeto</span>
                <v-icon class="new-post-icon" size="40" color="var(--fourth-color)">mdi-feather</v-icon>
            </router-link>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, Ref, watch } from 'vue';
import LogInContainer from '@/containers/LogInContainer.vue';
import { UserDetails } from '@/interfaces/user';
import router from '@/router';
import { useRoute } from 'vue-router';

    var isClosed : Ref<boolean> = ref(false);   
    const dialogVisible : Ref<boolean> = ref(false);
    const windowWidth = ref(window.innerWidth);

    const route = useRoute()

    defineProps<{
        userProfile : UserDetails | null
    }>()

    const emit = defineEmits<{
        (e: 'toggle-sidebar', closed: boolean): void
        (e: 'loggedIn', error?: string): void
        (e: 'logOut'): void;
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

        if (route.query.login === 'true') {
            isClosed.value = false;
            dialogVisible.value = true

            router.replace({ query: { ...route.query, login: undefined } })
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

    function logOut() : void {
        emit("logOut")
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

        z-index: 20;
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

        z-index: 20;
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
        gap: 1em;
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
        gap: 9px;

        width: 75%;

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

    .navigation-button, .log-out-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 10px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        margin: .8em;
        margin-right: 1.2em;
    }

    .navigation-button:hover, .log-out-button:hover {
        background-color: var(--second-accent-color);
    }

    .selected-button {
        background-color: var(--second-accent-color);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 1);
    }

    .secondary-content {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-left: .9em;
    }

    .github-icon {
        filter: drop-shadow(1px 1px 2.5px rgba(0, 0, 0, .7));
        color: var(--first-accent-color);

        position: relative;
        bottom: 7px;
    }

    .log-out-icon {
        text-decoration: none;

        padding: 5px;
        cursor: pointer;

        filter: drop-shadow(1px 1px 2.5px rgba(0, 0, 0, .7));
        color: var(--first-accent-color);

        position: relative;
        bottom: 2px;
        right: 20px;

    }

    .log-out-icon:hover, .github-icon:hover{
        color: var(--second-accent-color);
    }

    .tooltip-logout, .tooltip-post {
        position: absolute;
        bottom: 80%;
        left: 90%;
        transform: translateX(-50%);
        background-color: var(--first-color);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);
        color: var(--text-color);
        padding: .7em;
        border-radius: .5em;
        font-size: 12px;
        white-space: nowrap;
        pointer-events: none;
        z-index: 10;
        
        transition-delay: 0s;
        transition: opacity 0.3s ease;
        
        opacity: 0;
    }

    .log-out-icon:hover .tooltip-logout {
        opacity: .7;
        transition-delay: 0.7s;
    }

    .publish-button:hover .tooltip-post {
        opacity: .9;
        transition-delay: 0.7s;
    }

    .new-post-icon {
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 1));
        text-decoration: none;
    }

    .publish-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        border-radius: 10em;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        width: 70px;
        height: 70px;

        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        bottom: 40px;
        left: 20px;
        
    }

    .publish-button:hover {
        background-color: var(--second-accent-color);
    }

    .logged-user-icon{
        width: 2em;
        height: 2em;
        border-radius: 5em;
        border: 2px solid var(--fourth-color);
        object-fit:cover;
    }

    .user-name {
        font-size: 1em;
        color: var(--text-color);
        text-align: center;
        font-weight: 600;

        position: relative;
        top: 2px;
    }

</style>