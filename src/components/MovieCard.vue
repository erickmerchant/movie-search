<script setup lang="ts">
import type {Movie} from "@/types.ts";
import {computed} from "vue";
import Stars from "@/components/Stars.vue";

let {movie} = defineProps<{
	movie: Movie;
}>();

let directors = computed(() => movie?.directors?.join(", "));
let writers = computed(() => movie?.writers?.join(", "));
let mainActors = computed(() => movie?.mainActors?.join(", "));
let duration = computed(() =>
	movie?.duration
		?.toLowerCase()
		.substring(2)
		.replace(/([a-z]+)/, "$1 ")
);
</script>

<template>
	<div class="card">
		<img
			v-if="movie.posterUrl"
			:src="movie.posterUrl"
			class="poster"
			:alt="`Poster for ${movie.title}`" />
		<div v-else class="no-poster" aria-hidden="true">no image found</div>
		<div class="content">
			<h2 class="title">{{ movie.title }}</h2>
			<p class="summary">{{ movie.summary }}</p>
			<dl class="details">
				<dt>Directed by:</dt>
				<dd>{{ directors }}</dd>
				<dt>Written by:</dt>
				<dd>{{ writers }}</dd>
				<dt>Starring:</dt>
				<dd>{{ mainActors }}</dd>
				<dt>Runtime:</dt>
				<dd>{{ duration }}</dd>
				<dt>Rated:</dt>
				<dd>{{ movie.rating }}</dd>
				<dt>Rating:</dt>
				<dd><Stars :rating-value="movie.ratingValue" /></dd>
				<dt>Genre:</dt>
				<dd><slot name="genres" /></dd>
			</dl>
		</div>
	</div>
</template>

<style scoped>
.card {
	display: grid;
	grid-template-columns: 3fr 5fr;
	gap: 1rem;
	padding: 0 1rem;

	@media (width < 50rem) {
		grid-template-columns: 100%;
		grid-template-rows: min-content auto;
	}
}

.poster {
	grid-column: 1;
	border-radius: var(--radius-1);
	min-inline-size: 100%;
}

.no-poster {
	z-index: 0;
	container-type: inline-size;
	grid-column: 1;
	border-radius: var(--radius-1);
	inline-size: 100%;
	aspect-ratio: 3 / 5;
	display: grid;
	place-content: center;
	background: light-dark(var(--stone-0), var(--stone-8));
	color: light-dark(var(--stone-8), var(--stone-0));
	font-size: 3cqmin;
	white-space: nowrap;
}

.content {
	display: grid;
	gap: 1rem;
	align-content: start;

	:where(dt) {
		font-weight: 500;
	}
}

.title {
	font-size: 1.25rem;
	font-weight: 900;
}

.details {
	display: grid;
	grid-template-columns: max-content auto;
	gap: 0.5rem;
	align-content: start;

	> * {
		margin: 0;
	}
}
</style>
