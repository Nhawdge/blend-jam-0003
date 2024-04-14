import LdtkData from "../../../2B2D/Assets/LdtkData";
import CollisionTarget from "../../../2B2D/Components/CollisionTarget";
import Position from "../../../2B2D/Components/Position";
import StaticBody from "../../../2B2D/Components/StaticBody";
import Tilemap from "../../../2B2D/Components/Tilemap";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import processLdtkIntGrid from "../../../2B2D/Utils/LdtkUtilities";
import GameAssets from "../../GameAssets";
import GameLoopCleanup from "../../GameLoop/Components/GameLoopCleanup.js";
import GameLoopState from "../../GameLoop/States/GameLoopState.js";
import GameStateResouce from "../../GameStateResource";
import Layers from "../../Layers";
import TouchWinFlag from "../../Player/Systems/TouchWinFlag";


export default function SpawnLevel(update: Update) {
  const gamestate = update.resource<GameStateResouce>(GameStateResouce.NAME);

  const levelId = GameAssets.Clockworld.Tilemap.LevelName(gamestate.level);
  const tileHandle = GameAssets.Clockworld.Tilemap.Handle(levelId, 'Tiles');
  const backgroundHandle = GameAssets.Clockworld.Tilemap.Handle(levelId, 'Background');

  update.spawn([
    new Tilemap(Layers.FG, GameAssets.Clockworld.Texture.Handle, tileHandle),
    GameLoopCleanup,
    Position.fromXY(0, 0)
  ]);
  update.spawn([
    new Tilemap(Layers.BG, GameAssets.Clockworld.Texture.Handle, backgroundHandle),
    Position.fromXY(0, 0)
  ]);

  const assets = update.assets();
  const ldtk = assets.assume<LdtkData>(GameAssets.Clockworld.Ldtk.Handle);


  processLdtkIntGrid(ldtk, levelId, 'Collisions', 1, (pos, size) => {
    update.spawn([
      GameLoopCleanup,
      new Position(pos),
      new StaticBody(size),
    ]);
  });
}

export function GoToNextLevel(update: Update) {
  update.exit(GameLoopState)
  const gamestate = update.resource<GameStateResouce>(GameStateResouce.NAME);
  gamestate.level++;


  var cleanUp = update.query([GameLoopCleanup])
  cleanUp.forEach(x => update.despawn(x.entity));

  var tiles = update.query([])
  tiles.forEach(x => update.despawn(x.entity));


  update.enter(GameLoopState)
}