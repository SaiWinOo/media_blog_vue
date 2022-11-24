<template>
    <div class="w-full bg-gray-200 min-h-[70vh]">
        <div class="w-full md:max-w-3xl  mx-auto p-3">
            <div>
                <img class="mx-auto w-full " :src="blog.featured_image" alt=""/>
            </div>
            <div class="pt-5">
                <h1 class="capitalize underline text-2xl ">{{ blog.title }}</h1>
                <div>
                    <i class="bi bi-clock "></i>
                    <small class="mx-2">{{ blog.date }}</small>
                    <i class="bi bi-layers mx-2"></i>
                    <small v-if="blog.category" >{{ blog.category.title }}</small>
                </div>
                <div v-if="blog.owner" class="flex  items-center ">
                    <img class="w-[50px] mr-3 h-[50px] object-cover rounded-full" :src="blog.owner.profile_image" alt="">
                    <h1>{{ blog.owner.name }}</h1>
                </div>
                <p class="text-gray-500 my-3">
                    {{ blog.description }}
                </p>
                <div>
                    <h4 class="text-center text-2xl my-2">Comments</h4>
                    <div>
                        <div class="border shadow bg-gray-300 rounded p-2 mb-2" v-for="comment in blog.comments"  :key="comment.id">
                            <div class="flex items-center text-gray-600">
                                <img class="h-[50px] w-[50px] rounded-full mr-3" :src="comment.user.profile_image" />
                                <div>
                                    <p>{{ comment.user.name }}</p>
                                    <p><i class="bi bi-clock mr-2"></i>{{ comment.time }}</p>
                                </div>
                            </div>
                            <p class="my-1">{{ comment.comment }}</p>
                        </div>
                    </div>

                    <div v-if="auth !== null" class="text-end">
                        <form action="" method="post" ref="commentForm" @submit.prevent = 'postComment'>
                            <input type="hidden" :value="blog.id" name="blog_id"  >
                            <div class="text-start">
                                <textarea name="comment" class="w-full bg-gray-100 text-gray-600 p-3 rounded shadow-xl" placeholder="write a comment" id="" cols="4" rows="3"></textarea>
                                 <small v-if="errors" class="text-red-500">{{ errors.message }}</small>
                            </div>
                            <button class="btn bg-green-500 py-1 px-3">comment</button>
                        </form>
                    </div>
                    <h4 v-else class="text-xl "><router-link class="text-green-500 underline" to="/login">Login</router-link> or <router-link class="underline text-green-500" to="/register">Sign up</router-link> to comment</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
    export default {
        name:'BlogsRead',
        data() {
            return {
                blog: {},
                errors:[],
            }
        },
        computed: {
            ...mapState(['apiUrl','auth'])
        },
        methods: {
            postComment() {
                let formData = new FormData(this.$refs.commentForm)
                axios.post(this.apiUrl+"/comments",formData)
                .then(res => {
                    this.fetchBlog(this.apiUrl+"/blogs/"+this.$route.params.id)
                    this.$refs.commentForm.reset()
                })
                .catch(e => {
                    this.errors = e.response.data
                })
            },
            fetchBlog(url){
                axios.get(url)
                .then(res => this.blog = res.data.data)
                .catch(e => {
                    console.log(e.response.data)
                })
            }
        },
        mounted(){
                this.fetchBlog(this.apiUrl+"/blogs/"+this.$route.params.id)
        }
    }
</script>

<style lang="scss" scoped>

</style>