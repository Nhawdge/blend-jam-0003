import Builder from "../../2B2D/Builder";
import CollisionTargetHit from "../../2B2D/Signals/CollisionTargetHit";
import GameLoopState from "../GameLoop/States/GameLoopState";
import WinFlagTarget from "../WinFlag/WinFlagTarget";
import SpawnLevel from "./Systems/SpawnLevel";

export default function LevelPlugin(builder: Builder) {
  builder.enter(GameLoopState, SpawnLevel);
}