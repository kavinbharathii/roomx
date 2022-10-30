<script>
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth"
import { set, ref, get, child, update } from "firebase/database"
import { db } from "../main"

// db can't be initialized at the start because the user has not yet logged in

export default {
	name: 'Home',
	data() {
		return {
			playerId: '',
			roomKey: '',
			promptOpen: false,
			signedIn: false
		}
	},
	methods: {
		togglePrompt() {
			this.promptOpen = !this.promptOpen
			// also, reset the roomkey value to ""
			this.roomKey = ''
		},

		joinRoom() {
			if (this.roomKey == '') {
				console.log("Key empty")
			} else {
				this.roomKey = this.roomKey.toUpperCase()
				console.log(`Room key: ${this.roomKey}`)

				// data base query
				const dbRef = ref(db);
				console.log(`checking id: ${this.roomKey}`)
				get(child(dbRef, `rooms/${this.roomKey}`)).then((snapshot) => {
					if (snapshot.exists()) {
						let roomsData = snapshot.val()
						let playerData = roomsData.players

						if (playerData.length >= 2) {
							alert("Room already full")
						} else {

							let newPlayer = true
							for (let i = 0; i < playerData.length; i++) {
								console.log(`Player data looping: ${playerData[i]}`)
								if (playerData[i] == this.playerId) {
									newPlayer = false
								}
							}

							if (newPlayer) {
								// concatenate the new player to the players array
								let newPlayersArray = playerData.concat([this.playerId])
								let updatedData = {
									id: roomsData.id,
									players: newPlayersArray
								}

								// ----------------- update data ------------------ //
								update(ref(db, `rooms/${this.roomKey}`), updatedData)
								// ------------------------------------------------ //

								this.$router.push({
									name: 'room',
									params: {
										roomKey: this.roomKey
									}
								})
							} else {
								console.log("You are already in the room")
								alert("You are already in the room")
							}
						}
					} else {
						console.log("No such room")
					}
				}).catch((error) => {
					console.error(`Error: ${error}`);
				})
			}

			// close the prompt
			this.promptOpen = !this.promptOpen
		},

		async login() {
			const auth = getAuth();
			signInAnonymously(auth)
				.then(() => {
					console.log("Signed In successfully")
					this.signedIn = true
				})
				.catch((error) => {
					const errorMessage = error.message
					alert(errorMessage)
				}
			)

			onAuthStateChanged(auth, (user) => {
				if (user) {
					// User is signed in...
					this.playerId = user.uid;
					// console.log(this.playerId)
				} else {
					// User is signed out...
				}
			});
		},

		generateRandomKey(idLength) {
			let roomId = '';
			const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			for (let i = 0; i < idLength; i++) {
				roomId += characters.charAt(Math.floor(Math.random() * characters.length));
			}
			return roomId.toUpperCase()
			
		},

		createRoomKey() {
			this.roomKey = this.generateRandomKey(6)
			console.log(this.roomKey)

			set(ref(db, `rooms/${this.roomKey}`), {
				id: this.roomKey,
				players: [this.playerId]
			})

			this.$router.push({ 
				name: 'room', 
				params: {
					roomKey: this.roomKey
				} 
			})
		}
	},

	created() {
		this.login()
	}
}
</script>

<template>
<div class="container">
	<img id="chattr" src="../assets/chattr.png" alt="">
	<div class="app">
		<div id="createroom" @click="createRoomKey">Create Room</div>
		<div id="joinroom" @click="togglePrompt">Join Room</div>
		
		<!-- The Modal -->
		<div id="myModal" class="modal" v-bind:style='{"display" : (promptOpen ? "block" : "none" )}'>
			<!-- Modal content -->
			<div class="modal-content">
				<input id="inputbox" type="text" class="inputbox" placeholder="ENTER ROOM CODE" autocomplete="off" v-model="roomKey">
				<button id="joinroombtn" @click="joinRoom">JOIN</button>
			</div>
		</div>

	</div>
</div>
</template>

<style scoped>
</style>
