<template>

  <q-page>
  

    <div class="column bg-white">
      <span class="text-h6 text-center text-weight-bold"
        >Lista de llamadas ({{ totalItems }})</span
      >
  
      <div class="row q-pa-md q-mt-none q-mb-sm flex-center ">
        <q-pagination
          size="20px"
          glossy
          input-class="text-black q-mx-sm"
          v-model="currentPage"
          :max="totalPages"
          input
        />
      </div>
  
      <q-card
        v-for="carta in cartas"
        :key="carta.pk"
        flat
        class="my-card q-mx-md q-mb-md q-pa-sm"
      >
        <div class="row">
          <div class="col-4">
            
              <q-chip 
                dense
                clickable
                @click="onClickCarta(carta.pk)"
                square
                dark
                :color="getColorPrioridad(carta.prioridad - 1)"
              >
                {{ carta.idCarta }}
              </q-chip>
            
  
          </div>
          <div class="col column">
            <span class="text-bold">{{ carta.descTipificacion }}</span>
            <span>{{ carta.calle }}, {{ carta.portal }}</span>
          </div>
          <div class="col-1">
            <q-chip
              dense
              square
              dark
              :color="getColorPrioridad(carta.prioridad - 1)"
            >
              <span>{{ carta.prioridad }}</span>
            </q-chip>
          </div>
        </div>
      </q-card>
    </div>
  </q-page>

</template>


<script>
import useCartas from "../composables/useCartas";
import * as utils from "../utils/utilsColores.js";
import { ref } from "vue";

export default {
  name: "mobile-page",

  // Propiedades
  props: {},

  //Events que emite al padre
  emits: [],

  setup() {
    // Obtengo loq que necesito del composable
    const {
      cartas,
      totalItems,
      currentPage,
      totalPages,
      valorContador,
      onClickCarta,
      incrementar,
      decrementar,
    } = useCartas();

    // Retornamos lo que usamos en el template
    return {
      cartas,
      totalItems,
      totalPages,
      currentPage,
      valorContador,
      onClickCarta,
      incrementar,
      decrementar,
      getColorPrioridad: (index) => {
        return utils.getColorPrioridad(index);
      },
    };
  },
};
</script>

<style scoped>
.my-card {
  background-color: rgb(236, 236, 236);
}
</style>
