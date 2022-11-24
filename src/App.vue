<template>
  <Navbar/>
  <router-view/>
  <Footer/>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';

export default {
  name:'App',
  components:{ Navbar, Footer },
  created(){
      if(localStorage.getItem('token') && localStorage.getItem('auth') ){
        this.$store.dispatch('setAuth',JSON.parse(localStorage.getItem('auth')))
        this.$store.dispatch('setToken',localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');
      }
  }
}
</script>

<style lang="scss">

</style>