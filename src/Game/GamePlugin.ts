import Builder from "../2B2D/Builder";
import GameStateResouce from "./GameStateResource";
import InitPlugin from "./Init/InitPlugin";
import Layers from "./Layers";
import MovingWallPlugin from "./MovingWall/MovingWallPlugin";
import PlayerPlugin from "./Player/PlayerPlugin";

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

}