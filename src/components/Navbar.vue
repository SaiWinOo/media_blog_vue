<template>
    <div class="sticky font-mono top-0 bg-white shadow-md z-50   h-11 pt-1">
      <div class="md:flex  justify-between items-center lg:max-w-4xl mx-auto">
        <div class="flex justify-between px-3 ">
          <div>
            <router-link to="/" class="text-2xl font-bold">Media</router-link>
          </div>
          <div @click="toggleNav" class="md:hidden cursor-pointer">
            <svg v-if="!isHidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div style="transition: 0.4s;"
             class="md:flex text-sm justify-end items-center text-center top-[50px] bg-white fixed md:static w-full md:w-3/4 lg:w-1/2 "
             :class="{
        '-ml-[100%]' : !isHidden,'ml-[0%]' :
      isHidden }"
        >
          <router-link :to="{name: 'home'}"
                    @click="toggleNav"   class="mx-2 block md:inline-block font-bold  bg-gray-300 md:bg-white mb-0.5 md:mb-0 py-3 sm:py-1 rounded hover:bg-gray-200 ">
            Home
          </router-link>
          <router-link :to="{name: 'about'}"
                    @click="toggleNav"   class="mx-2 block md:inline-block font-bold  bg-gray-300 md:bg-white mb-0.5 md:mb-0 py-3 sm:py-1 rounded hover:bg-gray-200 ">
            About
          </router-link>
          <router-link :to="{name: 'blogs'}"
                    @click="toggleNav"   class="mx-2 block md:inline-block font-bold  bg-gray-300 md:bg-white mb-0.5 md:mb-0 py-3 sm:py-1 rounded hover:bg-gray-200 ">
            Blogs
          </router-link>
          <div v-if="auth === null" class="mt-5 md:mt-0 ">
            <router-link :to="{name: 'register'}"
                         class='text-green-500 hover:bg-green-600 py-1 px-2 rounded hover:text-gray-50 transition duration-500 font-bold mx-2 '> REGISTER </router-link>
            <router-link :to="{name:'login'}"
                         class="border mx-2 mb-1 transition duration-500  py-1 border-green-500 hover:bg-green-500 font-bold text-black px-2 rounded hover:text-white border-green ">
              LOGIN
            </router-link>
          </div>

          
        <div v-else class="font-mono relative">
          <button @click="toggleDropdown" class="text-sm font-bold text-no p-2">Setting <i class="bi bi-chevron-down"></i></button>
          <ul v-if="dropdown" class="absolute bg-white top-[40px] w-full">
            <li  @click="toggleDropdown"
                      class="text-black px-2 hover:bg-gray-300 cursor-pointer py-1 border-b-2">
              <router-link @click="toggleNav" class="w-full" to="/profile">Profile</router-link>
            </li>
            <li  
                      @click="logout"   
                      class="text-black px-2 hover:bg-gray-300 cursor-pointer py-1">
              Logout
            </li>
          </ul>
        </div>
          
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { mapState } from 'vuex';
  export default {
    name:'Navbar',
    data() {
      return {
        isHidden: true,
        dropdown: false,
      }
    },
    computed: {
      ...mapState(['auth','token','apiUrl'])
    },
    methods: {
      toggleNav() {
        this.isHidden = !this.isHidden;
      },
      toggleDropdown(){
        this.dropdown = !this.dropdown;
      },
      logout(){
        this.toggleDropdown()
        this.toggleNav()
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
        let headers = new Headers();
        headers.append("Authorization", "Bearer "+this.token);
        fetch(this.apiUrl+'/logout',{
          method:"POST",
          headers,
        })
        .then(res => res.json())
        .then(res => {
          if(res.success === true){
            this.$store.dispatch('logout')
            this.$router.push("/login")
          }
        })
      }
    },
  }
  </script>
  
  <style scoped>
  
  </style>