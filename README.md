# 🧳 LostHub - Aplicación de Objetos Perdidos

Portal web dedicado a apoyar la búsqueda de objetos perdidos, creando una comunidad activa en el proceso.

## 🚀 Tecnologías utilizadas

- **Vue 3** - Instalado con **Vue CLI**.
- **TypeScript** - Tipado estático.
- **Pinia** - Gestión de estado | Conexión entre Supabase y Web.
- **Vuetify** - Librería de componentes UI.
- **vee-validate** - Validación.
- **Supabase** - Base de datos.
- **Router** - Para la navegación dentro del portal web.

## Estructura básica del proyecto

Se ha construido la estructura de proyecto siguiendo la estructura: 

`Component -> Container -> View`

De manera que la lógica propia de front así como la mayoría de estilo, se encuentra encapsulado en el `Component`. Si hubiera que conectar dicho componente con el back, haciendo uso de Pinia, se haría en el `Container` y lo que el usuario vería sería el `View`.

```plaintext
`src/
├── assets/
├── components/
├── containers/
├── views/
├── stores/            # Pinia
├── router/
├── App.vue
├── main.ts
├── supabase.ts			# Supabase
```

## 📦 Instalación y configuración

Para iniciar el proyecto siga los siguientes pasos:

### 1. Clona el repositorio

```bash
git clone https://github.com/alvarosacosta/LostHub
cd lost-hub
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Si se quiere probar la funcionalidad haciendo uso de una base de datos compatible, se requiere de la creación de un archivo `.env` en la raíz del proyecto, configurando ahí las variables de entorno necesarias. 

Para pruebas más sencillas que no requieran de base de datos, ignorar este paso.

```ts
VITE_SUPABASE_URL=https://tuproyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_publica
```

### 4. Ejecuta el proyecto

```bash
npm run dev
```
