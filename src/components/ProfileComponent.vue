<template>
    <main class="ProfileComponent">
        <article v-if="editableProfile" class="profile-card">
            <section class="picture-file">
                <figure class="profile-picture-container">
                    <img class="profile-picture" :src="editableProfile.profilePictureURL" alt="">
                </figure>
            </section>

            <section class="username">
                <label class="label">Nombre</label>
                <v-text-field 
                    class="field"
                    v-model=editableProfile.username
                    color="var(--first-color)"
                    bg-color="var(--fourth-color)"
                    variant="solo-filled"
                    density="comfortable"
                    :disabled="!isEditable"
                ></v-text-field>
            </section>

            <section class="email-phone">
                <section class="email">
                    <label class="label">Email</label>
                    <v-text-field 
                        class="field"
                        v-model=editableProfile.email
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        :disabled="!isEditable"
                    ></v-text-field>
                </section>

                <section v-if="editableProfile.phone" class="phone">
                    <label class="label">Teléfono</label>
                    <v-text-field 
                        class="field"
                        v-model=editableProfile.phone
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        :disabled="!isEditable"
                    ></v-text-field>
                </section>
            </section>

            <section class="region-province">
                <section v-if="editableProfile.region" class="region">
                    <label class="label">Comunidad</label>
                    <v-text-field 
                        class="field"
                        v-model=editableProfile.region
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        :disabled="!isEditable"
                    ></v-text-field>
                </section>

                <section v-if="editableProfile.province" class="province">
                    <label class="label">Provincia</label>
                    <v-text-field 
                        class="field"
                        v-model=editableProfile.province
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        :disabled="!isEditable"
                    ></v-text-field>
                </section>
            </section>

            <section class="municipality-province">
                <section v-if="editableProfile.municipality" class="municipality">
                    <label class="label">Población</label>
                    <v-text-field 
                        class="field"
                        v-model=editableProfile.municipality
                        color="var(--first-color)"
                        bg-color="var(--fourth-color)"
                        variant="solo-filled"
                        density="comfortable"
                        :disabled="!isEditable"
                    ></v-text-field>
                </section>
                <button class="update-button" @click="toggleEditable">{{ isEditable ? 'Guardar' : 'Actualizar perfil' }}</button>
            </section>
        </article>
    </main>
</template>

<script setup lang="ts">
import { UserDetails } from '@/interfaces/user';
import { Ref, ref, watch } from 'vue';

    const emit = defineEmits<{
        (e: 'updateUserInfo', userUpdatedInfo: UserDetails): void;
        (e: 'restartSuccess', success: boolean): void;
    }>()

    const props = defineProps<{
        userProfile : UserDetails | null,
        success? : boolean
    }>();

    var editableProfile : Ref<UserDetails | null> = ref(null)

    watch(
        () => props.userProfile,
        (newVal) => {
            if (newVal) {
                editableProfile.value = { ...newVal }
            }
        },
        { immediate: true }
    )

    watch(
        () => props.success,
        (newVal) => {
            if (newVal) {
                isEditable.value = false
                emit('restartSuccess', false)
            }
        },
        { immediate: true }
    )

    const isEditable = ref(false)

    function toggleEditable() : void {
        if (isEditable.value && editableProfile.value) {
            emit('updateUserInfo', editableProfile.value)
            
        } else if (!isEditable.value){
            isEditable.value = true
        }
    }

</script>

<style scoped lang="css">

    .ProfileComponent {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        padding-top: 8em;

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
        justify-content: center;
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

    .email, .phone, .region, .province, .municipality {
        width: 100%;

    }

    .username{
        padding: 0 2em 0 2em;
        width: 100%;
    }

    .email-phone, .region-province, .municipality-province {
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

    .update-button {
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

    .update-button:hover {
        background-color: var(--second-accent-color);
    }

    @media (max-width: 1220px){
        .ProfileComponent {
            padding: 5em 0 5em 0;
        }

        .profile-card {
            width: 60%;

        }

    }

    @media (max-width: 660px){
        .profile-card {
            width: 60%;

        }

        .email-phone, .region-province, .municipality-province {
            flex-direction: column;
            gap: 0em
        }

        .update-button{
            width: 10em;
        }
    }

</style>