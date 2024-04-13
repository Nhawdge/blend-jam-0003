import Builder from "../../2B2D/Builder";
import CollisionTargetHit from "../../2B2D/Signals/CollisionTargetHit";
import GameLoopState from "../GameLoop/States/GameLoopState";
import CameraFollow from "./Systems/CameraFollow";
import GetHitByObstacle from "./Systems/GetHitByObstacle";
import SpawnPlayer from "./Systems/SpawnPlayer";
import Talk from "./Systems/Talk";

export default function PlayerPlugin(builder: Builder)
{
    builder.enter(GameLoopState, SpawnPlayer);
    builder.update(GameLoopState, CameraFollow);
    builder.update(GameLoopState, Talk);
    builder.handle(CollisionTargetHit.NAME, GetHitByObstacle);
}
