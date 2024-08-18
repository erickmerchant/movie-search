<script setup lang="ts">
import type {Genre} from "@/types.ts";
import {defineProps, defineEmits} from "vue";

let emit = defineEmits<{
	genre: [title: string];
}>();

defineProps<{
	selectedGenre: string;
	genres: Array<Genre>;
}>();
</script>

<template>
	<div class="genre-filters">
		<slot></slot>
		<div class="buttons">
			<button
				v-for="genre in genres"
				@click="emit('genre', genre.title)"
				:class="{selected: selectedGenre === genre.title}">
				{{ genre.title }}
			</button>
		</div>
	</div>
</template>

<style scoped>
button {
	background-color: var(--stone-7);
	color: var(--stone-0);
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
