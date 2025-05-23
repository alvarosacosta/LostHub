# 🧳 LostHub - Aplicación de Objetos Perdidos

Portal web dedicado a apoyar la búsqueda de objetos perdidos, con el objetivo de crear una comunidad activa en el proceso. Es posible publicar objetos que uno haya perdido, y cooperar para encontrar lo que otros han extraviado. Se puede usar filtros avanzados que, por ejemplo, permiten ver los objetos que se han perdido cerca de la zona elegida.

## 🚀 Tecnologías primordiales utilizadas

- **Vue 3** - Instalado con **Vue CLI**.
- **TypeScript** - Tipado estático.
- **Pinia** - Gestión de estado | Conexión entre Supabase y Web.
- **Vuetify** - Librería de componentes UI.
- **Leaflet y Nominatim** - Mapa interactuable de OpenStreetMaps y geolocalización inversa.
- **Vercel** - Servicio para ofrecer producción de la web.
- **Supabase** - Base de datos.

## Estructura básica del proyecto

```plaintext
src/
├── assets/
├── components/
├── containers/
├── enums/
├── interfaces/
├── views/
├── stores/             # Pinia
├── json/                 
├── utils/              # Utilidades matemáticas, de texto y API Externas
├── router/              
├── App.vue
├── main.ts
├── main.css/
└── supabase.ts         # Supabase
.env
```

## 📦 Enlace a producción

[Visita LostHub](https://lost-hub.vercel.app/)
