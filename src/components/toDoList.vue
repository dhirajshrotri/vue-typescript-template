<template>
    <div class="column">
      <div class="row">
            <label for="addItem">
                Enter a thing to do...
                <input type="text" id="addItem" name="addItem" v-model="message">
            </label>
      </div>
        <div class="row">
            <button @click="hello">Add</button>
        </div>
        <div class="row">
            <li v-for="items in list" :key="items">
                <u>{{items}}</u>
            </li>
        </div>
    </div>
</template>
<script lang="ts">
// import { Component, Vue } from 'vue-property-decorator';
// import { Log } from '@/decorators/decorators'

// @Component
// export default class ToDoList extends Vue {
//     message: string

//     list: string[]

//     constructor() {
//       super();

//       this.list = [];
//       this.message = '';
//     }

//     @Log
//     hello() {
//         //... 
//     }
//     // onClick() {
//     //   this.list.push(this.message);
//     //   this.message = '';
//     // }
// }

</script>
