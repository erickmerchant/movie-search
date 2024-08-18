<script setup lang="ts">
import {defineProps, computed} from "vue";
import {StarFilled} from "@element-plus/icons-vue";

let {ratingValue} = defineProps<{
	ratingValue: number;
}>();

let ratingValueInt = computed(() => {
	console.log(ratingValue);

	return Math.round(ratingValue);
});
</script>

<template>
	<div class="stars">
		<template v-for="_ in ratingValueInt">
			<StarFilled />
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
