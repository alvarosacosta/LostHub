<template>
    <main class="ProfileComponent">
        <button v-if="isForeignUser" class='back-button' @click="$router.back()"> Volver </button>
        <v-form ref="formRef" v-if="profileShown" @submit.prevent="onSubmit" class="profile-card" v-slot="{ isValid }">
            <section class="picture-file">
                <figure class="profile-picture-container">
                    <img class="profile-picture" :src="profileShown.profilePictureURL" alt="">
                </figure>
                <button v-if="!isForeignUser" type="button" class="log-out-button" @click="logOut()">Cerrar Sesión</button>
            </section>

            <section class="username">
                <label class="label">Nombre</label>
                <v-text-field 
                    class="field"
                    v-model=profileShown.username
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    variant="solo-filled"
                    density="comfortable"
                    :rules="usernameRules"
                    :disabled="!isEditable"
                    required
                ></v-text-field>
            </section>

            <section class="email-phone">
                <section class="email">
                    <label class="label">Email</label>
                    <v-text-field 
                        class="field"
                        v-model=profileShown.email
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        :rules="emailRules"
                        disabled
                        required
                    ></v-text-field>
                </section>

                <section v-if="isEditable || profileShown.phone" class="phone">
                    <label class="label">Teléfono</label>
                    <v-text-field 
                        class="field"
                        v-model=profileShown.phone
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        :rules="phoneRules"
                        :disabled="!isEditable"
                    ></v-text-field>
                </section>
            </section>

            <section class="region-province">
                <section v-if="isEditable || profileShown.region" class="region">
                    <label class="label">Comunidad</label>
                    <v-autocomplete  
                        class="field"
                        v-model=selectedRegion
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        item-title="label"
                        item-value="code"
                        :items="regions"
                        clearable
                        @update:modelValue="onRegionChange()"
                        :disabled="!isEditable"
                    ></v-autocomplete>
                </section>

                <section v-if="isEditable || profileShown.province" class="province">
                    <label class="label">Provincia</label>
                    <v-autocomplete  
                        class="field"
                        v-model=selectedProvince
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        item-title="label"
                        item-value="code"
                        clearable
                        :items="filteredProvinces"
                        @update:modelValue="onProvinceChange()"
                        :disabled="!isEditable || !selectedRegion"
                    ></v-autocomplete>
                </section>
            </section>

            <section class="municipality-update-button">
                <section v-if="isEditable || profileShown.municipality" class="municipality">
                    <label class="label">Población</label>
                    <v-autocomplete 
                        class="field"
                        v-model=selectedMunicipality
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        clearable
                        item-title="label"
                        :items="filteredMunicipalities"
                        :disabled="!isEditable || !selectedProvince"
                    ></v-autocomplete>
                </section>
                
                <section class="privacy-options">
                    <v-switch
                        v-if="!isForeignUser"
                        class="field"
                        v-model=profileShown.isPublic
                        label='¿Compartir tus datos?'
                        append-icon="mdi-information-outline"
                        @click:append="showInfoDialog = true"
                        color="var(--first-accent-color)"
                        :disabled="!isEditable"
                    ></v-switch>

                    <v-dialog v-model="showInfoDialog" max-width="450" max-height="600" scroll-strategy="close">
                        <template v-slot>
                            <section class="info-dialog">
                                <v-icon color="var(--first-color)">mdi-penguin</v-icon>
                                <p class="info">
                                    Si no accedes a compartir tus datos
                                    no se mostrará a otros usuarios tu correo, teléfono y ubicación. 
                                    Pero si podrán ver tu foto de perfil y tu nombre de usuario.
                                </p>
                                <br>
                                <p class="info">
                                    Tus datos podrán ser consultados por administradores de igual manera 
                                    si fuera necesario, pero no serán públicos.
                                </p>
                            </section>
                        </template>
                    </v-dialog>
                </section>

            </section>
            <button v-if="!isForeignUser" type="submit" class="update-button">{{ isEditable ? 'Guardar' : 'Actualizar perfil' }}</button>
        </v-form>
    </main>
</template>

<script setup lang="ts">
import { UserDetails } from '@/interfaces/user';
import { computed, Ref, ref, watch } from 'vue';
import regions from '@/json/ccaa.json';
import provinces from '@/json/provincias.json';
import municipalities from '@/json/poblaciones.json';
import isEqual from 'lodash/isEqual';

    const emit = defineEmits<{
        (e: 'updateUserInfo', userUpdatedInfo: UserDetails): void;
        (e: 'update:success', success: boolean): void;
        (e: 'failure', error: string): void;
        (e: 'logOut'): void;

    }>()

    const props = defineProps<{
        userProfile : UserDetails | null,
        foreignUserProfile : UserDetails | null,
        success? : boolean
    }>();

    var profileShown : Ref<UserDetails | null> = ref(null)
    var isForeignUser : Ref<boolean> = ref(false)
    const selectedRegion = ref<string | undefined>(undefined)
    const selectedProvince = ref<string | undefined>(undefined)
    const selectedMunicipality = ref<string | undefined>(undefined)
    const showInfoDialog : Ref<boolean> = ref(false)

    watch(
        () => [props.userProfile, props.foreignUserProfile],
        ([valUserProfile, valForeignUser]) => { 
            if (valForeignUser) {
                profileShown.value = { ...valForeignUser };
                selectedRegion.value = regions.find(r => r.label === valForeignUser.region)?.code;
                selectedProvince.value = provinces.find(p => p.label === valForeignUser.province)?.code;
                selectedMunicipality.value = valForeignUser.municipality;

                isForeignUser.value = true
            } else if (valUserProfile) {
                profileShown.value = { ...valUserProfile };
                selectedRegion.value = regions.find(r => r.label === valUserProfile.region)?.code;
                selectedProvince.value = provinces.find(p => p.label === valUserProfile.province)?.code;
                selectedMunicipality.value = valUserProfile.municipality;
                isForeignUser.value = false
            }
        },
        { immediate: true }
    );

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

    const isEditable : Ref<boolean> = ref(false)
    
    const formRef = ref()
    async function onSubmit() : Promise<void> {
        
        if (isEditable.value){
            const { valid } = await formRef.value.validate()
            if (!valid) {
                emit('failure', 'Actualización fallida. Asegúrate de que los datos sean válidos.');
                return;
            }

            if (profileShown.value && props.userProfile) {
                const selectedRegionLabel = regions.find(r => r.code === selectedRegion.value)?.label || ''
                const selectedProvinceLabel = provinces.find(p => p.code === selectedProvince.value)?.label || ''

                if (selectedRegionLabel) {
                    profileShown.value = {
                        ...profileShown.value,
                        region: selectedRegionLabel,
                        province: selectedProvinceLabel,
                        municipality: selectedMunicipality.value ?? '',
                    }
                }

                if(!isEqual(props.userProfile, profileShown.value)){
                    emit('updateUserInfo', profileShown.value)

                } else {
                    toggleEditable()
                }
            }

        } else {
            toggleEditable()
        }
        
    }

    function logOut() : void {
        emit("logOut")
    }

    function toggleEditable() : void {
        isEditable.value = !isEditable.value
    }

    watch(
        () => props.success,
        (newVal) => {
            if (newVal) {
                isEditable.value = false
                emit('update:success', false)
            }
        },
        { immediate: true }
    )

</script>

<style scoped lang="css">

    .ProfileComponent {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;

        opacity: 0;
        animation: aparecer 1s forwards;

        color: var(--text-color);
    }

    .profile-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 40%;

        border-radius: 1em;
        border: 3px solid var(--first-color);
        background-color: var(--third-color);
        box-shadow: 0px 0px 11px rgba(0, 0, 0, .9);

        padding-bottom: 1.5em;

    }

    .picture-file{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 100%;
        margin-bottom: 1em;

        background-color: var(--second-color);
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 1);
        border-radius: 1em 1em 0 0;

    }

    .profile-picture-container {
        width: 150px;
        height: 150px;

        overflow: visible;
        position: relative;
        margin: 1em 0 1em 0;
        
    }

    .profile-picture {
        width: 100%;
        height: 100%;
        border-radius: 10em;
        object-fit:cover;

        border: 2px solid var(--fourth-color);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, .8);

        margin-bottom: 20px;
    }

    .email, .phone, .region, .province, .municipality, .privacy-options {
        width: 100%;

    }

    .privacy-options{
        position: relative;
        top: .6em;
    }

    .username{
        padding: 0 2em 0 2em;
        width: 100%;
    }

    .email-phone, .region-province, .municipality-update-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;
        width: 100%;
        
        padding: 0 2em 0 2em;
    }

    .field{
        white-space: normal;
        overflow-wrap: break-word;
        word-break: break-word; 

    }

    .update-button, .log-out-button {
        text-decoration: none;
        background-color: var(--first-accent-color);
        color: inherit;

        padding: 5px;
        cursor: pointer;
        text-align: center;

        border-radius: 5px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 1);

        width: 15em;
        height: 3em;
    }

    .log-out-button {
        width: 10em;
    }

    .update-button:hover, .log-out-button:hover {
        background-color: var(--second-accent-color);
    }

    .info{
        text-align: justify;
    }

    @media (max-width: 1220px){
        .ProfileComponent {
            padding: 5em 0 5em 0;

            height: auto;
        }

        .profile-card {
            width: 60%;

        }
    }

    @media (max-width: 660px){
        .profile-card {
            width: 60%;

        }

        .email-phone, .region-province, .municipality-update-button {
            flex-direction: column;
            gap: 0em
        }

        .update-button{
            width: 10em;
        }

        .update-button{
            margin-top: 1em;
        }

        .picture-file{
            flex-direction: column;
            padding-bottom: 1em;
        }

    }

</style>