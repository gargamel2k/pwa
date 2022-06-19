<template>
  <q-page class="flex flex-center">
    <div class="column items-center" v-if="totalItems == 0">
      <q-circular-progress
        indeterminate
        size="50px"
        color="lime"
        class="q-ma-md"
      />
      Espere un momento ...
    </div>

    <div v-if="totalItems > 0" class="column bg-white">
      <span class="text-h6 text-center q-ma-xs text-weight-bold"
        >Lista de Espedientes ({{ totalItems }})</span
      >

      <div class="row q-pa-xs q-mt-none q-mb-sm flex-center">
        <q-pagination
          dense
          v-model="currentPage"
          size="15px"
          :max="totalPages"
          color="deep-orange"
          boundary-links
        />
      </div>

      <q-virtual-scroll :items="expedientes" separator v-slot="{ item, index }">
        <q-card :key="index" flat class="my-card q-mx-md q-mb-xs q-pa-md">
          <div class="row">
            <div class="col-4">
              <q-chip
                square
                dense
                dark
                :color="getColorPrioridad(item.prioridad - 1)"
              >
                {{ item.idExpediente }}
              </q-chip>
            </div>
            <div class="col column">
              <span class="text-bold">{{ item.descTipificacion }}</span>
              <span>{{ item.calle }}, {{ item.portal }}</span>
            </div>
            <div class="col-1">
              <q-chip
                square
                dark
                :color="getColorPrioridad(item.prioridad - 1)"
              >
                <span>{{ item.prioridad }}</span>
              </q-chip>
            </div>
          </div>
        </q-card>
      </q-virtual-scroll>
    </div>
  </q-page>
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
