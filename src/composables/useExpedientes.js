import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import io from "socket.io-client";


import { useRouter } from 'vue-router';


const useExpedientes = () => {

    const store = useStore();
    const router = useRouter();

    // Data
    const valorContador = ref(0)
    const currentPage = ref(1)
    let expedientes = ref()
    let totalItems = ref(0)
    let totalPages = ref(0)



    let socket = null

    // Computed

    // Methods

    const onClickExpediente = (pk) => {

        router.push({ name: 'det_expediente', params: { id: pk } });
    }

    // -----------------------------------------
    // obtieneListadoCartas
    // -----------------------------------------

    const obtieneListadoExpedientes = () => {

        console.log("obteniendo expedientes " + currentPage.value);

        const url = store.state.backEndUrl + "/expedientes"
        console.log(url);

        const tamPagina = 100

        const axiosConfig = { headers: {} }
        let data = null
        data = {
            size: tamPagina,
            page: currentPage.value - 1,
            patrones: null,
            columnaOrden: `pk`,
        };

        axios
            .post(url, data, axiosConfig)
            .then((response) => {



                // Almacenamos el total de elementos y calculamos el total de paginas
                totalItems.value = response.data.datos[0].total;
                totalPages.value = Math.ceil(totalItems.value / tamPagina);

                expedientes.value = response.data.datos


            })
            .catch((error) => {
                console.log("Sign up server error: ");
                console.log(error);
            });

    }



    const configuraCanalExpedientes = () => {

        socket = io(store.state.backEndUrl);

        socket.connect(function() {
            console.log("conectado");
        });

        // Se ejecuta cuando llega un mensaje por el canal de actualización de cartas

        socket.on("expedientes_actualizados", (data) => {

            // Trabajamos contra la base de datos
            obtieneListadoExpedientes();

        })
    }

    // Watchs

    watch(() => currentPage.value, () => {
        obtieneListadoExpedientes()
    });

    configuraCanalExpedientes()
    obtieneListadoExpedientes()




    // Devuelve lo que se expone al template
    return {
        expedientes,
        totalItems,
        totalPages,
        currentPage,
        valorContador,
        obtieneListadoExpedientes,
        onClickExpediente
    }


}


export default useExpedientes
