import Position from "../../../2B2D/Components/Position";
import TweenChain from "../../../2B2D/Components/TweenChain";
import { ResolvableEntity } from "../../../2B2D/Entity";
import Color from "../../../2B2D/Math/Color";
import Signal from "../../../2B2D/Signal";
import CollisionTargetHit from "../../../2B2D/Signals/CollisionTargetHit";
import Update from "../../../2B2D/Update";
import ObstacleTarget from "../../MovingObstacle/ObstacleTarget";
import Player from "../Components/Player";

export default function GetHitByObstacle(update: Update, signals: Signal[]) {
  const evs = signals as CollisionTargetHit[];
  const playerWasHit = evs.find(x => x.sender == ObstacleTarget);
  if (!playerWasHit)
    return;

  const player = update.single([ Player.NAME, Position.NAME ]);
  if (!player)
    return;

  const [ playa, position ] = player.components as [ Player, Position ];
  position.pos = playa.originalPosition;

  // Lame "flashing" of character
  const chain = TweenChain.build()
    .andThen(100, a => a.color(Color.White(0.5)))
    .andThen(100, a => a.color(Color.White(1)))
    .andThen(100, a => a.color(Color.White(0.5)))
    .andThen(100, a => a.color(Color.White(1)))
    .andThen(100, a => a.color(Color.White(0.5)))
    .andThen(100, a => a.color(Color.White(1)))
    .andThen(100, a => a.color(Color.White(0.5)))
    .andThen(100, a => a.color(Color.White(1)))
    .andThen(100, a => a.color(Color.White(0.5)))
    .andThen(100, a => a.color(Color.White(1)))
    .andThen(100, a => a.color(Color.White(0.5)))
    .andThen(100, a => a.color(Color.White(1)))
    .chain(ResolvableEntity.Resolved(player.entity));
  
  update.spawn([
    chain
  ]);
}