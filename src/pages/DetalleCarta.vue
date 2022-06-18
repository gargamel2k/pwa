<template>
  <q-page class="flex flex-center">
    <div class="column flex-center">
      <span class="text-h6">Detalle Carta {{ idCarta }}</span>
      <router-link to="/cartas">Volver a Cartas</router-link>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "detalle-carta",
});
</script>
