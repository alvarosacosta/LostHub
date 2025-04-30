
<template>
    <main class="SignUpComponent">
        <button class='back-button' @click="$router.back()"> Volver </button>
        <article class="form">
            <section class="title-container">
                <h1 class="title">{{ currentTitle }}</h1>
                <span class="step-number">{{ step }}</span>
            </section>

            <section class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
            </section>

            <v-window class="window" v-model="step" :touch="false" >
                <v-window-item :value="1">
                    <v-form class="window-step" ref="firstForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
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

                            </article>
                        </section>
                    </v-form>
                </v-window-item>

                <v-window-item :value="2">
                    <v-form class="window-step" ref="secondForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
                        <section class="password-section">
                            <v-text-field
                                class="password field"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="comfortable"
                                v-model="password"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword"
                                :rules="passwordRules"
                                label="Contraseña *"
                                variant="solo-filled"
                                required
                            ></v-text-field>
        
                            <v-text-field
                                class="confirm-password field"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="comfortable"
                                v-model="confirmPassword"
                                :type="showPassword ? 'text' : 'password'"
                                :rules="confirmPasswordRules"
                                label="Confirmar contraseña  *"
                                variant="solo-filled"
                                required
                            ></v-text-field>
                        </section>
                    </v-form>
                </v-window-item>

                <v-window-item :value="3">
                    <v-form class="window-step" ref="thirdForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
                        <section class="location">
                            <v-autocomplete
                                class="region field "
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="comfortable"
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
                                density="comfortable"
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
                        
                            <v-autocomplete
                                class="municipality field"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                density="comfortable"
                                v-model="selectedMunicipality"
                                :items="filteredMunicipalities"
                                :disabled="!selectedProvince"
                                item-title="label"
                                label="Población"
                                variant="solo-filled"
                                clearable
                            />

                            
                        </section>
                    </v-form>
                </v-window-item>

                <v-window-item :value="4">
                    <v-form class="window-step" ref="fourthForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
                        <section class="final-data">
                            <v-switch
                                v-model="isPublicProfile"
                                label='¿Compartir datos con otros usuarios?'
                                append-icon="mdi-information-outline"
                                @click:append="showInfoDialog = true"
                                color="var(--first-accent-color)"
                                
                            >
                            </v-switch>

                            <v-dialog v-model="showInfoDialog" max-width="450" max-height="600" scroll-strategy="close">
                                <template v-slot>
                                    <section class="info-dialog">
                                        <p class="info">
                                            Si no accedes a compartir tus datos
                                            no se mostrará a otros usuarios tu correo, teléfono y ubicación. 
                                            Pero si podrán ver tu foto de perfil y tu nombre de usuario.
                                        </p>
                                        <p class="info">
                                            Tus datos podrán ser consultados por administradores de igual manera 
                                            si fuera necesario, pero no serán públicos.
                                        </p>
                                    </section>
                                </template>
                            </v-dialog>
    
                            <v-switch
                                :rules="dataLaw"
                                required
                                color="var(--first-accent-color)"
                            >
                                <template v-slot:label>
                                    ¿Aceptas la&nbsp;<a class="data-law" href="https://www.aepd.es/" target="_blank">ley de protección de datos</a>? *
                                </template>
                            </v-switch>
                        </section>
                    </v-form>
                </v-window-item>
            </v-window>

            <v-card-actions>
                <v-icon v-if="step > 1" class="arrow" @click="step--" size="90">mdi-arrow-left-thick</v-icon>

                <v-spacer></v-spacer>

                <v-icon class="arrow" @click="onSubmit" size="90">mdi-arrow-right-thick</v-icon>
            </v-card-actions>
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
        (e: 'failure', error: string): void
    }>()

    const email : Ref<string> = ref('');
    const password : Ref<string> = ref('');
    const confirmPassword : Ref<string> = ref('');
    const username : Ref<string> = ref('');
    const phone : Ref<string> = ref('');
    const isPublicProfile : Ref<boolean> = ref(false);

    const profilePicture = ref<File | undefined>(undefined)
    const previewUrl = ref<string>('')

    const selectedRegion = ref<string | undefined>(undefined)
    const selectedProvince = ref<string | undefined>(undefined)
    const selectedMunicipality = ref<string | undefined>(undefined)

    const showInfoDialog : Ref<boolean> = ref(false)
    const showPassword : Ref<boolean> = ref(false);

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

        (value: string) => {
            if (value.length >= 6) return true
            return 'Debe tener mínimo 6 caractéres.'
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

    const dataLaw = [
        (value: string) => {
            if (value) return true
            return 'Debes leer y aceptar la ley de protección de datos.'
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
    
    var step : Ref<number> = ref(1)
    const currentTitle = computed(() => {
        switch (step.value) {
            case 1: return '¡Bienvenido!'
            case 2: return 'Introduce una contraseña'
            case 3: return 'Especifica tu ubicación'
            case 4: return 'Datos finales'
            default: return ''
        }
    })

    const totalSteps = 4
    const progressWidth = computed(() => {
        return (step.value / totalSteps) * 100
    })

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

    const firstForm = ref()
    const secondForm = ref()
    const thirdForm = ref()
    const fourthForm = ref()

    async function onSubmit() : Promise<void> {
        switch (step.value) {
            case 1:
                var { valid } = await firstForm.value.validate()
                break;

            case 2:
                var { valid } = await secondForm.value.validate()
                break;

            case 3:
                var { valid } = await thirdForm.value.validate()
                break;

            case 4:
                var { valid } = await fourthForm.value.validate()
                if (!valid) {
                    break;
                }

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
                    isPublic: isPublicProfile.value
                }

                const userImage: UserProfileImage = {
                    profilePicture: profilePicture.value,
                }

                emit('signUp', user, userDetails, userImage);
                break;

            default:
                break;
        }

        if (!valid) {
            emit('failure', 'Hay campos incompletos o mal rellenados.');
            return;

        } else if (step.value < 4) {
            step.value++;
        }
    };

</script>

<style scoped lang="css">
    .SignUpComponent {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;

        opacity: 0;
        animation: aparecer 1s forwards;
    }

    .upper-right {
        display: flex;

        gap: 2em;
        width: 85%;

        padding-top: 1em;
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
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 1.5em;

    }

    .password-section{
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;

        width: 50%;
        gap: 1em;
    }

    .profile-picture-input{
        align-self: center;
        cursor: pointer;

        width: 95%;
    }

    .location {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;

        width: 85%;
        gap: 1em;
    }

    .form {
        background-color: var(--third-color);
        color: var(--text-color);

        box-shadow: 0px 0px 11px rgba(0, 0, 0, .9);
        width: 100%;
        max-width: 1000px;
        display: flex;
        flex-direction: column;

        border-radius: 1.2em;
        border: 3px solid var(--first-color);

        margin: 1em;
    }

    .title-container {
        background-color: var(--second-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;

        border-radius: 1em 1em 0 0;
    }

    .title, .step-number {
        font-size: 22px;
        font-weight: 600;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .progress-bar-container {
        width: 100%;
        height: 5px;
        background-color: var(--fourth-color);
        overflow: hidden;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 1);
    }

    .progress-bar {
        height: 100%;
        background-color: var(--first-color);
        transition: width 0.3s ease;
    }

    .window-step {
        padding: 32px 24px 32px 24px;
        min-height: 350px;

        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        gap: .5em;
    }

    .field {
        width: 95%;
    }

    .data-law{
        color: var(--first-accent-color);
    }

    .info-dialog{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        background-color: var(--second-color);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 1);
        color: var(--text-color);
        border-radius: 1em;
        border: 3px solid var(--first-color);
        font-family: var(--font-poppins);
        padding: 24px;
        gap: 1em;
    }

    .info{
        text-align: justify;
    }

    .v-card-actions {
        background-color: var(--second-color);
        box-shadow: 0px -2px 2px rgba(0, 0, 0, 1);
        display: flex;
        align-items: center;
        padding: 12px 24px;

        border-radius: 0 0 1em 1em;
    }

    .arrow {
        filter: drop-shadow(4px 4px 2px rgba(0, 0, 0, .6));
        color: var(--first-accent-color);

        position: relative;
    }

    .arrow:hover {
        color: var(--second-accent-color);
        transform: scale(1.2);

    }

</style>