import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import LoadedSignal from "../Signals/LoadedSignal";
import LoadingState from "../States/LoadingState";

export default function AwaitLoaded(update: Update) {
  const assets = update.assets();

  const isLoaded = GameAssets.IsLoaded(assets);
  if (isLoaded) {
    GameAssets.LoadLevelTextures(assets);
    update.exit(LoadingState);
    update.signals.send(LoadedSignal);
  }
}