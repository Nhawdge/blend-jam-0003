import Builder from "../../2B2D/Builder";
import GameLoopState from "../GameLoop/States/GameLoopState";
import PlaySounds from "./Systems/PlaySounds";

export default function SoundsPlugin(builder: Builder) {
  builder.update(GameLoopState, PlaySounds);
}