<template>
    <main class="LandingPageComponent">
        <section class="landing-text">
            <h1 class="landing-title">¡Bienvenido a <span class="landing-title-accent">Lost Hub</span>!</h1>
            <h3 class="landing-subtitle">Explora, ayuda y encuentra lo que es tuyo</h3>
        </section>

        <section class="landing-buttons">
            <router-link class="landing-login" :to="{ name: 'hub', query: { login: 'true' } }">Iniciar sesión</router-link>
            <router-link class="landing-register" to="/register">¿No tienes una cuenta? Regístrate</router-link>
        </section>

        <router-link class="landing-continue" to="/hub">Continua sin iniciar sesión</router-link>
    </main>
</template>

<script setup lang="ts">

</script>

<style scoped lang="css">

    .LandingPageComponent{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        height: 100vh;
        width: 100%;

        background-image: url('@/assets/monochrome-cascading-waterfall.jpg');

        gap: 1em;
        color: var(--text-color);
    }

    .landing-text{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        text-shadow: 4px 4px 10px rgba(0, 0, 0, 1);

    }

    .landing-title{
        font-size: 4.5em;
    }

    .landing-title-accent{
        color: var(--first-accent-color);
        text-shadow: 4px 4px 10px rgba(0, 0, 0, 1);
    }

    .landing-subtitle{
        font-size: 1.5em;
    }

    .landing-buttons{
        display: flex;
        align-items: center;
        justify-content: center;
        
    }

    .landing-login, .landing-continue{
        text-decoration: none;
        background-color: var(--first-color);
        color: inherit;

        padding: 10px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        margin: 1em;
        margin-right: 1.2em;
    }

    .landing-login:hover, .landing-continue:hover{
        background-color: var(--second-color);
    }

    .landing-continue{
        position: fixed;
        bottom: 0;
        right: 0;

        margin: 0 4em 4em 0;
    }

    .landing-register{
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

    .landing-register:hover{
        background-color: var(--second-accent-color);
    }

    @media (max-width: 885px) {
        .landing-title{
            font-size: 2.5em;
        }

        .landing-subtitle{
            font-size: 1em;
        }

        .landing-login, .landing-continue, .landing-register{
            font-size: .9em;
        }

    }

    @media (max-width: 490px) {
        .landing-title{
            font-size: 1.8em;
        }

        .landing-subtitle{
            font-size: .7em;
        }

        .landing-login, .landing-continue, .landing-register{
            font-size: .6em;
        }

    }

</style>