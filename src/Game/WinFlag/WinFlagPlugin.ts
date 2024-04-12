import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
export default function WinFlagPlugin(builder: Builder)
{
    builder.enter(GameLoopState, SpawnWinFlag);
}
