<template>
    <main class="AboutUsComponent">
        <button class='back-button' @click="$router.back()"> Volver </button>
        <h1 class="about-us-title">¿Quiénes somos?</h1>

        <article class="about-us-content">
            <section class="about-us-item">
                <section class="about-us-text">
                    <h3 class='info-title'>Objetivos</h3>
                    <p class='info-text'>Nuestro objetivo es aportar una solución tecnológica simple que ayude a devolver los objetos perdidos de tu zona a su propietario. 
                        Conectar y crear una comunidad de usuarios dispuesta a ayudarse entre ellos.</p>
                </section>
            </section>

            <section class="about-us-item">
                <section class="about-us-text">
                    <h3 class='info-title'>Razón de ser</h3>
                    <p class='info-text'>A día de hoy hay una gran cantidad de objetos extraviados en todo el mundo, muchos acaban abarrotando 
                        las estanterías de las distintas oficinas de objetos perdidos de muchas organizaciones. Queremos ayudar a vaciarlas.</p>
                </section>
            </section>

            <section class="about-us-item">
                <section class="about-us-text">
                    <h3 class='info-title'>Creadores</h3>
                    <p class='info-text'>La propuesta fue desarrollada a principios de 2025 por solo un desarrollador. Su visión culmina en el portal web Lost Hub. Un lugar cuya comunidad 
                        no conoce límites a la hora de ayudar a encontrar todos esos objetos que una vez fueron perdidos.</p>
                </section>
            </section>
        </article>
    </main>
</template>
  
<script setup lang="ts">

</script>

<style scoped lang="css">
    .AboutUsComponent{
        min-height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        opacity: 0;
        animation: aparecer 1s forwards;
    }

    .about-us-title {
        justify-self: center;
        margin-top: 1em;
        color: var(--text-color);

        background-color: var(--first-color);
        padding: 10px;
        border-radius: .5em;

        box-shadow: 2px 2px 3px rgba(0, 0, 0, 1);
    }
    
    .about-us-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5em;

        margin-top: 5em;
        margin-bottom: 5em;
    }

    .about-us-item {
        display: flex;
        align-items: center;
        gap: .5em;

        background-color: var(--first-color);
        color: var(--text-color);

        opacity: 0;
        animation: aparecer 1s forwards;

        box-shadow: 0px 4px 5px rgba(0, 0, 0, 1);
        border-radius: 1em;
    }
    
    .about-us-text {
        padding: 2em;

        width: 20em;
        height: 20em;

        text-align: justify;

        display: flex;
        align-items: center;
        flex-direction: column;

        gap: .5em;
    }

    .info-title{
        justify-self: center;
    }

    

    @media (max-width: 1140px) {
        .about-us-content {
            margin-top: 1em;

            flex-direction: column;
            gap: 0;

        }

        .about-us-item {
            flex-direction: column;
            padding: 1.5em;
            margin: 2em;
            gap: 1em;

            border-radius: .5em;
        }

        .about-us-text {
            padding: .5em;

            width: auto;
            max-width: 20em;
            height: 20em;
        }

    }

</style>