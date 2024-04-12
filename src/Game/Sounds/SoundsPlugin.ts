import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import StartedTalkingSignal from "../Player/Signals/StartedTalkingSignal";
import PlaySounds from "./Systems/PlaySounds";

export default function SoundsPlugin(builder: Builder) {
  builder.handle(StartedTalkingSignal, PlaySounds)
}