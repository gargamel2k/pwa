import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import json from './config-local.json'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default createStore({

  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------

  state: {

      backEndUrl: json.backEndUrl,

  },


  // ----------------------------------------------------------
  // Mutations
  // ----------------------------------------------------------

  mutations: {


  },


  // ----------------------------------------------------------
  // Actions
  // ----------------------------------------------------------

  actions: {


  },

  // ----------------------------------------------------------
  // Getters
  // ----------------------------------------------------------

  getters: {


  }

})
