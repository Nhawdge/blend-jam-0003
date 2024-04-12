import Builder from "../../2B2D/Builder";
import Layers from "../Layers";
import LoadingState from "./States/LoadingState";
import SetupRendering from "./Systems/SetupRendering";
import StartLoading from "./Systems/StartLoading";

export default function InitPlugin(builder: Builder) {
  builder.enter(LoadingState, StartLoading);
  builder.enter(LoadingState, SetupRendering);

  builder.layer(Layers.BG);
  builder.layer(Layers.FG);
  builder.layer(Layers.Entities);
  builder.layer(Layers.Hud);

  builder.startState(LoadingState);
}