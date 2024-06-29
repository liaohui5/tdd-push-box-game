import { createApp } from "vue";
import { setupStore } from "./store/index";
import { setupRouter } from "./router/index";
import "./styles.css";
import App from "./App.vue";

async function bootstrap() {
  const app = createApp(App);

  setupStore(app);
  await setupRouter(app);

  app.mount("#app");
}

bootstrap();
