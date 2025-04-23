<template>
    <main class="LogInComponent">
        <article class="log-in-container">
            <h1 class="title">Iniciar sesión</h1>

            <form class="form" @submit.prevent="onSubmit">

                <section class="text-fields">
                    <v-text-field
                        class="email field"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        variant="solo-filled"
                        required
                    ></v-text-field>
    
                    <v-text-field
                        class="password field"
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        v-model="password"
                        :rules="passwordRules"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                        label="Contraseña"
                        variant="solo-filled"
                        required
                    ></v-text-field>  
                </section>
                
                <section class="footer">
                    <p class="register-label" >¿No tienes una cuenta? <router-link class="register-button" to="/register">Registrate</router-link> </p>
                    <button class="submit-button"><v-icon class="view-details-arrow" size="100">mdi-arrow-right-thick</v-icon></button>
                </section>

            </form>
        </article>
    </main>
</template>
  
<script setup lang="ts">
import { User } from '@/interfaces/user';
import { ref, Ref } from 'vue';

    const emit = defineEmits<{
        (e: 'logIn', user: User): void
    }>()

    const email : Ref<string> = ref('');
    const password : Ref<string> = ref('');
    const showPassword : Ref<boolean> = ref(false);

    const passwordRules = [
        (value: string) => {
            if (value) return true
            return 'La contraseña es obligatoria.'
        },
    ]

    const emailRules = [
        (value: string) => {
            if (value) return true
            return 'El email es obligatorio.'
        },

        (value: string) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                return 'Debe ser un email válido.';
            }
                return true;
        },
    ]

    const onSubmit = () => {
        const user : User = {
            email: email.value,
            password: password.value,
        };

        emit('logIn', user);
    };

</script>

<style scoped lang="css">
    .log-in-container {
        font-family: var(--font-poppins);

        background-color: var(--third-color);
        border: 3px solid var(--first-color);
        box-shadow: 4px 4px 5px rgba(0, 0, 0, 1);
        border-radius: 1em;
        
        display: flex;
        flex-direction: column;
        align-items: center;

        gap: 2em;
        padding: 2em;

        width: 100%;
        height: 450px;

    }

    .title{
        padding: 15px;
        color: var(--text-color);
        font-size: 2em;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        width: 90%;
        text-align: center;

        border-bottom: 2px solid var(--first-color);
        border-radius: 0.5em 0.5em 0 0;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;

        width: 95%;


    }

    .text-fields{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        width: 95%;
        gap: 1.5em;
    }

    .field{
        width: 100%;
        
    }

    .field .v-input__control {
        width: 100%;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);
        
    }

    .register-label{
        color: var(--text-color);
        font-size: smaller;

        position: relative;
        bottom: 1em;
        left: 1em;
    }

    .register-button{
        color: var(--first-accent-color);
        font-weight: bold;
    }

    .footer{
        display: flex;
        align-items: center;
        justify-content: space-between;

        height: 5em;
        width: 100%;
        gap: 1em;

    }


    .view-details-arrow {
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .6));
        color: var(--first-accent-color);

    }

    .view-details-arrow:hover {
        color: var(--second-accent-color);

    }

    @media (max-width: 530px) {

        .log-in-container {

            gap: 2em;
        }

        .title {
            font-size: xx-large;

            width: 100%;
        }

        .footer{
            height: 2.5em;
            justify-content: center;
            gap: 1em;

            position: relative;
            top: 1em;
        }

        .register-label{
            position: relative;
            bottom: 0;
        }

        .register-button{
            position: relative;
            top: 0;
            right: 0;

        }
    }


</style>