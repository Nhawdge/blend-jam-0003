import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import SpawnWinFlag from "./Systems/SpawnWinFlag";
export default function WinFlagPlugin(builder: Builder)
{
    builder.enter(GameLoopState, SpawnWinFlag);
}
