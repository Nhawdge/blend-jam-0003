import Builder from "../../2B2D/Builder";
import LoadedSignal from "../Init/Signals/LoadedSignal";
import GameLoopState from "./States/GameLoopState";

export default function GameLoopPlugin(builder: Builder)
{
    builder.handle(LoadedSignal, (update) => update.enter(GameLoopState))
}
