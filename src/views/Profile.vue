<template>
    <div class="flex justify-center font-mono items-center min-h-[80vh]">
        <div class="max-w-3xl min-w-[300px] text-center">
            <h1 class="text-2xl py-2">Edit Your Profile</h1>
            <div @click="uploadImage" class="profile_image">
                <img class="h-[200px] mx-auto w-[200px] rounded-full " :src="auth.profile_image" />
            </div>
            <div>
                <h1 class="text-center text-2xl py-2">{{ auth.name }}</h1>
            </div>
            <form  action="" @submit.prevent = 'update' ref="updateForm">
                <input @change="formChange" type="file" name="profile_image" ref="file" class="hidden" >
                <div class="flex flex-col text-start mb-2">
                    <label for=""><i class="bi bi-person-fill mr-2 "></i>Your Name</label>
                    <input type="text" v-model="auth.name" class="border mt-2 border-1 px-2 rounded-full bg-gray-200" name="name">
                </div>
                <div class="flex flex-col text-start">
                    <label for=""><i class="bi bi-envelope-fill mr-2 "></i>Your Email</label>
                    <input  type="text" v-model="auth.email" class="border mt-2 border-1 px-2 rounded-full bg-gray-200" name="email">
                </div>
                <div class="mt-2">
                <button @change="formChange" class="btn bg-green-500 px-4">update</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Swal from 'sweetalert2';
    export default {
        name:'Profile',
        data() {
            return {
                change: false,
            }
        },
        computed: {
            ...mapState(['auth','apiUrl']),

        },
        
        methods: {
            formChange(){
                console.log("it change")
                this.change = true
            },
            uploadImage() {
                this.$refs.file.click()
            },
            update(){
                let formData = new FormData(this.$refs.updateForm)
                axios.post(this.apiUrl+'/update',formData)
                .then(res => {
                    this.$router.push('/login')
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
                        title: "login to see changes"
                        })
                })
                .catch(e => console.log(e))
            },
        },
    }
</script>

<style  scoped>

.profile_image{
    position:relative;
}
.profile_image:hover::after{
    content: 'upload photo';
    position: absolute;
    top: 40%;
    bottom:40%;
    right: 0;
    left: 0;
    background-color: rgba(242, 242, 242, 0.235);
}
</style>