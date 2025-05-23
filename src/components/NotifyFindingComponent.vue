<template>
    <main class="NotifyFindingComponent">
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
                        <span class="map-tooltip">Haz click para marcar una ubicación</span>
                        <div id="map"></div>

                        <v-text-field
                            class="field under-map"
                            style="pointer-events: none;"
                            v-model=location
                            :rules="requiredField"
                            placeholder="Ubicación"
                            label="Ubicación"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            readonly
                            required
                        ></v-text-field>
                    </v-form>
                </v-window-item>

                <v-window-item :value="2">
                    <v-form class="window-step" ref="secondForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
                        <section class="datetime">
                            <v-text-field
                                v-model="displayDate"
                                label="Fecha(s) *"
                                :rules="requiredField"
                                required
                                readonly
                                @click="menu = true"
                                variant="solo-filled"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                prepend-icon="mdi-calendar"
                            >
                                <v-menu
                                    v-model="menu"
                                    activator="parent"
                                    transition="scale-transition"
                                    :close-on-content-click="false"
                                >
                                    <v-date-picker
                                        v-model="date"
                                        multiple
                                        :max="maxDate"
                                        @update:model-value="updateDisplay"
                                        hide-header
                                        hide-actions
                                        show-adjacent-months
                                        variant="solo-filled"
                                        bg-color="var(--fourth-color)"
                                    />
                                </v-menu>
                            </v-text-field>
                        </section>

                        <section class="time-container">
                            <v-text-field 
                                class="time"    
                                v-model="time"
                                label="Hora" 
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                type="time"
                                prepend-icon="mdi-clock-time-four-outline"
                                clearable

                            ></v-text-field>
                        </section>
                    </v-form>
                </v-window-item>

                <v-window-item :value="3">
                    <v-form class="window-step" ref="thirdForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
                        <section class="delivery-options">
                            <v-switch
                                class="field deliverySwitch"
                                v-model=itemDelivered
                                label="El objeto ha sido entregado en alguna oficina/dependencia"
                                color="var(--first-accent-color)"
                                required
                            ></v-switch>

                            <v-text-field
                                v-if="itemDelivered"
                                class="field deliveryLocation"
                                v-model=deliveryLocation
                                :rules="requiredField"
                                placeholder="Ubicación de entrega *"
                                label="Ubicación donde se ha entregado el objeto *"
                                color="var(--first-color)"
                                bg-color="var(--fourth-color)"
                                variant="solo-filled"
                                density="comfortable"
                                required
                            ></v-text-field>
                        </section>

                        <v-textarea
                            class="field"
                            v-model=message
                            placeholder="Mensaje opcional / Datos adicionales"
                            label="Mensaje opcional / Datos adicionales"
                            color="var(--first-color)"
                            bg-color="var(--fourth-color)"
                            variant="solo-filled"
                            density="comfortable"
                            required
                        ></v-textarea>

                    </v-form>
                </v-window-item>

                <v-window-item :value="4">
                    <v-form class="window-step" ref="fourthForm" @submit.prevent="onSubmit" v-slot="{ isValid }">
                        <section class="email-phone">
                            <p class="email-phone-text">Debes especificar al menos un método de contacto:</p>
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
                                label="Teléfono *"
                                variant="solo-filled"
                                required
                            ></v-text-field>
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
import { computed, Ref, ref, watch, nextTick, onMounted } from 'vue'
import { ItemFoundNotification } from '@/interfaces/notifications';
import { UserDetails } from '@/interfaces/user';
import { MixedItem } from '@/interfaces/items';
import { storeToRefs } from 'pinia';
import { useLeafletStore } from '@/stores/LeafletStore';

    const props = defineProps<{
        item: MixedItem | undefined
        sender: UserDetails | null
        receiver: UserDetails | null
    }>()

    const date = ref([])
    const maxDate = new Date();
    const menu : Ref<boolean> = ref(false)
    const formatDate = (d: string | number | Date) => new Date(d).toLocaleDateString('es-ES')
    function updateDisplay(val: (string | number | Date)[]) {
        displayDate.value = val.map(formatDate).join(' ')
    }

    const time = ref()
    const displayDate : Ref<string> = ref('')

    const itemDelivered : Ref<boolean> = ref(false)
    const deliveryLocation : Ref<string> = ref('');

    const message : Ref<string> = ref('');

    const phone : Ref<string> = ref('');
    const email : Ref<string> = ref('');
    
    const emit = defineEmits<{
        (e: 'success', notification: ItemFoundNotification): void
        (e: 'failure', error: string): void
    }>()
        
    var step : Ref<number> = ref(1)
    const currentTitle = computed(() => {
        switch (step.value) {
            case 1: return '¿Dónde lo encontraste?'
            case 2: return '¿Cuándo lo encontraste?'
            case 3: return 'Datos del objeto'
            case 4: return 'Datos de contacto'
            default: return ''
        }
    })

    var totalSteps = 0
    if(props.sender?.isPublic){
        totalSteps = 3

    } else {
        totalSteps = 4
    }

    const progressWidth = computed(() => {
        return (step.value / totalSteps) * 100
    })

    onMounted(() => {
        LeafletStore.cleanVariables();
    });

    const LeafletStore = useLeafletStore()
    const {location, latLng} = storeToRefs(LeafletStore)

    watch(step, async (newStep) => {
        if (newStep === 1) {
            await nextTick();
            LeafletStore.initInteractuableMapWithUserLocation('map');
        }
    }, { immediate: true });

    const requiredField = [
        (value: string) => {
            if (value) return true
            return 'Campo obligatorio.'
        }
    ]

    const emailRules = [
        (value: string) => {
            if (phone.value || value) return true;  
            return 'Debe proporcionar al menos un email o un teléfono.';  
        },
        (value: string) => {
            if (!value) return true;  
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;  
            return emailRegex.test(value) || 'Debe ser un email válido.';  
        },
    ];

    const phoneRules = [
        (value: string) => {
            if (email.value || value) return true;  
            return 'Debe proporcionar al menos un email o un teléfono.';  
        },
        (value: string) => {
            if (!value) return true;
            const phoneRegex = /^(?:\+34)?[6-9]\d{8}$/;  
            return phoneRegex.test(value) || 'Debe ser un teléfono válido.'; 
        },
    ];
    
    const firstForm = ref()
    const secondForm = ref()
    const thirdForm = ref()
    const fourthForm = ref()

    async function onSubmit() {

        switch (step.value) {
            case 1:
                var { valid } = await firstForm.value.validate()

                break;

            case 2:
                var { valid } = await secondForm.value.validate()

                break;

            case 3:
                var { valid } = await thirdForm.value.validate()
                if (!valid) {
                    break;
                }

                if(!props.sender?.isPublic){
                    break;
                }

                sendNotification()
                break;

            case 4:
                var { valid } = await fourthForm.value.validate()
                if (!valid) {
                    break;
                }

                sendNotification()
                break;

            default:
                break;
        }

        if (!valid) {
            emit('failure', 'Hay campos incompletos o mal rellenados.');
            return;

        } else if (step.value > 3) {
            return;
    
        } else if (step.value < 3 || !props.sender?.isPublic) {
            step.value++;
        } 

    }

    function sendNotification() : void {
        var notification : ItemFoundNotification

        if(props.sender?.isPublic) {
            notification = {
                itemID: props.item?.id!,
                itemName: props.item?.name!,
                senderID: props.sender?.id || 'not-logged-user',
                receiverID: props.receiver?.id || '',
                findingDate: displayDate.value,
                findingTime: time.value,
                message: message.value,
                finding_location: location.value,
                deliveryLocation: deliveryLocation.value,
                sender_email: props.sender?.email, 
                sender_phone: props.sender?.phone,
    
                latLong: latLng.value,
            }

        } else {
            notification = {
                itemID: props.item?.id!,
                itemName: props.item?.name!,
                senderID: props.sender?.id || 'not-logged-user',
                receiverID: props.receiver?.id || '',
                findingDate: displayDate.value,
                findingTime: time.value,
                message: message.value,
                finding_location: location.value,
                deliveryLocation: deliveryLocation.value,
                sender_email: email.value, 
                sender_phone: phone.value,
    
                latLong: latLng.value,
            }
        }

        if (notification.senderID === 'not-logged-user') {
            notification.anonID = 'anon_' + crypto.randomUUID();
            notification.senderID = null;
        }

        emit('success', notification)
    }

</script>

<style scoped lang="css">

    #map {
        min-height: 250px;
        width: 95%;

        border-radius: .8em;
        box-shadow: 0px 0px 9px rgba(0, 0, 0, .9);
    }

    .NotifyFindingComponent {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;

        opacity: 0;
        animation: aparecer 1s forwards;
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

    .delivery-options {
        display: flex;
        flex-direction: column;
        width: 95%;
    }

    .file-uploader{
        width: 95%;
    }

    ::v-deep(.v-file-upload, .v-file-upload-icon) {
        color: var(--first-color) !important;
    }

    .field {
        width: 95%;
    }

    .map-tooltip {
        position: absolute;
        top: 15px;
        left: 68%;
        width: 28.5%;
        background-color: var(--first-color);
        color: var(--text-color);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 999;

        opacity: .8;

        text-align: center;
    }

    .under-map {
        padding-top: .5em
    }

    .datetime{
        display: flex;
        flex-direction: column;
        width: 95%;
        gap: 1em;
    }

    .time-container {
        display: flex;
        width: 95%;
        gap: 1em;
    }

    .deliveryLocation {
        width: 100%;
    }

    .deliverySwitch{
        width: fit-content;
        align-self: center;
    }

    .email-phone{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        gap: 1em;

        width: 100%;
    }

    .email-phone-text{
        align-self: center;
        width: 95%;
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