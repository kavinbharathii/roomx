import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey:  ""**********************************",
    authDomain: ""**********************************",
    databaseURL: ""**********************************",
    projectId: ""**********************************",
    storageBucket: ""**********************************",
    messagingSenderId: ""**********************************",
    appId: ""**********************************",
    databaseURL: "**********************************"
}

import './assets/main.css'

const firebaseapp = initializeApp(firebaseConfig)
export const db = getDatabase(firebaseapp, "https://roomx-a2287-default-rtdb.asia-southeast1.firebasedatabase.app")

createApp(App).use(router).mount('#app')
