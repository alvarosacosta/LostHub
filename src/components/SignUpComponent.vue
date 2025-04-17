
<template>
    <main class="SignUpComponent">
        <button class='back-button' @click="$router.back()"> Volver </button>
        <article class="sign-in-container">
            <h1 class="title">¡Bienvenido! Regístrate aquí.</h1>

            <form class="form" @submit.prevent="onSubmit">
                <article class="text-fields">
                    <section class="upper-right">

                        <article class="image-container">
                            <figure class="preview-container">
                                <img :src="previewUrl ? previewUrl : noImage" alt="Preview" class="profile-preview" />
                            </figure>
    
                            <v-file-input
                                class="profile-picture-input field"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                label="Foto de perfil"
                                accept="image/*"
                                :rules="fileSizeRule"
                                v-model="profilePicture"
                                density="comfortable"
                                prepend-icon="mdi-camera"
                                variant="solo-filled"
                                truncate-length="0"
                                clearable
                            >
                                <template v-slot:selection>
                                    <span class="text-in-file-input">¡Listo!</span>
                                </template>
                            </v-file-input>
                        </article>
                        
                        <article class="basic-information">
                            <v-text-field
                                class="name field"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                v-model="username"
                                :rules="usernameRules"
                                label="Nombre *"
                                variant="solo-filled"
                                required
                            ></v-text-field>
                            
                            <v-text-field
                                class="email field"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                v-model="email"
                                :rules="emailRules"
                                label="E-mail *"
                                variant="solo-filled"
                                required
                            ></v-text-field>

                            <v-text-field
                                class="phone field"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                v-model="phone"
                                :rules="phoneRules"
                                label="Teléfono"
                                variant="solo-filled"
                            ></v-text-field>

                            <p class="sign-in-label" >¿Ya tienes una cuenta? <router-link class="sign-in-button" to="/">Inicia sesión</router-link> </p>

                        </article>
                    </section>
                    
                    <section class="password-section">
                        <v-text-field
                            class="password field"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            :prepend-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            @click:prepend="showPassword = !showPassword"
                            :rules="passwordRules"
                            label="Contraseña *"
                            variant="solo-filled"
                            required
                        ></v-text-field>
    
                        <v-text-field
                            class="confirm-password field"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            v-model="confirmPassword"
                            :type="showPassword ? 'text' : 'password'"
                            :rules="confirmPasswordRules"
                            label="Confirmar contraseña  *"
                            variant="solo-filled"
                            required
                        ></v-text-field>
                    </section>

                    <section class="region-province">
                        <v-autocomplete
                            class="region field "
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            v-model="selectedRegion"
    
                            :items="regions"
                            item-title="label"
                            item-value="code"
                            label="Comunidad Autónoma"
                            variant="solo-filled"
                            @update:modelValue="onRegionChange()"
                            clearable
                        />
    
                        <v-autocomplete
                            class="province field "
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            v-model="selectedProvince"
                            :items="filteredProvinces"
                            item-title="label"
                            item-value="code"
                            label="Provincia"
                            variant="solo-filled"
                            :disabled="!selectedRegion"
                            @update:modelValue="onProvinceChange()"
                            clearable
                        />
                    </section>
                    
                    <section class="municipality-arrow">
                        <v-autocomplete
                            class="municipality field"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            v-model="selectedMunicipality"
                            :items="filteredMunicipalities"
                            :disabled="!selectedProvince"
                            item-title="label"
                            label="Población"
                            variant="solo-filled"
                            clearable
                        />
                        <button class="submit-button"><v-icon class="view-details-arrow" size="100">mdi-arrow-right-thick</v-icon></button>
                    </section>
                </article>
            </form>
        </article>
    </main>
</template>
  
<script setup lang="ts">
import { computed, ref, Ref, watch } from 'vue';
import noImage from '@/assets/no-image.png';
import regions from '@/json/ccaa.json';
import provinces from '@/json/provincias.json';
import municipalities from '@/json/poblaciones.json';
import { User, UserDetails, UserProfileImage } from '@/interfaces/user';

    const emit = defineEmits<{
        (e: 'signUp', user: User, userDetails: UserDetails, userImage: UserProfileImage): void
    }>()

    const email : Ref<string> = ref('');
    const password : Ref<string> = ref('');
    const confirmPassword : Ref<string> = ref('');
    const username : Ref<string> = ref('');
    const phone : Ref<string> = ref('');
    const showPassword : Ref<boolean> = ref(false);

    const profilePicture = ref<File | undefined>(undefined)
    const previewUrl = ref<string>('')

    const selectedRegion = ref<string | undefined>(undefined)
    const selectedProvince = ref<string | undefined>(undefined)
    const selectedMunicipality = ref<string | undefined>(undefined)

    const usernameRules = [
        (value: string) => {
            if (value) return true
            return 'El nombre es obligatorio.'
        },

        (value: string) => {
            if (value?.length <= 10) return true
            return 'El nombre debe de tener menos de 10 carácteres.'
        },
    ]

    const passwordRules = [
        (value: string) => {
            if (value) return true
            return 'La contraseña es obligatoria.'
        },
    ]

    const confirmPasswordRules = [
        (value: string) => {
            if (value) return true
            return 'La contraseña es obligatoria.'
        },

        (value: string) => {
            if (value === password.value) return true;
            return 'Las contraseñas deben coincidir.'
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
    
    const phoneRules = [
        (value: string) => {
            if (!value) return true
            if (!/^(?:\+34)?[6-9]\d{8}$/.test(value)) {
                return 'Debe ser un teléfono válido.';
            }
                return true;
        },
    ]

    const fileSizeRule = [
        (value: File | undefined) => {
            if (!value) return true
            if (value.size > 5 * 1024 * 1024) {
                return 'El archivo no debe pesar más de 5MB.'
            }
            return true;
        }
    ]

    watch(profilePicture, (newFile) => {
        if (newFile) {
            previewUrl.value = URL.createObjectURL(newFile)
        } else {
            previewUrl.value = ''
        }
    })

    const filteredProvinces = computed(() =>
        provinces.filter(p => p.parent_code === selectedRegion.value)
    )

    const filteredMunicipalities = computed(() =>
        municipalities.filter(m => m.parent_code === selectedProvince.value)
    )

    function onRegionChange() : void {
        selectedProvince.value = undefined
        selectedMunicipality.value = undefined
    }

    function onProvinceChange() : void {
        selectedMunicipality.value = undefined
    }

    function onSubmit() : void {
        const user: User = {
            email: email.value,
            password: password.value,
        }

        const selectedRegionLabel = regions.find(r => r.code === selectedRegion.value)?.label || ''
        const selectedProvinceLabel = provinces.find(p => p.code === selectedProvince.value)?.label || ''

        const userDetails: UserDetails = {
            username: username.value,
            email: email.value,
            phone: phone.value,
            region: selectedRegionLabel,
            province: selectedProvinceLabel,
            municipality: selectedMunicipality.value ?? '',
        }

        const userImage: UserProfileImage = {
            profilePicture: profilePicture.value,
        }

        emit('signUp', user, userDetails, userImage);
    };

</script>

<style scoped lang="css">
    .SignUpComponent {
        display: flex;
        justify-content: center;

        padding-top: 2em;

        width: 100%;
        height: auto;

        opacity: 0;
        animation: aparecer 1s forwards;
    }

    .sign-in-container {
        font-family: var(--font-poppins);

        background-color: var(--third-color);
        border: 3px solid var(--first-color);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
        border-radius: 1em;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 1em;
        padding: 2em 1em 3em 1em;
        margin: 2em;

        width: 55em;
        height: auto;

    }

    .title{
        color: var(--text-color);
        font-size: 2em;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

        text-align: center;

        border-bottom: 2px solid var(--first-color);
        border-radius: 0.5em 0.5em 0 0;

        margin-bottom: 1em;
    }

    .form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        width: 95%;
    }

    .text-fields{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;

        width: 95%;
        gap: 1em;
    }

    .upper-right {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        width: 100%;
    }

    .image-container{
        display: flex;
        justify-self: center;
        flex-direction: column;
        gap: 1em;

        width: 14em;

    }

    .preview-container{
        width: 14em;
        height: 13em;

        overflow: visible;
        position: relative;

    }

    .profile-preview {
        width: 100%;
        height: 100%;
        object-fit:cover;

        border: 3px solid var(--first-color);
        border-radius: .5em;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);
    }

    .basic-information{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 1em;
        gap: 1em;
    }

    .password-section{
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        gap: 1em;
    }

    .field{
        width: 100%;
    }

    .profile-picture-input{
        align-self: center;
        cursor: pointer;

        width: 95%;
    }

    .sign-in-label{
        color: var(--text-color);
        font-size: smaller;

        position: relative;
        bottom: 1.5em;
    }

    .sign-in-button{
        color: var(--first-accent-color);
        font-weight: bold;
    }

    .region-province {
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;
        gap: 1em;
    }

    .municipality-arrow{
        display: flex;

        width: 100%;
        height: 5em;
        gap: 1em;
    }

    .view-details-arrow {
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .6));
        color: var(--first-accent-color);

        position: relative;
        bottom: 12px;
    }

    .view-details-arrow:hover {
        color: var(--second-accent-color);

    }

    @media (max-width: 885px) {
        .upper-right {
            grid-template-columns: auto;
            grid-template-rows: auto 300px;
        }

        .preview-container{
            display: flex;
            align-self: center;
            justify-self: center;
        }

    }

    @media (max-width: 690px) {
        .password-section{
            flex-direction: column;
        }

        .text-fields{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;

            width: 95%;
            gap: 1em;
        }

        .municipality-arrow{
            height: auto;
        }

        .municipality-arrow, .region-province {
            flex-direction: column;
            align-items: center;
            justify-content: center;

            gap: 1em;
        }

    }

</style>