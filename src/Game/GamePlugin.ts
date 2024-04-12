import Builder from "../2B2D/Builder";
import LevelPlugin from "./Level/LevelPlugin";
import InitPlugin from "./Init/InitPlugin";
import GameLoopPlugin from "./GameLoop/GameLoopPlugin";
import PlayerPlugin from "./Player/PlayerPlugin";
import MovingGhostPlugin from "./MovingGhost/MovingGhostPlugin";

export default function GamePlugin(builder: Builder) {
  // Init plugin loads stuff, spawns camera, etc.
  builder.plugin(InitPlugin);

  builder.plugin(PlayerPlugin);

  /*
  
  // Player plugin

  // moving wall plugin (obstacles that the player must avoid)
  builder.plugin(MovingGhostPlugin);
  
  */

  
  builder.plugin(LevelPlugin);
  builder.plugin(GameLoopPlugin);
}