import Builder from "../2B2D/Builder";
import GameLoopPlugin from "./GameLoop/GameLoopPlugin";
import InitPlugin from "./Init/InitPlugin";
import LevelPlugin from "./Level/LevelPlugin";

export default function GamePlugin(builder: Builder) {
  builder.plugin(InitPlugin);
  builder.plugin(GameLoopPlugin);
  builder.plugin(LevelPlugin);
  
}