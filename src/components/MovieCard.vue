<script setup lang="ts">
import type {Movie} from "@/types.ts";
import {defineProps, computed} from "vue";

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
		<img :src="movie.posterUrl" class="poster" />
		<div class="content">
			<h3 class="title">{{ movie.title }}</h3>
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
				<dd>{{ movie.ratingValue }}</dd>
			</dl>
			<div class="genres">{{ movie.genres }}</div>
		</div>
	</div>
</template>

<style scoped>
.card {
	display: grid;
	grid-template-columns: 3fr 5fr;
	gap: 2rem;
	padding: 0 2rem;
}

.poster {
	grid-column: 1;
	border-radius: var(--radius-1);
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
}
</style>
