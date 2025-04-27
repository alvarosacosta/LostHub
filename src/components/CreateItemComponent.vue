<template>
    <main class="CreateItemComponent">
        <button class='back-button' @click="$router.back()"> Volver </button>
        <v-form class="v-window-container">
            <section class="title-container">
                <h1 class="title">{{ currentTitle }}</h1>
                <span class="step-number">{{ step }}</span>

            </section>

            <section class="progress-bar-container">
                <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
            </section>

            <v-window class="window" v-model="step">
                <v-window-item :value="1">
                    <article class="window-step">
                        <v-btn-toggle
                            class="type-buttons"
                            v-model=type
                            divided
                            required
                            
                        >
                            <v-btn 
                                density="comfortable"
                                base-color="var(--fourth-color)" 
                                color="var(--second-color)"
                                class="type-button" 
                                value="Perdido"
                            >He perdido algo</v-btn>

                            <v-btn 
                                density="comfortable"
                                base-color="var(--fourth-color)"
                                color="var(--second-color)" 
                                class="type-button" 
                                value="Encontrado"
                            >He encontrado algo</v-btn>
                        </v-btn-toggle>
                    </article>
                </v-window-item>

                <v-window-item :value="2">
                    <article class="window-step">
                        
                    </article>
                </v-window-item>

                <v-window-item :value="3">
                    <article class="window-step">
                        
                    </article>
                </v-window-item>

                <v-window-item :value="4">
                    <article class="window-step">
                        
                    </article>
                </v-window-item>

                <v-window-item :value="5">
                    <article class="window-step">
                        
                    </article>
                </v-window-item>
            </v-window>

            <v-card-actions>
                <v-icon v-if="step > 1" class="arrow" @click="step--" size="90">mdi-arrow-left-thick</v-icon>

                <v-spacer></v-spacer>

                <v-icon v-if="step < 5" class="arrow" @click="step++" size="90">mdi-arrow-right-thick</v-icon>
            </v-card-actions>
        </v-form>
    </main>
</template>

<script setup lang="ts">
import { computed, Ref, ref } from 'vue'

    const type : Ref<string> = ref('');

    const name : Ref<string> = ref('');
    const category : Ref<string> = ref('');
    const subcategory : Ref<string> = ref('');
    const description : Ref<string> = ref('');
    const color : Ref<string> = ref('');
    const gender : Ref<string> = ref('');
    const files : Ref<File[] | undefined> = ref(undefined);
        
    const location : Ref<string> = ref('');
    const locationDescription : Ref<string> = ref('');
    const publicTransport : Ref<string> = ref('');
        
    const dateTime : Ref<Date> = ref(new Date());
            
    const reward : Ref<string> = ref('');
    const deliveryLocation : Ref<string> = ref('');
        
    const step : Ref<number> = ref(1)
    const currentTitle = computed(() => {
        switch (step.value) {
            case 1: return '¿Perdiste o encontraste algo?'
            case 2: return '¿Qué?'
            case 3: return '¿Dónde?'
            case 4: return '¿Cuándo?'
            case 5: return 'Datos finales'
            default: return 'Account created'
        }
    })

    const totalSteps = 5
    const progressWidth = computed(() => {
        return (step.value / totalSteps) * 100
    })

</script>

<style scoped lang="css">
    .CreateItemComponent {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;

        opacity: 0;
        animation: aparecer 1s forwards;
    }

    .v-window-container {
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
        padding: 24px;
        min-height: 350px;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .type-buttons{
        box-shadow: 1px 2px 2px rgba(0, 0, 0, 1);
    }

    .type-button {
        width: 15em;
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