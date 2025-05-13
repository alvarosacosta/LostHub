import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'
import L from 'leaflet'
import { reverseGeocode } from '@/utils/nominatim'

export const useLeafletStore = defineStore('leaflet', () => {
    const defaultLatLng = ref<number[]>([40.4168, -3.7038])
    const map = ref<L.Map | null>(null)
    const location = ref('')
    const latLng = ref<number[]>([defaultLatLng.value[0], defaultLatLng.value[1]])
    let userMarker: Ref<L.Marker | null> = ref(null)

    const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
    })

    async function onMapClick(e: L.LeafletMouseEvent) {
        const { lat, lng } = e.latlng;

        if (!userMarker.value) {
            userMarker.value = L.marker([lat, lng], { icon: markerIcon }).addTo(map.value as L.Map);

        } else {
            userMarker.value.setLatLng([lat, lng]);
        }

        latLng.value = [lat, lng]
        location.value = await reverseGeocode(lat, lng);
    }

    async function locateUser(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!map.value) return;

            map.value.locate({
                setView: true,
                maxZoom: 18,
                timeout: 10000,
            });

            map.value.once('locationfound', async (e) => {
                try {
                    if (!userMarker.value) {
                        userMarker.value = L.marker([e.latlng.lat, e.latlng.lng], { icon: markerIcon }).addTo(map.value as L.Map);
                    } else {
                        userMarker.value.setLatLng([e.latlng.lat, e.latlng.lng]);
                    }

                    (map.value as L.Map).setView([e.latlng.lat, e.latlng.lng], 18);

                    latLng.value = [e.latlng.lat, e.latlng.lng];
                    location.value = await reverseGeocode(e.latlng.lat, e.latlng.lng);

                    resolve();
                } catch (err) {
                    reject(new Error('Error processing location: ' + (err as Error).message));
                }
            });

            map.value.once('locationerror', (e) => {
                reject(new Error('Geolocation error: ' + e.message));
            });
        });
    }

    async function initInteractuableMapWithUserLocation(containerId: string) {
        const mapContainer = document.getElementById(containerId);
        if (!mapContainer) return;

        if (!map.value) {
            initInteractuableMapEO(containerId);

            try {
                await locateUser();

            } catch (err : any) {
                console.error(err.message);
            }
        }
    }

    async function initInteractuableMapEO(containerId: string) {
        resetMap();

        const mapContainer = document.getElementById(containerId);
        if (!mapContainer) return;

        if (!map.value) {
            map.value = L.map(mapContainer, {
                doubleClickZoom: false,
            }).setView([latLng.value[0], latLng.value[1]], 18);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map.value as L.Map);

            if (userMarker.value) {
                userMarker.value.setLatLng([latLng.value[0], latLng.value[1]]).addTo(map.value as L.Map);
            }

            map.value.on('click', onMapClick);
        }
    }

    async function initMapWithFixedLatLng(containerId: string, userlatLng: number[]) {
        await resetMap();

        const mapContainer = document.getElementById(containerId);
        if (!mapContainer) return;

        if (!map.value) {
            map.value = L.map(mapContainer, {
                doubleClickZoom: false,
            }).setView([userlatLng[0], userlatLng[1]], 18);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map.value as L.Map);

            L.marker([userlatLng[0], userlatLng[1]], { icon: markerIcon }).addTo(map.value as L.Map);
        }
    }

    async function resetMap() {
        if (map.value) {
            map.value.off();      
            map.value.remove();  
            map.value = null;  
        }
    }

    async function cleanVariables() {
        resetMap();

        location.value = '';
        userMarker.value = null;
        latLng.value = [40.4168, -3.7038];
    }

    return {
        location,
        defaultLatLng,
        latLng,
        map,
        initInteractuableMapWithUserLocation,
        initInteractuableMapEO,
        initMapWithFixedLatLng,
        locateUser,
        resetMap,
        cleanVariables,
    }
})