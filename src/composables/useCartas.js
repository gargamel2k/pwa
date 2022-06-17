

import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import io from "socket.io-client";
import { useRouter } from 'vue-router';





const useCartas = () => {

    // Data
    const valorContador = ref(0)
    const currentPage = ref(1)
    let cartas = ref()
    let totalItems = ref(0)
    let totalPages = ref(0)    
    const store = useStore();

    const router = useRouter();


    let socket = null

    // Computed
    
    // Methods
    
    const onClickCarta = ( pk ) => {
      
      router.push({ path: '/det_carta', params:{ id: pk}  });
    }

    // -----------------------------------------
    // obtieneListadoCartas
    // -----------------------------------------

    const obtieneListadoCartas = () => {

        console.log( "obteniendo cartas " + currentPage.value);

        const url = store.state.backEndUrl + "/cartas"
        const tamPagina = 100

        const axiosConfig = { headers: {} }
        let data = null
        data = {
            size: tamPagina,
            page: currentPage.value -1,
            patrones: null,
            columnaOrden: `pk`,
          };

          axios
          .post(url, data, axiosConfig)
          .then((response) => {

            

            // Almacenamos el total de elementos y calculamos el total de paginas
            totalItems.value = response.data.datos[0].total;
            totalPages.value = Math.ceil(totalItems.value / tamPagina);

            cartas.value = response.data.datos

            console.log( " cartas actualizadas");
              
          })
          .catch((error) => {
            console.log("Sign up server error: ");
            console.log(error);
          });          

    }



    const configuraCanalCartas = () => {

      socket = io(store.state.backEndUrl);

      socket.connect(function () {
        console.log("conectado");
      });

      // Se ejecuta cuando llega un mensaje por el canal de actualización de cartas

      socket.on("cartas_actualizadas", (data) => {

        // Si tenemos las cartas 24h o 48h, actualizamos datos en local
        // En caso contrario trabajamos contra la base de datos

          console.log("actualiza mapa de cartas con " + data.datos[0].pk);
          store.commit("addCartaActualizada", {
            idCarta: data.datos[0].pk,
          });

          // Trabajamos contra la base de datos
          obtieneListadoCartas();

        })
      }
    
    // Watchs

    watch(() => currentPage.value, () => {
      obtieneListadoCartas()
    });
    
    configuraCanalCartas()
    obtieneListadoCartas()




    // Devuelve lo que se expone al template
    return {
        cartas,
        totalItems,
        totalPages,
        currentPage,
        valorContador,
        onClickCarta,
        obtieneListadoCartas,
        incrementar : () => valorContador.value++,
        decrementar : () => valorContador.value--,
    }


}


export default useCartas