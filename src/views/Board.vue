<script>
import { ref, onChildChanged, update, child, get } from "firebase/database"
import { db } from '../main'

export default {
    name: 'Board',

    data() {
        return {
            roomKey: this.$route.params.roomKey,
            boardSpots: [],
            playerTurn: 0,
            playable: true,
            boardSize: [0, 1, 2],
            boardPlayers: []
        }
    },

    methods: {
        addX(event, x, y) {
            if (this.boardSpots[x][y] == 0) {
                event.target.classList.add("xtic")
                this.boardSpots[x][y] = 'x'
            } else {
                console.log("taken")
            }

            this.playerTurn += 1
            this.playerTurn = this.playerTurn % 2

            let updatedData = {
                id: this.roomKey,
                players: this.boardPlayers,
                board: this.boardSpots
            }

            update(ref(db, `rooms/${this.roomKey}`), updatedData)
        },

        addO(event, x, y) {
            if (this.boardSpots[x][y] == 0) {
                event.target.classList.add("otic")
                this.boardSpots[x][y] = 'o'
            } else {
                console.log("taken")
            }

            this.playerTurn += 1
            this.playerTurn = this.playerTurn % 2

            let updatedData = {
                id: this.roomKey,
                players: this.boardPlayers,
                board: this.boardSpots
            }

            update(ref(db, `rooms/${this.roomKey}`), updatedData)
        },

        goHome() {
            this.$router.push({
                name: 'home'
            })
        }
    },

    created() {
        const dbRef = ref(db);
        const roomRef = child(dbRef, `rooms/${this.roomKey}`)

        get(roomRef).then((snapshot) => {
            if (snapshot.exists()) {
                let roomsData = snapshot.val()
                this.boardSpots = roomsData['board']
                this.boardPlayers = roomsData['players']
                console.table(this.boardSpots)
            } else {
                console.log("No such room")
            }
        }).catch((error) => {
            console.error(`Error: ${error}`);
        })

        onChildChanged(roomRef, (snapshot) => {
            this.isReady = true
            this.boardSpots = snapshot.val() 

            console.table(this.boardSpots)
        })
    }
}

</script>

<template>
    <div class="container">
        <img id="chattr" src="../assets/chattr.png" alt="" @click="goHome"/>
        <div class="app">
            <div id="board">
                <div v-for="row in boardSize" class="row">
                    <div v-for="col in boardSize" class="spot" @click="playerTurn ? addO($event, row, col) : addX($event, row, col)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

#board {
    width: 24rem;
    height: 24rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: url("../assets/tictactoesvg.svg");
    background-repeat: no-repeat;
    background-size: cover;
}

.row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

.spot {
    width: 8rem;
    height: 8rem;
    padding: 2rem;
}

.xtic {
    background-image: url('../assets/ticx.svg');
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(0.6);
    transition: transform;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 300ms;
}

.otic {
    background-image: url('../assets/tico.svg');
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(0.6);
    transition: transform;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 300ms;
}

</style>
