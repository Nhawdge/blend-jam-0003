import Animated from "../../../2B2D/Components/Animated";
import Position from "../../../2B2D/Components/Position";
import Sprite from "../../../2B2D/Components/Sprite";
import TweenChain from "../../../2B2D/Components/TweenChain";
import Update from "../../../2B2D/Update";
import TalkRadius from "../../Player/Components/TalkRadius";
import MovingObstacle from "../Components/MovingObstacle";

export default function MoveWhenAppropriate(update: Update) {
  const talkRadius = update.single([TalkRadius.NAME, Sprite.NAME, Position.NAME]);
  const movers = update.query([MovingObstacle.NAME, Position.NAME, Animated.NAME, TweenChain.NAME ]);
  
  if (!talkRadius) {
    for (const mover of movers) {
      const [_obs, _pos, animated, chain] = mover.components as [MovingObstacle, Position, Animated, TweenChain];
      animated.tag = 'MovingWall_Idle';
      chain.enabled = false;
    }
    return;
  }


  const [_radius, radiusSprite, radiusPosition] = talkRadius.components as [TalkRadius, Sprite, Position];

  const playerPos = update.resolvePosition(talkRadius.entity, radiusPosition);
  const distance = (radiusSprite.scale.x * 32) * 0.5;

  for (const mover of movers) {
    const [_obs, pos, animated, chain] = mover.components as [MovingObstacle, Position, Animated, TweenChain];

    const absolutePosition = update.resolvePosition(mover.entity, pos);
    const deltaToPlayer = playerPos.sub(absolutePosition);
    const distanceToPlayer = Math.sqrt((deltaToPlayer.x * deltaToPlayer.x) + (deltaToPlayer.y * deltaToPlayer.y));

    if (distanceToPlayer <= distance) {
      chain.enabled = true;
      animated.tag = 'MovingWall_Moving';
    } else {
      chain.enabled = false;
      animated.tag = 'MovingWall_Idle';
    }
  }

}