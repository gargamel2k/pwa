import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const useDetalleExpediente = () => {

    const route = useRoute();
    const pkExpediente = route.params.id;


    // Data

    const datosExpediente = ref()
    const anotacionesExpediente = ref([])
    const fotosExpediente = ref([])

    const store = useStore();
    const router = useRouter();


    // computed


    // Methods



    const obtieneAllInfoExpediente = (pkExpediente) => {

        const axiosConfig = { headers: {} }

        // Creamos la promesa para solicitar los datos
        const urlDatos = store.state.backEndUrl + "/expedientes/getExpediente"
        const postDatos = { idExpediente: pkExpediente }
        const promesaDatos = axios.post(urlDatos, postDatos, axiosConfig);

        // Creamos la promesa para solicitar anotaciones
        const urlAnotaciones = store.state.backEndUrl + "/expedientes/anotaciones";
        const postAnotaciones = {
            size: 100,
            page: 0,
            patrones: null,
            columnaOrden: `pk`,
            idExpediente: pkExpediente,
        };

        const promesaAnotaciones = axios.post(urlAnotaciones, postAnotaciones, axiosConfig);

        // Creamos la promesa para obtener las fotos
        const urlFotos = store.state.backEndUrl + "/expedientes/fotos";
        const postFotos = {
            size: 100,
            page: 0,
            patrones: null,
            columnaOrden: `pk`,
            idExpediente: pkExpediente,
        };

        const promesaFotos = axios.post(urlFotos, postFotos, axiosConfig);

        // Ejecutamos las promesas
        Promise.all([promesaDatos, promesaAnotaciones, promesaFotos]).then(datos => {


            datosExpediente.value = datos[0].data[0]
            anotacionesExpediente.value = datos[1].data.datos
            fotosExpediente.value = datos[2].data.datos



        })




    }


    // -----------------------------------------
    // obtieneListadoCartas
    // -----------------------------------------
    /*
        const obtieneDatosCarta = (pkCarta) => {

            console.log("obteniendo dato de cartas ");
            const url = store.state.backEndUrl + "/cartas/getCarta"

            const axiosConfig = { headers: {} }
            let data = null

            data = {
                idCarta: pkCarta,
            };

            axios
                .post(url, data, axiosConfig)
                .then((response) => {

                    console.log(" datos recibidos");
                    datosCarta.value = response.data[0];
                    console.log(datosCarta.value)

                })
                .catch((error) => {
                    console.log("Sign up server error: ");
                    console.log(error);
                });

        }
    */

    // obtieneDatosCarta(pkCarta)
    obtieneAllInfoExpediente(pkExpediente)

    return {
        datosExpediente,
        anotacionesExpediente,
        fotosExpediente
    }


}

export default useDetalleExpediente