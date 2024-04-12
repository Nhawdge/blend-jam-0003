import Builder from "../2B2D/Builder";
import LevelPlugin from "./Level/LevelPlugin";
import InitPlugin from "./Init/InitPlugin";
import GameLoopPlugin from "./GameLoop/GameLoopPlugin";
import PlayerPlugin from "./Player/PlayerPlugin";
import MovingWallPlugin from "./MovingWall/MovingWallPlugin";

export default function GamePlugin(builder: Builder) {
  Layers.add(builder);

  builder.resource(new GameStateResouce());

  // Init plugin loads stuff, spawns camera, etc.
  builder.plugin(InitPlugin);

  /*
  
  // Player plugin
  builder.plugin(PlayerPlugin);

  // moving wall plugin (obstacles that the player must avoid)
  builder.plugin(MovingWallPlugin);
  
  */

  
  builder.plugin(LevelPlugin);
  builder.plugin(GameLoopPlugin);
}