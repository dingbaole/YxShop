import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        str:"你好"
    },
    mutations: {
        add(state){
            console.log(state.str)
        }
    },
    actions: {
        
    },
    getters: {
        
    },
    modules: {
        
    }
})