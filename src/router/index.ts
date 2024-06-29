import { type App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  app.use(router);

  return router.isReady();
}
