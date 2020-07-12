import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        longding:false,
    },
    mutations: {
        getlongding(state,bool){
            state.longding = bool
        }
    },
    actions: {

    },
    getters: {
        
    },
    modules: {
        
    }
})