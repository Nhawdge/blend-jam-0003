import LdtkData from "../../../2B2D/Assets/LdtkData";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Position from "../../../2B2D/Components/Position";
import Sprite from "../../../2B2D/Components/Sprite";
import StateMachine from "../../../2B2D/Components/StateMachine";
import UseSpriteRenderer from "../../../2B2D/Components/UseSpriteRenderer";
import Velocity from "../../../2B2D/Components/Velocity";
import Weight from "../../../2B2D/Components/Weight";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import GameLoopCleanup from "../../GameLoop/Components/GameLoopCleanup";
import GameStateResouce from "../../GameStateResource";
import Layers from "../../Layers";
import WinFlag from "../Components/WinFlag";

export default function SpawnWinFlag(update: Update) {
    const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
    const assets = update.assets();

  const ldtk = assets.assume<LdtkData>(GameAssets.Clockworld.Ldtk.Handle);

  const levelName = GameAssets.Clockworld.Tilemap.LevelName(gameState.level);
    const level = ldtk.levels.find(x => x.identifier == levelName)!;
    const entities = level.layerInstances.find(x => x.__identifier == 'Entities')!;
  const winFlag = entities.entityInstances.find(x => x.__identifier == 'WinFlag')!;
    const offset = new Vec2(level.pxWid, level.pxHei).scalarMultiply(-0.5);
    const position = new Vec2(winFlag.px[0], level.pxHei - winFlag.px[1]).add(offset);

   update.spawn([ //TODO review
       new Position(position),
       new Sprite(
         GameAssets.JamAssets.Texture.Handle,
         GameAssets.JamAssets.Atlas.Handle,
         Layers.Entities,
         '0'
       ),
       UseSpriteRenderer,
       new Velocity(Vec2.ZERO),
       new KineticBody(new Vec2(16, 16)),
        new Weight(0),
       new WinFlag(),
       GameLoopCleanup,
   ]);   
}