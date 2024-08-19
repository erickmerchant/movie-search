<script setup lang="ts">
import {computed} from "vue";
import {StarFilled, Star} from "@element-plus/icons-vue";
import type {Maybe} from "@/types.ts";

let {ratingValue} = defineProps<{
	ratingValue: Maybe<number> | undefined;
}>();

let ratingValueInt = computed(() => {
	if (typeof ratingValue === "number") {
		return Math.round(ratingValue / 2);
	}
});
</script>

<template>
	<div class="stars">
		<template v-for="n in 5" v-if="ratingValueInt != undefined">
			<StarFilled v-if="ratingValueInt >= n" />
			<Star v-else />
		</template>
	</div>
</template>

<style scoped>
.stars {
	display: flex;
	justify-items: start;
	gap: 0;
}

svg {
	color: var(--yellow-7);
	height: 1.5rem;
	width: 1.5rem;
}
</style>
