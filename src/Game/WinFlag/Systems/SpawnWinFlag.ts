import LdtkData from "../../../2B2D/Assets/LdtkData";
import Animated from "../../../2B2D/Components/Animated.js";
import CollisionTarget from "../../../2B2D/Components/CollisionTarget";
import KineticBody from "../../../2B2D/Components/KineticBody";
import Parent from "../../../2B2D/Components/Parent";
import Position from "../../../2B2D/Components/Position";
import Sprite from "../../../2B2D/Components/Sprite";
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
import WinFlagTarget from "../WinFlagTarget";

export default function SpawnWinFlag(update: Update) {
  const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
  const assets = update.assets();

  const ldtk = assets.assume<LdtkData>(GameAssets.Clockworld.Ldtk.Handle);

  const levelName = GameAssets.Clockworld.Tilemap.LevelName(gameState.level);
  const level = ldtk.levels.find(x => x.identifier == levelName)!;
  const entities = level.layerInstances.find(x => x.__identifier == 'Entities')!;
  const flags = entities.entityInstances.filter(x => x.__identifier == 'WinFlag')!;
  for (const flag of flags) {
    const offset = new Vec2(level.pxWid, level.pxHei).scalarMultiply(-0.5);
    const position = new Vec2(flag.px[0], level.pxHei - flag.px[1]).add(offset);

    const controller = update.spawn([
      new Position(position.add(new Vec2(16, -16))),
      new Sprite(
        GameAssets.JamAssets.Texture.Handle,
        GameAssets.JamAssets.Atlas.Handle,
        Layers.Entities,
        '0'
      ),
      UseSpriteRenderer,
      new Velocity(Vec2.ZERO),
      new Weight(0),
      new WinFlag(),
      GameLoopCleanup,
      new Animated('WinFlag')
    ]);

    const collisionSize = new Vec2(8, 12);
    update.spawn([
      new Parent(controller),
      new CollisionTarget(WinFlagTarget, collisionSize),
      Position.fromXY(0, -2)
    ])
  }
}