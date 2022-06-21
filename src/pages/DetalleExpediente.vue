<template>
  <q-page class="flex flex-center">
    <q-footer>
      <q-tabs v-model="tab" class="bg-cyan-10 text-white">
        <q-tab name="datos" icon="info" label="Datos" />
        <q-tab name="anotaciones" icon="notes" label="Anotaciones" />
        <q-tab name="fotos" icon="photo" label="Fotos" />
      </q-tabs>
    </q-footer>

    <div class="column items-center" v-if="!datosExpediente">
      <q-circular-progress
        indeterminate
        size="50px"
        color="lime"
        class="q-ma-md"
      />
      Espere un momento ...
    </div>

    <div v-else class="col q-mx-xs q-mb-xs q-pa-sm">
      <router-link to="/expedientes"> Volver a Expedientes</router-link>
      <q-separator class="q-ma-md"></q-separator>

      <q-chip
        square
        :color="getColorPrioridad(datosExpediente.prioridad - 1)"
        class="idExpediente q-mb-xd"
        dark
        >Expediente ID: {{ datosExpediente.idExpediente }}</q-chip
      >

      <q-card class="ficha q-mb-xs q-pa-md" flat>
        <span class="text-bold text-h6">Tipificación</span>
        <q-input
          readonly
          filled
          label-color="blue"
          v-model="datosExpediente.codTipificacion"
          label="Código"
          stack-label
          class="q-mb-xs"
          dense
        />

        <q-input
          filled
          readonly
          label-color="blue"
          v-model="datosExpediente.descTipificacion"
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
          v-model="datosExpediente.calle"
          label="Dirección"
          stack-label
          class="q-mb-xs"
          dense
        />

        <q-input
          filled
          readonly
          label-color="blue"
          v-model="datosExpediente.municipio"
          label="Municipio"
          stack-label
          class="q-mb-xs"
          dense
        />

        <q-input
          filled
          readonly
          label-color="blue"
          v-model="datosExpediente.provincia"
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
          v-for="anotacion in anotacionesExpediente"
          :key="anotacion.pk"
          class="items-start q-mb-sm"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">
              <span>
                {{ anotacion.usuario }}
              </span>
            </q-item-label>
            <q-item-label>
              <span class="text-grey-8">
                {{ anotacion.hora }}
              </span>
            </q-item-label>
            <span class="texto-anotacion">
              {{ anotacion.texto }}
            </span>
          </q-item-section>
        </q-item>
        <q-separator></q-separator>
      </q-card>

      <q-card class="q-mb-xs" flat>
        <div class="col text-bold text-h6">Lista de Fotos</div>
        <hr />

        <q-item
          v-for="foto in fotosExpediente"
          :key="foto.pk"
          class="items-start q-mb-sm"
          clickable
          v-ripple
        >
          <q-img :src="getUrlFoto(foto.fichero)">
            <div class="absolute-bottom text-subtitle1 text-center">
              {{ foto.fechahora }}
            </div>
          </q-img>
        </q-item>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

import useDetalleExpediente from "../composables/useDetalleExpediente";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import * as utils from "../utils/utilsColores.js";

export default defineComponent({
  name: "detalle-expediente",

  // Propiedades
  props: {},

  //Events que emite al padre
  emits: [],

  setup() {
    const route = useRoute();

    console.log("pk del expediente: ");
    console.log(route.params.id);

    const store = useStore();

    // Obtengo loq que necesito del composable
    const { datosExpediente, anotacionesExpediente, fotosExpediente } =
      useDetalleExpediente(1);

    // Retornamos lo que usamos en el template
    return {
      datosExpediente,
      anotacionesExpediente,
      fotosExpediente,
      getColorPrioridad: (index) => {
        return utils.getColorPrioridad(index);
      },
      getUrlFoto: (foto) => {
        // return store.state.backEndUrl + "/fotos";
        return `${store.state.backEndUrl}/fotos/${route.params.id}/${foto}`;
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

.idExpediente {
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
