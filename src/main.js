import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyB5EOOKvJP353XPH2CQhDNzlR7j5_TwBts",
    authDomain: "roomx-a2287.firebaseapp.com",
    databaseURL: "https://roomx-a2287-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "roomx-a2287",
    storageBucket: "roomx-a2287.appspot.com",
    messagingSenderId: "931511452961",
    appId: "1:931511452961:web:ab9c2ba571397be124aa60",
    databaseURL: "https://roomx-a2287-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

import './assets/main.css'

const firebaseapp = initializeApp(firebaseConfig)
export const db = getDatabase(firebaseapp, "https://roomx-a2287-default-rtdb.asia-southeast1.firebasedatabase.app")

createApp(App).use(router).mount('#app')
