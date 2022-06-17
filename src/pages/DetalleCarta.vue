<template>

  <q-page class="flex flex-center">

    <div>
      <router-link to="/cartas">Volver a Cartas</router-link>
    </div>

    <span class="text-h6">Detalle Carta {{idCarta}}</span>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'



export default defineComponent({
  name: 'detalle-carta',

})
</script>
