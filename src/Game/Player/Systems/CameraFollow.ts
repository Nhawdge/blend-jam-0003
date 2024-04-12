import Component from "../../../2B2D/Component";
import Position from "../../../2B2D/Components/Position";
import Update from "../../../2B2D/Update";
import CameraTag from "../../Init/Components/CameraTag";
import Player from "../Components/Player";

export default function CameraFollow(update: Update) {
  const player = update.single([ Player.NAME, Position.NAME ]);
  const camera = update.single([ CameraTag, Position.NAME ]);

  if (!player || !camera)
    return;

  const [ _p, playerPos ] = player.components as [ Component, Position ];
  const [ _c, cameraPos ] = camera.components as [ Component, Position ];

  cameraPos.pos = playerPos.pos;
}