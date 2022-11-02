<script>

export default {
    name: 'Board',
    data() {
        return {
            boardSpots: [[0, 1, 2], [0, 1, 2], [0, 1, 2]],
            playerTurn: 0,
            playable: true,
            boardSize: [0, 1, 2]
        }
    },

    methods: {
        addX(event, x, y) {
            if (this.boardSpots[x][y] == null) {
                console.log("taken")
            } else {
                console.log("x marked")
                event.target.classList.add("xtic")
                console.log(x, y)
                this.boardSpots[x][y] = null
            }

            this.playerTurn += 1
            this.playerTurn = this.playerTurn % 2
        },

        addO(event, x, y) {
            if (this.boardSpots[x][y] == null) {
                console.log("taken")
            } else {
                console.log("o marked")
                event.target.classList.add("otic")
                console.log(x, y)
                this.boardSpots[x][y] = null
            }

            this.playerTurn += 1
            this.playerTurn = this.playerTurn % 2
        }
    }
}
</script>

<template>
    <div class="container">
        <div id="board">
            <div v-for="row in boardSize" class="row">
                <div v-for="col in boardSize" class="spot" @click="playerTurn ? addO($event, row, col) : addX($event, row, col)"></div>
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
    transition-duration: 200ms;
}

.otic {
    background-image: url('../assets/tico.svg');
    background-repeat: no-repeat;
    background-size: cover;
    transform: scale(0.6);
    transition: transform;
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 200ms;
}

</style>
