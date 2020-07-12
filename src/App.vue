<template>
  <div id="app">
    <router-view/>
    <longding v-show="this.$store.state.longding"/>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import longding from '@/components/gongyong/longding'
export default {
  name: 'App',
  components:{
    longding
  },
  data (){
    return {

    }
  },
  mounted(){
  },
  created(){
    
  },
  methods:{
    
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
