import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";

export default function StartLoading(update: Update) {
  const assets = update.assets();
  GameAssets.Load(assets);
}