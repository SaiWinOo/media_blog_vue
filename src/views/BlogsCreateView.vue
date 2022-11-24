<template>
    <div class="bg-gray-300 p-3 min-h-[87vh] font-mono flex justify-center items-center">
        <div class="w-full md:max-w-[50%] bg-gray-50 h-[100%] p-5">
            <form action="" enctype="multipart/form-data" class="grid grid-cols-1" @submit.prevent="createBlog" ref="createBlogForm">
                <div class="mb-3 ">
                    <label for="" class="block ">Title</label>
                    <input type="text" class="bg-gray-200 px-1 w-full" name="title" >
                </div>
                <div class="mb-3 ">
                    <label for="" class="block">featured image</label>
                    <input type="file" class="bg-gray-200 w-full" name="featured_image" >
                </div>
                <label for="">Category</label>
                <select name="category_id" class="p-1 mb-3" id="" required>
                    <option value="">Select Tag</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
                </select>
                <div class="mb-3">
                <textarea name="description" class="bg-gray-200 w-full p-2" id="" cols="30" rows="10"></textarea>
                </div>
                <button class="btn bg-green-500 py-1 ">Publish blog</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
    export default {
        name:'BlogsCreateView',
        data() {
            return {
                categories: [],
            }
        },
        computed: {
            ...mapState(['apiUrl']),
        },
        methods: {
            createBlog() {
                let formData = new FormData(this.$refs.createBlogForm)
                axios.post(this.apiUrl+'/blogs',formData)
                .then(res=> {
                    if(res.data.success === true){
                        this.$refs.createBlogForm.reset()
                        const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                        })

                        Toast.fire({
                        icon: 'success',
                        title: res.data.message
                        })
                        this.$router.push('/blogs')
                    }
                })
                .catch(e => console.log(e.response.data.message))
            }
        },
        mounted(){
            axios.get('http://127.0.0.1:8000/api/categories')
            .then(res => this.categories =  res.data)
        }
    }
</script>

<style lang="scss" scoped>

</style>