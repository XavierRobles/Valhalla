
export async function listarUsuarios() {
    try {
        const response = await fetch('https://valhalla-ffxi.firebaseapp.com/');
        if (response.ok) {
            const data = await response;
            console.log('Datos obtenidos desde el servidor:', data);
        } else {
            console.error('Error al obtener datos del servidor:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}