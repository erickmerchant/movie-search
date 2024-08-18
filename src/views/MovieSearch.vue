<script setup lang="ts">
import type {Query, Movie, QueryMoviesArgs} from "@/types.ts";
import {useQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";
import {ref, reactive, watch} from "vue";
import MovieCard from "@/components/MovieCard.vue";
import Pager from "@/components/Pager.vue";
import {Loading} from "@element-plus/icons-vue";

const search = ref("");
const currentPage = ref(1);
const movieVariables = reactive({
	pagination: {page: currentPage, perPage: 20},
	where: {
		search,
	},
});

const {result: movieResult, loading: moviesLoading} = useQuery<Query>(
	gql`
		query AllMovies($pagination: PaginationInput, $where: MovieFilterInput) {
			movies(pagination: $pagination, where: $where) {
				nodes {
					title
					directors
					duration
					id
					mainActors
					posterUrl
					rating
					ratingValue
					summary
					writers
					genres {
						title
					}
				}
				pagination {
					page
					perPage
					totalPages
				}
			}
		}
	`,
	movieVariables
);

const {result: genreResult} = useQuery<Query>(gql`
	query AllGenres {
		genres {
			nodes {
				title
			}
		}
	}
`);

const moviesList = ref<Array<Movie>>([]);
const totalPages = ref<number>(0);

watch(movieResult, (newMovies: Query | undefined) => {
	if (newMovies?.movies != undefined) {
		const movies = newMovies.movies;

		if (movies?.nodes != undefined) {
			moviesList.value = movies.nodes;
		}

		if (movies?.pagination != null) {
			totalPages.value = movies.pagination.totalPages;
		}
	}
});

function previous() {
	window.scrollTo({top: 0, behavior: "smooth"});

	currentPage.value -= 1;
}

function next() {
	window.scrollTo({top: 0, behavior: "smooth"});

	currentPage.value += 1;
}
</script>

<template>
	<div class="search">
		<input v-model="search" placeholder="Search by title" />
		<div v-if="moviesLoading" class="loading">
			<Loading />
		</div>
	</div>
	<MovieCard v-for="movie in moviesList" :movie="movie" :key="movie.id" />
	<Pager
		:totalPages="totalPages"
		:currentPage="currentPage"
		@previous="previous"
		@next="next" />
</template>

<style scoped>
.loading {
	animation: var(--animation-spin) forwards;
}

.search {
	display: grid;
	grid-template-columns: auto 2em;
	gap: 1em;
	position: sticky;
	z-index: 1;
	top: 0;
	padding: 1rem;
	background-color: var(--bar-canvas);
	color: var(--bar-ink);

	:where(input) {
		display: block;
		padding: 0.25rem 0.5rem;
		inline-size: 100%;
		border: 0.03125rem solid currentColor;
		color: var(--main-ink);
	}
}
</style>
