import {createRouter, createWebHistory} from "vue-router";
import MovieSearch from "@/views/MovieSearch.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "movie-search",
			component: MovieSearch,
		},
	],
});

export default router;
