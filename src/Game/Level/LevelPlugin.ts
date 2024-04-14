import Builder from "../../2B2D/Builder";
import CollisionTargetHit from "../../2B2D/Signals/CollisionTargetHit";
import GameLoopState from "../GameLoop/States/GameLoopState";
import NextLevel from "../GameLoop/States/NextLevel.js";
import WinFlagTarget from "../WinFlag/WinFlagTarget";
import SpawnLevel, { GoToNextLevel } from "./Systems/SpawnLevel";

export default function LevelPlugin(builder: Builder) {
  builder.enter(GameLoopState, SpawnLevel);
  builder.handle(NextLevel, GoToNextLevel)
}