import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from "vuex-persist"

Vue.use(Vuex)
// 实例化插件
const cjh = new VuexPersist({
    storage: window.localStorage
})
export default new Vuex.Store({
    state: {
        longding: false,
        gwc_list:[]
    },
    mutations: {
        getlongding(state, bool) {
            state.longding = bool
        },
        set_gwcList(state,value){
            console.log(value)
            state.gwc_list = value
        }
    },
    actions: {

    },
    getters: {

    },
    modules: {

    },
    plugins: [cjh.plugin]
})