import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import SpawnMovingWall from "./Systems/SpawnMovingWall";

export default function MovingWallPlugin(builder: Builder)
{
    builder.enter(GameLoopState, SpawnMovingWall);
}
