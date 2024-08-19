<script setup lang="ts">
import {ArrowLeftBold, ArrowRightBold} from "@element-plus/icons-vue";

const emit = defineEmits<{
	next: [];
	previous: [];
}>();

defineProps<{
	totalPages: number;
	currentPage: number;
}>();
</script>

<template>
	<div class="pagination" v-if="totalPages">
		<button
			:disabled="currentPage <= 1"
			@click="emit('previous')"
			aria-label="Previous">
			<ArrowLeftBold />
		</button>
		<div>Page {{ currentPage }} / {{ totalPages }}</div>
		<button
			:disabled="currentPage >= totalPages"
			@click="emit('next')"
			aria-label="Next">
			<ArrowRightBold />
		</button>
	</div>
</template>

<style scoped>
svg {
	block-size: 1.125rem;
	inline-size: 1.125rem;
}

button {
	background-color: var(--bar-canvas);

	&:disabled {
		color: color-mix(in lab, var(--bar-ink), transparent 80%);
		border-color: currentColor;
	}
}

.pagination {
	grid-row: 5;
	position: sticky;
	bottom: -1px; /* hack: fixes a bug where it's not at the absolute bottom */
	block-size: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 2rem 1rem;
	background-color: var(--bar-canvas);
	color: var(--bar-ink);
}
</style>
