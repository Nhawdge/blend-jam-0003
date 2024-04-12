import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import SpawnLevel from "./Systems/SpawnLevel";

export default function LevelPlugin(builder: Builder) {
  builder.enter(GameLoopState, SpawnLevel);
}