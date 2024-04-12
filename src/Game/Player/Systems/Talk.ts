import MappedInput from "../../../2B2D/Components/MappedInput";
import Parent from "../../../2B2D/Components/Parent";
import Position from "../../../2B2D/Components/Position";
import Sprite from "../../../2B2D/Components/Sprite";
import Timer from "../../../2B2D/Components/Timer";
import TweenChain from "../../../2B2D/Components/TweenChain";
import UseSpriteRenderer from "../../../2B2D/Components/UseSpriteRenderer";
import Color from "../../../2B2D/Math/Color";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import Layers from "../../Layers";
import Player from "../Components/Player";
import TalkRadius from "../Components/TalkRadius";
import PlayerActions from "../PlayerActions";
import StartedTalkingSignal from "../Signals/StartedTalkingSignal";

export default function Talk(update: Update) {
  const existing = update.single([ TalkRadius.NAME ]);
  const playerInput = update.single([ Player.NAME, MappedInput.NAME ]);

  if (!playerInput)
    return;

  const [ _player, input ] = playerInput.components as [ Player, MappedInput ];

  const isSpace = input.isPressed(update, PlayerActions.Space);

  if (existing) {
    const [ radius ] = existing.components as [ TalkRadius ];

    radius.time -= update.delta();
    if (radius.time < 0) {
      update.despawn(existing.entity);
    }

    if (!isSpace) {
      update.data.world.remove(existing.entity, TweenChain.NAME);
      update.data.world.add(existing.entity, TweenChain.build()
        .andThen(200, b => b.color(Color.White(0)))
        .chain()
      );
      update.data.world.add(existing.entity, new Timer(200));
    }

    return;
  }

  if (!isSpace)
    return;

  update.signals.send(StartedTalkingSignal);
  
  update.spawn([
    new TalkRadius(500 * 3),
    new Parent(playerInput.entity),
    new Sprite(
      GameAssets.JamAssets.Texture.Handle,
      GameAssets.JamAssets.Atlas.Handle,
      Layers.Entities,
      '26'
    ),
    Position.fromXY(0, 0),
    TweenChain.build()
      .andThen(500, step => step
        .scale(new Vec2(4, 4))
        .color(new Color(1, 0.5, 0.5, 1))
      )
      .andThen(500, step => step
        .scale(new Vec2(4, 4))
        .color(new Color(1, 0.5, 0.5, 1))
      )
      .andThen(500, step => step
        .scale(new Vec2(1, 1))
        .color(new Color(1, 0.5, 0.5, 0))
      )
     .chain(),
    UseSpriteRenderer
  ]);
}