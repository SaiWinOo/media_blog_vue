<template>
    <section v-if="auth !== null" class="flex justify-center mt-10">
        <router-link to="/blogs/create" class="btn px-5 py-2 bg-green-500 ">Create Blog post</router-link>
    </section>
    <section v-else class="text-center mt-5">
        <button><router-link class="underline text-green-600 font-bold font-mono" to="/register">Register</router-link> or <router-link class="underline text-green-600 font-bold" to="/login">Login</router-link> to share your precious knowledge</button>
    </section>
    
    <section class="grid font-mono grid-cols-1 px-5 md:px-0 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-10 mb-20 w-full md:w-3/4 mx-auto">
        <div v-for="blog in blogs.data" :key="blog.id" class="shadow border relative rounded overflow-hidden shadow hover:shadow-2xl min-h-[280px]">
            <router-link :to="'/blogs/'+blog.id">
                <img class='w-full h-[250px] object-cover' :src="blog.featured_image" alt="">
            <div class="p-3">
                <p class="mb-10">{{ blog.title }}</p>
                <div class="absolute bottom-[2px] ">
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
    
        <div > 
            <Paginate v-if="blogs.meta" @fetchLink="fetchBlogs" :links="blogs.meta.links"  />
        </div>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import Paginate from '../components/Paginate.vue'
    export default {
        data() {
            return {
                blogs: {},
            }
        },
        components:{
            Paginate,
        },
        computed: {
            ...mapState(['apiUrl','auth']),
        },
        methods: {
            fetchBlogs(url) {
                axios.get(url)
                .then(res => this.blogs = res.data)
            }
        },

        mounted(){
            this.fetchBlogs(this.apiUrl+'/blogs')
        }
    }
</script>

<style lang="scss" scoped>

</style>