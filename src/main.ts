import "@/assets/main.css";
import {createApp} from "vue";
import {RouterView} from "vue-router";
import {provide, h} from "vue";
import {DefaultApolloClient} from "@vue/apollo-composable";
import {apolloClient} from "@/api.ts";
// import {createPinia} from "pinia";

import router from "@/router";

const app = createApp({
	setup() {
		provide(DefaultApolloClient, apolloClient);
	},
	render() {
		return h(RouterView);
	},
});

// app.use(createPinia());
app.use(router);

app.mount("#app");
