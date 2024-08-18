<script setup lang="ts">
import type {Query, Movie, Genre, QueryMoviesArgs} from "@/types.ts";
import {useQuery} from "@vue/apollo-composable";
import gql from "graphql-tag";
import {ref, reactive, watch} from "vue";
import MovieCard from "@/components/MovieCard.vue";
import Pager from "@/components/Pager.vue";
import GenreFilters from "@/components/GenreFilters.vue";
import {Loading} from "@element-plus/icons-vue";

const search = ref("");
const genre = ref<string | undefined>(undefined);
const currentPage = ref(1);
const movieVariables = reactive({
	pagination: {page: currentPage, perPage: 20},
	where: {
		search,
		genre,
	},
});

const {result: movieResult, loading: moviesLoading} = useQuery(
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

const {result: genreResult} = useQuery(gql`
	query AllGenres {
		genres {
			nodes {
				title
			}
		}
	}
`);

const moviesList = ref<Array<Movie>>([]);
const totalPages = ref(0);

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

const genreList = ref<Array<Genre>>([]);
watch(genreResult, (newGenres: Query | undefined) => {
	if (newGenres?.genres != undefined) {
		const genres = newGenres.genres;

		if (genres?.nodes != undefined) {
			genreList.value = genres.nodes;
		}
	}
});

function selectGenre(title: string) {
	genre.value = genre.value === title ? undefined : title;
}
</script>

<template>
	<div class="search">
		<h1>Movie Search</h1>
		<input v-model="search" placeholder="Search by title" />
		<div v-if="moviesLoading" class="loading">
			<Loading />
		</div>
	</div>
	<GenreFilters
		@genre="selectGenre"
		:genres="genreList"
		:selected-genre="genre">
		<strong>Filter by genre:</strong>
	</GenreFilters>
	<div class="results">
		<MovieCard
			v-if="moviesList.length"
			v-for="movie in moviesList"
			@genre="selectGenre"
			:movie="movie"
			:key="movie.id">
			<template #genres>
				<GenreFilters
					:genres="movie.genres"
					@genre="selectGenre"
					:selected-genre="genre">
					<strong>Genres:</strong>
				</GenreFilters>
			</template>
		</MovieCard>
		<div v-else class="no-results">No results found</div>
	</div>
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
	grid-template-columns: max-content auto 2em;
	align-items: center;
	gap: 1em;
	position: sticky;
	z-index: 1;
	top: 0;
	padding: 1rem;
	background-color: var(--bar-canvas);
	color: var(--bar-ink);

	:where(h1) {
		font-size: 1rem;
	}

	:where(input) {
		display: block;
		padding: 0.25rem 0.5rem;
		inline-size: 100%;
		border: 0.03125rem solid currentColor;
		color: var(--main-ink);
	}
}

.genre-filters {
	padding: 0 1rem;
}

.results {
	display: grid;
	gap: 1rem;
}

.no-results {
	display: grid;
	place-content: center;
}
</style>
