<script setup lang="ts">
import {defineProps, defineEmits} from "vue";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/vue/24/solid";

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
		<button :disabled="currentPage <= 1" @click="emit('previous')">
			<ChevronLeftIcon />
		</button>
		<div>Page {{ currentPage }} / {{ totalPages }}</div>
		<button :disabled="currentPage >= totalPages" @click="emit('next')">
			<ChevronRightIcon />
		</button>
	</div>
</template>

<style scoped>
svg {
	block-size: 1.125rem;
	inline-size: 1.125rem;
}

button {
	border: 0.03125rem solid currentColor;
	border-radius: var(--radius-1);
	background: transparent;
	display: flex;
	align-items: center;
	padding: 0.5rem 0.75rem;
}

.pagination {
	position: sticky;
	bottom: 0;
	block-size: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 2rem 1rem;
	background-color: var(--stone-8);
	color: var(--stone-1);
}
</style>
