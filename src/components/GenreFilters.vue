<script setup lang="ts">
import type {Genre, GenreWithoutMovies} from "@/types.ts";

let emit = defineEmits<{
	genre: [title: string | null];
}>();

defineProps<{
	selectedGenre: string | null;
	genres: Array<Genre | GenreWithoutMovies>;
}>();
</script>

<template>
	<div class="genre-filters">
		<div class="buttons">
			<button
				v-for="genre in genres"
				@click="emit('genre', genre.title ?? null)"
				:class="{selected: selectedGenre === genre.title}">
				{{ genre.title }}
			</button>
		</div>
	</div>
</template>

<style scoped>
button {
	background-color: var(--bar-canvas);
	color: var(--bar-ink);
}

.genre-filters {
	display: grid;
	gap: 1rem;
	grid-template-rows: max-content auto;
}

.buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5em;
	font-size: 0.8rem;
}

.selected {
	background-color: var(--indigo-7);
}
</style>
