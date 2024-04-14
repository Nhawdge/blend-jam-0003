import Builder from "../../2B2D/Builder";
import Layers from "../Layers";
import LoadingState from "./States/LoadingState";
import AwaitLoaded from "./Systems/AwaitLoaded";
import FadeoutBlackscreen from "./Systems/FadeoutBlackscreen";
import SetupRendering from "./Systems/SetupRendering";
import StartFadeoutBlackscreen from "./Systems/StartFadeoutBlackscreen";
import StartLoading from "./Systems/StartLoading";

export default function InitPlugin(builder: Builder) {
  builder.enter(LoadingState, StartLoading);
  builder.enter(LoadingState, SetupRendering);

  builder.update(LoadingState, AwaitLoaded);

  builder.layer(Layers.BG);
  builder.layer(Layers.FG);
  builder.layer(Layers.Entities);
  builder.layer(Layers.Hud);

  builder.startState(LoadingState);
  builder.exit(LoadingState, StartFadeoutBlackscreen);

  // Bit of a hack.
  builder.always(FadeoutBlackscreen);
}