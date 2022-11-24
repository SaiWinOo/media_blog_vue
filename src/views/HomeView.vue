<template>
  <section id="hero" class="min-h-[40vh] flex justify-center items-center">
      <h1 class="font-bold text-white text-5xl font-mono">Welcome to media!</h1>
  </section>
  <section class="w-full text-center bg-gray-200 pt-10">
    <h1 class="text-3xl font-mono">Latest blogs</h1>
    <div>
      <section class="grid font-mono grid-cols-1 px-5 md:px-0 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-10 mb-20 w-full md:w-3/4 mx-auto">
        <div v-for="blog in blogs.data" :key="blog.id" class="shadow border relative rounded overflow-hidden shadow hover:shadow-2xl min-h-[280px]">
            <router-link :to="'/blogs/'+blog.id">
                <img class='w-full h-[250px] object-cover' :src="blog.featured_image" alt="">
            <div class="p-3">
                <p class="mb-10">{{ blog.title }}</p>
                <div v-if="blog.owner" class="absolute bottom-[2px] ">
                    <div class="flex items-center  mb-2">
                        <img :src="blog.owner.profile_image" class="w-[30px] h-[30px] mr-2  rounded-full " alt="">
                        <small>{{ blog.owner.name }}</small>
                    <i class="bi bi-layers mr-2 ml-3"></i> <small>{{ blog.category.title }}</small>

                    </div>
                </div>
            </div>
            </router-link>
        </div>
    </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
  export default {
    name:'HomeView',
    data() {
      return {
        blogs: {},
      }
    },
    computed: {
        ...mapState(['auth','apiUrl']),
    },
    methods: {
      fetchBlogs() {
        axios.get(this.apiUrl+'/home')
        .then(res => this.blogs =  res.data)
      }
    },
    mounted(){
      this.fetchBlogs()
    }
  }
</script>

<style lang="scss" scoped>

</style>