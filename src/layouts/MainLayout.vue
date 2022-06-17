<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        
      </q-toolbar>
      <div class="q-px-lg q-pt-xs q-mb-md">
        <div class="text-h3">Séneca App</div>
        <div class="text-subtitle1">{{fechaActual}}</div>
      </div>

      <q-img src="../../public/background.jpg" class="header-image absolute-top">

      </q-img>

    </q-header>


      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>

            <q-item clickable v-ripple
            to="/">
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>


            <q-item clickable v-ripple
            to="/cartas">
              <q-item-section avatar>
                <q-icon name="phone" />
              </q-item-section>

              <q-item-section>
                Cartas
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple
            to="/expedientes">
              <q-item-section avatar>
                <q-icon name="folder" />
              </q-item-section>

              <q-item-section>
                Expedientes
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple
            to="/recursos">
              <q-item-section avatar>
                <q-icon name="minor_crash" />
              </q-item-section>

              <q-item-section>
                Recursos
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple
            to="/dashboard">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple
            to="/help">
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Ayuda
              </q-item-section>
            </q-item>


          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="../../public/avatar.jpg">
            </q-avatar>
            <div class="text-weight-bold">J.Cardona</div>
            <div>@jcardona</div>
          </div>
        </q-img>
      </q-drawer>



    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { date } from 'quasar'

// import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  computed: {
    fechaActual() {
      let timestamp = Date.now();
      return date.formatDate(timestamp, 'dddd D MMMM')
    }

  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>


<style>

.header-image {

  height: 100%;
  z-index: -1;
  opacity: 0.8;
  filter: grayscale(100%);

}

</style>