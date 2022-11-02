<script>

import Home from './views/Home.vue'
import Room from './views/Room.vue'

export default {
	components: {
		Home,
		Room
	},
	data() {
		return {}
	}
}

</script>

<template>

<!-- TODO: join room after creation -->
<!-- TODO: player can play only if it is their turn -->
<!-- TODO: pass room/player data and board data to Board component -->
<!-- TODO: add game logic -->
<!-- TODO: add user streak -->
<router-view />
</template>

<style scoped>
</style>
