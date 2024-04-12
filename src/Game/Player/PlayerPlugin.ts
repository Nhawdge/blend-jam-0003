import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import CameraFollow from "./Systems/CameraFollow";
import SpawnPlayer from "./Systems/SpawnPlayer";

export default function PlayerPlugin(builder: Builder)
{
    builder.enter(GameLoopState, SpawnPlayer);
    builder.update(GameLoopState, CameraFollow);
}
