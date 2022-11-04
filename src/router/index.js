import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Room from '../views/Room.vue'
import Board from '../views/Board.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},

		{
			path: '/room/:roomKey',
			name: 'room',
			component: Room
		},

		{
			path: '/board/:roomKey',
			name: 'board',
			component: Board
		}
	]
})

export default router
