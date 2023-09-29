
export async function listarUsuarios(){
    fetch('127.0.0.1:3000/get-data')
        .then(response => response.text())
        .then(data => {
            console.log('Datos obtenidos desde el servidor:', data);
        })

}