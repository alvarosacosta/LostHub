import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'leaflet/dist/leaflet.css';
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { VFileUpload } from 'vuetify/labs/VFileUpload'
import 'vuetify/styles'
import './main.css';

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
    VTimePicker,
    VFileUpload
  },
  directives,
  icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
          mdi,
      },
  },
  theme: {
    themes: {
      light: {
        colors: {
          error: '#533642',
        }
      }
    }
  }
});
const pinia = createPinia();

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");