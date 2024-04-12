import LdtkData from "../../../2B2D/Assets/LdtkData";
import Component from "../../../2B2D/Component";
import Position from "../../../2B2D/Components/Position";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import GameStateResouce from "../../GameStateResource";
import CameraTag from "../../Init/Components/CameraTag";
import Player from "../Components/Player";

let levelId: number | undefined = undefined;
let topLeft = Vec2.ZERO;
let bottomRight = Vec2.ZERO;

export default function CameraFollow(update: Update) {

  const player = update.single([ Player.NAME, Position.NAME ]);
  const camera = update.single([ CameraTag, Position.NAME ]);

  if (!player || !camera)
    return;

  const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
  const assets = update.assets();
  
  if (levelId != gameState.level) {
    const ldtk = assets.assume<LdtkData>(GameAssets.Clockworld.Ldtk.Handle);
    const levelName = `Level_${gameState.level}`;
    const level = ldtk.levels.find(x => x.identifier == levelName)!;

    const screenSize = new Vec2(update.data.rendering.width, update.data.rendering.height)
    .scalarMultiply(0.125);
    const levelSize = new Vec2(level.pxWid, level.pxHei).scalarMultiply(0.5);

    topLeft = Vec2.ZERO.sub(levelSize).add(screenSize);
    bottomRight = Vec2.ZERO.add(levelSize).sub(screenSize);

    levelId = gameState.level;
  }

  const [ _p, playerPos ] = player.components as [ Component, Position ];
  const [ _c, cameraPos ] = camera.components as [ Component, Position ];

  cameraPos.pos = playerPos.pos.max(topLeft).min(bottomRight);
}