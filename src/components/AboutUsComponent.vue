<template>
    <main class="AboutUsComponent">
        <button class='back-button' onclick="history.back()"> Volver </button>
        <h1 class="about-us-title">¿Quiénes somos?</h1>

        <article class="about-us-content">
            <section class="about-us-item">
                <section class="about-us-text">
                    <h3 class='info-title'>Objetivos</h3>
                    <p class='info-text'>Nuestro objetivo es aportar una solución tecnológica simple que ayude a devolver los objetos perdidos de tu zona a su propietario. 
                        Conectar y crear una comunidad de usuarios dispuesta a ayudarse entre ellos.</p>
                </section>
                <img class="about-us-img" src="https://placehold.co/600x400" alt="Imagen 1">
            </section>

            <section class="about-us-item">
                <img class="about-us-img" src="https://placehold.co/600x400" alt="Imagen 2">
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
                        no conoce límites a la hora de ayudar a encontrar todos esos objetos queridos que una vez fueron perdidos.</p>
                </section>
                <img class="about-us-img" src="https://placehold.co/600x400" alt="Imagen 3">
            </section>
        </article>
    </main>
</template>
  
<script setup lang="ts">

</script>

<style scoped lang="css">
    .back-button {
        position: fixed;
        top: 20px;
        left: 20px;
        padding: 10px 20px;

        background-color: var(--first-accent-color);
        color: var(--text-color);

        box-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
        border-radius: 5px;

        z-index: 999;
    }

    .back-button:hover {
        background-color: var(--second-accent-color);
    }
    
    .about-us-title {
        justify-self: center;
        margin-top: 1em;
        color: var(--text-color);

        background-color: var(--first-color);
        padding: 10px;
        border-radius: 20px;

        box-shadow: 2px 2px 3px rgba(0, 0, 0, 1);
    }
    
    .about-us-content {
        display: flex;
        flex-direction: column;
        gap: 10em;

        margin: 5em 0em 7em 0em;
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
    }

    .about-us-text {
        padding: 2em;
    }

</style>