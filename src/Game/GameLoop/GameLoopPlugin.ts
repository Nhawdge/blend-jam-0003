import Builder from "../../2B2D/Builder";
import ApplyAabbPhysics from "../../2B2D/Systems/ApplyAabbPhysics";
import GameStateResouce from "../GameStateResource";
import LoadedSignal from "../Init/Signals/LoadedSignal";
import GameLoopState from "./States/GameLoopState";

export default function GameLoopPlugin(builder: Builder) {
  builder.resource(new GameStateResouce());
  builder.update(GameLoopState, ApplyAabbPhysics);
  

  builder.handle(LoadedSignal, (update) => {
    update.enter(GameLoopState)
  });
}
