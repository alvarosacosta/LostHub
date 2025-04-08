<template>
    <main class="sidebar">
        <article class="main-content">
            <section class="user-content">
                <img class="user-icon" src="@/assets/imagen_de_perfil.png" alt="user-icon" />
                <router-link class="profile-button" to="/profile">Iniciar sesión</router-link>
            </section>

            <section class="navigation">
                <router-link class="navigation-button" to="/">Objetos perdidos</router-link>
                <router-link class="navigation-button" to="/notifications">Notificaciones</router-link>
                <router-link class="navigation-button about-us-button" to="/about-us">Quiénes somos</router-link>
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
    
</script>
  
<style scoped lang="css">
    .sidebar {
        width: 17em;
        height: 100vh;

        background-color: var(--third-color);
        color: var(--text-color);

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        box-shadow: 4px 0px 15px rgba(0, 0, 0, 0.5);
        position: fixed;
    }

    .main-content {
        display: flex;
        flex-direction: column;
    }

    .user-content {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 1em;

        background-color: var(--second-color);
        height: 4em;
    }

    .user-icon {
        width: 35px;
    }

    .profile-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 5px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        margin-left: 1.5em;
        width: 12em;
        font-size: small;
    }

    .profile-button:hover {
        background-color: var(--second-accent-color);
    }

    .navigation {
        display: flex;
        flex-direction: column;

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