<template>
  <q-page class="flex flex-center">
    <div class="column items-center" v-if="!datosCarta">
      <q-circular-progress
        indeterminate
        size="50px"
        color="lime"
        class="q-ma-md"
      />
      Espere un momento ...
    </div>

    <div v-else class="col q-mx-xs q-mb-xs q-pa-sm">
      <router-link to="/cartas"> Volver a Cartas</router-link>
      <q-separator class="q-ma-md"></q-separator>

      <q-chip
        square
        :color="getColorPrioridad(datosCarta.prioridad - 1)"
        class="idCarta q-mb-xd"
        dark
        >{{ datosCarta.idCarta }}</q-chip
      >

      <q-card class="ficha q-mb-xs q-pa-md" flat>
        <span class="text-bold text-h6">Tipificación</span>
        <q-input
          readonly
          filled
          label-color="blue"
          v-model="datosCarta.codTipificacion"
          label="Código"
          stack-label
          class="q-mb-xs"
          dense
        />

        <q-input
          filled
          readonly
          label-color="blue"
          v-model="datosCarta.descTipificacion"
          label="Descripcion"
          stack-label
          class="q-mb-xs"
          dense
        />
      </q-card>

      <q-card class="ficha q-mb-xs q-pa-md" flat>
        <span class="text-bold text-h6">Localización</span>
        <q-input
          filled
          readonly
          label-color="blue"
          v-model="datosCarta.calle"
          label="Dirección"
          stack-label
          class="q-mb-xs"
          dense
        />

        <q-input
          filled
          readonly
          label-color="blue"
          v-model="datosCarta.municipio"
          label="Municipio"
          stack-label
          class="q-mb-xs"
          dense
        />

        <q-input
          filled
          readonly
          label-color="blue"
          v-model="datosCarta.provincia"
          label="Provincia"
          stack-label
          class="q-mb-xs"
          dense
        />
      </q-card>

      <q-card class="q-mb-xs" flat>
        <div class="col text-bold text-h6">Lista de Anotaciones</div>
        <hr />

        <q-item
          v-for="anotacion in anotacionesCarta"
          :key="anotacion.pk"
          class="items-start q-mb-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="`https://cdn.quasar.dev/img/avatar5.jpg`" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">{{
              anotacion.usuario
            }}</q-item-label>
            <span class="texto-anotacion">
              {{ anotacion.texto }}
            </span>
          </q-item-section>

          <q-item-section side> {{ anotacion.hora }} </q-item-section>
        </q-item>
        <q-separator></q-separator>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import useDetalleCarta from "../composables/useDetalleCarta";
import { useRoute } from "vue-router";
import * as utils from "../utils/utilsColores.js";

export default defineComponent({
  name: "detalle-carta",

  // Propiedades
  props: {},

  //Events que emite al padre
  emits: [],

  setup() {
    const route = useRoute();

    console.log("pk de la carta: ");
    console.log(route);

    // Obtengo loq que necesito del composable
    const { valor, datosCarta, anotacionesCarta } = useDetalleCarta(1);

    // Retornamos lo que usamos en el template
    return {
      valor,
      datosCarta,
      anotacionesCarta,
      getColorPrioridad: (index) => {
        return utils.getColorPrioridad(index);
      },
    };
  },
});
</script>

<style scoped>
.ficha {
  background-color: aliceblue;
  border-radius: 5px;
  width: 100%;
  min-height: 100px;
}

.idCarta {
  font-weight: bold;
  font-size: 1.2rem;
}

.datos {
  font-weight: bold;
  color: red;
}

.texto-anotacion {
  font-size: 0.75rem;
}
</style>
