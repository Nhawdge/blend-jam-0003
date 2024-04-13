import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import MoveWhenAppropriate from "./Systems/MoveWhenAppropriate";
import SpawnMovingObstacle from "./Systems/SpawnMovingObstacle";

export default function MovingObstaclePlugin(builder: Builder)
{
    builder.enter(GameLoopState, SpawnMovingObstacle);
    builder.update(GameLoopState, MoveWhenAppropriate);
}
