import Position from "../../../2B2D/Components/Position";
import Tilemap from "../../../2B2D/Components/Tilemap";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import GameStateResouce from "../../GameStateResource";
import Layers from "../../Layers";

export default function SpawnLevel(update: Update) {
  const gamestate = update.resource<GameStateResouce>(GameStateResouce.NAME);

  const levelId = GameAssets.Clockworld.Tilemap.LevelName(gamestate.level);
  const handle = GameAssets.Clockworld.Tilemap.Handle(levelId, 'Tiles');

  update.spawn([
    new Tilemap(Layers.BG, GameAssets.Clockworld.Texture.Handle, handle),
    Position.fromXY(0, 0)
  ]);
}