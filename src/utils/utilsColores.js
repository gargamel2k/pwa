const arrColoresPrioridades = ["lime darken-1", "teal darken-2", "orange darken-2", "deep-orange darken-4", "cyan darken-1"];
const arrColoresDisponibilidades = ["light-green-4", "deep-orange-4", "blue-grey-4", "deep-orange darken-4", "cyan darken-1"];
const arrColoresEstados = ["lime darken-1", "teal darken-2", "orange darken-2", "deep-orange darken-4", "cyan darken-1"];
const arrEstados = ["DISP", "ASIG", "ENCA", "ENLU", "TRAN", "PRE"];


export function getColorPrioridad(index) {
    return arrColoresPrioridades[index];
}

export function getColorDisponibilidad(index) {
    return arrColoresDisponibilidades[index];
}

export function getColorEstado(index) {
    return arrColoresEstados[index];
}

export function getNombreEstado(index) {
    return arrEstados[index];
}


const arrIconosTiposUnidades = ["", "emergency", "no_crash", "local_taxi", "minor_crash", "drive_eta"];


export function getIconoTipoUnidad(index) {
    return arrIconosTiposUnidades[index];
}