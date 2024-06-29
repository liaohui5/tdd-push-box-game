import { type RouteRecordRaw } from "vue-router";
import Game from "@/pages/Game.vue";
import MapEditor from "@/pages/MapEditor.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: { name: "Game" },
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
  {
    path: "/map_editor",
    name: "Edit",
    component: MapEditor,
  },
];
