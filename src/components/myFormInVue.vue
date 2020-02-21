<template>
    <form class="w-full max-w-lg mx-auto" >
        <div class="flex flex-wrap content-center -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" v-model="firstName">
            <p class="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"  v-model="lastName">
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Password
            </label>
            <input class="appearance-none block w-full bg-gray-200 border-red-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" v-model="password">
            <p class="text-gray-600 text-xs italic">Must be 8 characters containing One uppercase letter and one lowercase letter</p>
            </div>
        </div>
        <div class="flex flex-wrap w-full -mx-3 mb-6" v-if="showErrorMessages ">
            <div class="w-full bg-red-100 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <div v-for="messages in errorMessages" :key="messages">
                    <span class="block sm:inline">{{messages}}</span>
                </div>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" @click="showErrorMessages = false" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        </div>
         <div class="flex flex-wrap w-full -mx-3 mb-6" v-if="onValidate && !showErrorMessages">
            <div class="w-full bg-red-100 border-l-4 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">No Errors Found in Form</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" @click="onValidate = false" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
        </div>
        <div class="flex flex-wrap content-center -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <button @click="validateForm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Validate
                </button>
            </div>
        </div>
    </form>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {  Validate, Required, Password} from '@/decorators/decorators'

@Component
export default class myFormInVue extends Vue {

    // formData = new FormData()
    @Required
    firstName: string = ''
    
    @Required
    lastName: string = ''

    @Required
    @Password
    password: string = ''
   
    errorMessages: string [] = []

    showErrorMessages: boolean = false

    onValidate: boolean = false

    @Watch('errorMessages')
    onErrorMessage(val) {
        if(val.length > 0) {
            let vm = this
            vm.showErrorMessages = true
            vm.onValidate = false
        }
 
    } 

    @Validate
    validateForm() {
        let vm = this
        // vm.errorMessages = Validate()
        console.log(vm)
        vm.onValidate = true
    }
} 
</script>