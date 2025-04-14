import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import './main.css';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
          mdi,
      },
  },
});
const pinia = createPinia();

createApp(App).use(router).use(vuetify).use(pinia).mount("#app");