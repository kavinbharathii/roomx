
<script>
import { ref, get, child, onChildChanged } from "firebase/database"
import { db } from '../main'

export default {
    name: 'Room',
    data() {
        return {
            roomKey: this.$route.params.roomKey,
            players: [],
            isReady: false
        }
    },

    methods: {
        goHome() {
            this.$router.push({
                name: 'home'
            })
        }
    },

    created() {
        const dbRef = ref(db);
        const roomRef = child(dbRef, `rooms/${this.roomKey}`)
        get(child(dbRef, `rooms/${this.roomKey}`)).then((snapshot) => {
            if (snapshot.exists()) {
                let roomData = snapshot.val()
                this.players = roomData.players
                console.log(`Players: ${this.players}`)

                if (this.players.length == 1) {
                    this.isReady = false
                } else {
                    this.isReady = true
                }
            } else {
                this.$router.push({ name: 'home' })
                alert("No such room")
            }
        }).catch((error) => {
            console.error(`Error: ${error}`);
        })

        onChildChanged(roomRef, (snapshot) => {
            console.log(`Snapshot change: ${snapshot.val()}`)
            this.isReady = true
            this.players = snapshot.val()
        })
    }
}

</script>

<template>
    <div class="container">
        <img id="chattr" src="../assets/chattr.png" alt="" @click="goHome"/>
        <div class="app">
            <h1>Room code: <span class="accent">{{ this.roomKey }}</span></h1>
            <p v-if="isReady">
                {{ players }}
                <p v-for="player in players">
                    {{ player }}
                </p>
            </p>
            <p v-else>Waiting...</p>
        </div>
    </div>
</template>

<style scoped>
.accent {
    color: #9462f9;
}
</style>
