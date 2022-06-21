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
    <div v-if="totalItems > 0" class="column bg-white" style="width: 100%">
      <span class="text-h6 text-center text-weight-bold"
        >Lista de llamadas ({{ totalItems }})</span
      >

      <div class="row q-pa-md q-mt-none q-mb-sm flex-center">
        <q-pagination
          size="15px"
          input-class="text-black q-mx-sm"
          v-model="currentPage"
          :max="totalPages"
          input
          dense
        />
      </div>

      <q-virtual-scroll :items="cartas" separator v-slot="{ item, index }">
        <q-card :key="index" flat class="my-card q-mx-md q-mb-xs q-pa-sm">
          <div class="row">
            <div class="col-4">
              <q-chip
                dense
                clickable
                @click="onClickCarta(item.pk)"
                square
                dark
                :color="getColorPrioridad(item.prioridad - 1)"
              >
                {{ item.idCarta }}
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
    } = useCartas();

    // Retornamos lo que usamos en el template
    return {
      cartas,
      totalItems,
      totalPages,
      currentPage,
      valorContador,
      onClickCarta,
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
