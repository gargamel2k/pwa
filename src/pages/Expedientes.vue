<template>
  <div class="column bg-white">
    <span class="text-h6 text-center q-ma-md text-weight-bold"
      >Lista de Espedientes ({{ totalItems }})</span
    >

    <div class="row q-pa-md q-mt-none q-mb-sm flex-center bg-dark">
      <q-pagination
        size="20px"
        glossy
        input-class="text-white q-mx-sm"
        v-model="currentPage"
        :max="totalPages"
        input
      />
    </div>

    <q-card
      v-for="expediente in expedientes"
      :key="expediente.pk"
      flat
      class="my-card q-mx-md q-mb-md q-pa-sm"
    >
      <div class="row">
        <div class="col-4">
          <q-chip
            dense
            square
            dark
            :color="getColorPrioridad(expediente.prioridad - 1)"
          >
            {{ expediente.idExpediente }}
          </q-chip>
        </div>
        <div class="col column">
          <span class="text-bold">{{ expediente.descTipificacion }}</span>
          <span>{{ expediente.calle }}, {{ expediente.portal }}</span>
        </div>
        <div class="col-1">
          <q-chip
            dense
            square
            dark
            :color="getColorPrioridad(expediente.prioridad - 1)"
          >
            <span>{{ expediente.prioridad }}</span>
          </q-chip>
        </div>
      </div>
    </q-card>
  </div>
</template>


<script>
import useExpedientes from "../composables/useExpedientes";
import * as utils from "../utils/utilsColores.js";
import { ref } from "vue";

export default {
  name: "expedientes-page",

  // Propiedades
  props: {},

  //Events que emite al padre
  emits: [],

  setup() {
    // Obtengo loq que necesito del composable
    const {
      expedientes,
      totalItems,
      currentPage,
      totalPages,
      valorContador,
      incrementar,
      decrementar,
    } = useExpedientes();

    // Retornamos lo que usamos en el template
    return {
      expedientes,
      totalItems,
      totalPages,
      currentPage,
      valorContador,
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

