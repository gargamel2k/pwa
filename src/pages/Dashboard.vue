
<template>
<div>
  <div class="row flex-center q-mt-md q-mb-md">
    <div
      v-for="(contador, index) in contLlamadas"
      :key="index"
      :class="`column col-1 bg-${contador.color} q-mx-xs q-pa-sm`"
      style="border-radius: 5px; width: 80px"
    >
      <span
        class="text-white"
        style="font-size: 1.3rem; font-weight: bold; opacity: 0.7"
      >
        {{ contador.valor }}
      </span>
      <span class="text-white"> {{ contador.label }} </span>
    </div>
  </div>

  <div class="column flex-center text-center">
    <div class="q-mt-md">
      <span class="text-h6 text-center text-weight-bold"
        >Estado actual de la sala</span
      >
      <Donut :chartData="chartData" :width="20" :height="20" />
    </div>
  </div>

  <div class="column items-center q-pa-md">
    <span class="text-h6 text-weight-bold"> Estado de los operadores</span>
    <div class="row flex-center q-mt-md">
      <div
        v-for="(operador, index) in dataOperadores"
        :key="index"
        class="
          ficha-operador
          bg-grey-4
          column
          col-1
          text-center
          items-center
          q-pt-sm q-mr-xs q-ma-xs
        "
      >
        <q-avatar>
          <img :src="operador.avatar" />
        </q-avatar>

        {{ operador.username }}
        <q-chip dense dark square :color="arrEstados[operador.estado].color">
          <q-icon class="q-mr-xs" :name="arrIconos[operador.estado]"></q-icon>
          <span class="text-center">
            {{ operador.t_transcurrido }}
          </span>
        </q-chip>
      </div>
    </div>
  </div>


</div>
</template>

<script>
import moment from "moment";

import Donut from "../components/charts/DonutChart.vue";


export default {
  
  name:"dash-board",
  components: { Donut },

  data() {
    return {
      contLlamadas: [
        { valor: 30, color: "cyan", label: "En Cola" },
        { valor: 20, color: "orange", label: "En Curso" },
        { valor: 10, color: "green", label: "Atendidas" },
        { valor: 30, color: "red", label: "Perdidas" },
      ],

      ahora: moment(),

      chartData: {
        labels: ["Descanso", "Libre", "Ocupado", "T.Administrativo"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: ["grey", "green", "red", "orange"],
            data: [40, 20, 12, 10],
          },
        ],
      },

      arrContadoresEstados: [0, 0, 0, 0],

      arrEstados: [
        { nombre: "DES ", color: "grey" },
        { nombre: "LIB ", color: "green" },
        { nombre: "COM ", color: "red" },
        { nombre: "ADM ", color: "orange" },
      ],

      arrIconos: ["pause", "check", "phone", "settings"],

      dataOperadores: [
        {
          username: "A. Smith",
          estado: 0,
          avatar: "https://i.pravatar.cc/150?img=13",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "JK Rowling",
          estado: 1,
          avatar: "https://i.pravatar.cc/150?img=14",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "M. Douglas",
          estado: 2,
          avatar: "https://i.pravatar.cc/150?img=15",
          time: moment().subtract(2, "minutes"),
          t_transcurrido: "",
        },

        {
          username: "T. Cruise",
          estado: 3,
          avatar: "https://i.pravatar.cc/150?img=16",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "A. Jolie",
          estado: 1,
          avatar: "https://i.pravatar.cc/150?img=17",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "N. Kidman",
          estado: 3,
          avatar: "https://i.pravatar.cc/150?img=18",
          time: moment(),
          t_transcurrido: "",
        },

        {
          username: "H. Potter",
          estado: 0,
          avatar: "https://i.pravatar.cc/150?img=9",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "H. Zimmer",
          estado: 3,
          avatar: "https://i.pravatar.cc/150?img=10",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "J. Hurt",
          estado: 2,
          avatar: "https://i.pravatar.cc/150?img=11",
          time: moment(),
          t_transcurrido: "",
        },

        {
          username: "M. Collins",
          estado: 0,
          avatar: "https://i.pravatar.cc/150?img=12",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "A. Armas",
          estado: 1,
          avatar: "https://i.pravatar.cc/150?img=13",
          time: moment(),
          t_transcurrido: "",
        },
        {
          username: "S. Marceau",
          estado: 2,
          avatar: "https://i.pravatar.cc/150?img=19",
          time: moment(),
          t_transcurrido: "",
        },
      ],
    };
  },

  created() {
    this.updateTiempo();
  },

  methods: {
    updateContadores() {
      this.arrContadoresEstados = [0, 0, 0, 0];
      this.dataOperadores.forEach((operador) => {
        this.arrContadoresEstados[operador.estado]++;
      });

      this.chartData.datasets[0].data = this.arrContadoresEstados;
      this.contLlamadas.forEach((contador) => {
        contador.valor += Math.floor(Math.random() * (2 + 1) - 1);
      });
    },

    updateTiempo() {
      // seleccionamos un operador
      const idxOperador = Math.floor(Math.random() * (12 - 0) + 0);
      const idxEstado = Math.floor(Math.random() * (4 - 0) + 0);

      this.dataOperadores[idxOperador].estado = idxEstado;
      this.dataOperadores[idxOperador].time = moment();

      this.dataOperadores.forEach((operador) => {
        const secs = moment().diff(operador.time, "s");
        const formatted = moment.utc(secs * 1000).format("mm:ss");
        operador.t_transcurrido = formatted;
      });

      this.updateContadores();
      setTimeout(this.updateTiempo, 300);
    },
  },
};
</script>

<style scoped>
.ficha-operador {
  width: 100px;
  height: 110px;
  border-radius: 8px;
}
</style>
