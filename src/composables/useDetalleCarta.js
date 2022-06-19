import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'

import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const useDetalleCarta = () => {

    const route = useRoute();
    const pkCarta = route.params.id;


    // Data

    const datosCarta = ref()
    const anotacionesCarta = ref([])

    const store = useStore();
    const router = useRouter();

    const valor = "valor"




    // computed


    // Methods

    const obtieneAllInfoCarta = (pkCarta) => {

        const axiosConfig = { headers: {} }

        // Creamos la promesa para solicitar los datos
        const urlDatos = store.state.backEndUrl + "/cartas/getCarta"
        const postDatos = { idCarta: pkCarta }
        const promesaDatos = axios.post(urlDatos, postDatos, axiosConfig);

        // Creamos la promesa para solicitar anotaciones
        const urlAnotaciones = store.state.backEndUrl + "/cartas/anotaciones";
        const postAnotaciones = {
            size: 100,
            page: 0,
            patrones: null,
            columnaOrden: `pk`,
            idCarta: pkCarta,
        };

        const promesaAnotaciones = axios.post(urlAnotaciones, postAnotaciones, axiosConfig);

        // Ejecutamos las promesas
        Promise.all([promesaDatos, promesaAnotaciones]).then(datos => {


            datosCarta.value = datos[0].data[0]
            anotacionesCarta.value = datos[1].data.datos

            console.log(anotacionesCarta.value)

        })




    }


    // -----------------------------------------
    // obtieneListadoCartas
    // -----------------------------------------

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

    // obtieneDatosCarta(pkCarta)
    obtieneAllInfoCarta(pkCarta)

    return {
        valor,
        datosCarta,
        anotacionesCarta
    }


}

export default useDetalleCarta
