export async function reverseGeocode(lat: number, lng: number): Promise<string> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        
    } catch (error) {
        console.error('Error en la geocodificación inversa:', error);
        return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
}