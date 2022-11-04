
<script>
import { ref, get, child, onChildChanged, update, set } from "firebase/database"
import { db } from '../main'

export default {
    data() {
        return {
            roomKey: this.$route.params.roomKey,
            players: [],
            isReady: false,
            board: []
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
                this.players = roomData['players'] 
                this.board = roomData['board'] 

                console.log(`Firebase query: ${this.players} ${this.board}`)

                if (this.players.length <= 1) {
                    this.isReady = false
                } else {
                    this.isReady = true

                    this.$router.push({
                        name: 'board'
                    })
                }
            } else {
                this.$router.push({ name: 'home' })
                alert("No such room")
            }
        }).catch((error) => {
            console.error(`Error: ${error}`);
        })

        onChildChanged(roomRef, (snapshot) => {
            this.isReady = true

            this.$router.push({
                name: 'board'
            })
            
            let updatedRoomData = snapshot.val()
            console.log(snapshot.val())
            this.players = snapshot.val();

            // this.players = updatedRoomData['players'];
            // this.board = updatedRoomData['board'];

            console.table(this.players)
            console.table(this.board)
        }, {
            onlyOnce: true
        })
    }
}

</script>


<template>
    <div class="container">
        <img id="chattr" src="../assets/chattr.png" alt="" @click="goHome"/>
        <div class="app">
            <h1>Room code: <span class="accent">{{ this.roomKey }}</span></h1>
            <p v-if="isReady">Routing to Board</p>
            <p v-else>Waiting...</p>
        </div>
    </div>
</template>


<style scoped>
.accent {
    color: #9462f9;
}
</style>
