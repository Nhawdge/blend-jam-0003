import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import SpawnMovingGhost from "./Systems/SpawnMovingGhost";

export default function MovingGhostPlugin(builder: Builder)
{
    builder.enter(GameLoopState, SpawnMovingGhost);
}
