import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import { Entity } from "../../../2B2D/Entity";
import MachineState from "../../../2B2D/MachineState";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import Player from "../Components/Player";
import PlayerActions from "../PlayerActions";


/** Has methods and queries that all the player states use */
export default abstract class BasePlayerState implements MachineState {
  readonly abstract updateImmediately: boolean;
  readonly speed: number = 0.035 / ((1 / 60) * 1000);;
  readonly drag: number = 0.8;


  // Keep re-using this query to get better query caching
  getPlayer(update: Update) {
    const query = update.single([Player.NAME, MappedInput.NAME, Velocity.NAME, Animated.NAME, Sprite.NAME, KineticBody.NAME]);
    if (!query)
      return;

    var [player, input, velocity, animation, sprite, body] = query.components as [Player, MappedInput, Velocity, Animated, Sprite, KineticBody];
    return { entity: query.entity, player, input, velocity, animation, sprite, body };
  }

  protected abstract onEnter(update: Update, components: { entity: Entity, player: Player, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): void;
  protected abstract onUpdate(update: Update, components: { entity: Entity, player: Player, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): MachineState | undefined;

  getKeys(update: Update, components: { input: MappedInput }) {

    const left = components.input.isPressed(update, PlayerActions.Left);
    const right = components.input.isPressed(update, PlayerActions.Right);
    const up = components.input.isPressed(update, PlayerActions.Up);
    const down = components.input.isPressed(update, PlayerActions.Down);
    const space = components.input.isPressed(update, PlayerActions.Space);
    return { left, right, up, down, space };
  }

  enter(update: Update): void {
    var player = this.getPlayer(update);
    if (!player)
      return;

    this.onEnter(update, player);
  }


  update(update: Update): MachineState | undefined {

    var player = this.getPlayer(update);
    if (!player)
      return;

    return this.onUpdate(update, player);
  }

  applyLeftAndRightVelocity(update: Update, components: { input: MappedInput, velocity: Velocity, player: Player, animation: Animated, sprite: Sprite, }) {
    const { left, right, up, down } = this.getKeys(update, components);

    const { velocity, player, sprite, animation } = components;

    const delta = update.delta();

    let newVel = velocity.velocity;
    var isMoving = false;

    if (player.controlsEnabled && left) {
      newVel = newVel.add(new Vec2(-this.speed * delta, 0));
      sprite.scale = new Vec2(-1, 1);
      animation.tag = "PlayerSide";
      isMoving = true;      
    }
    if (player.controlsEnabled && right) {
      newVel = newVel.add(new Vec2(this.speed * delta, 0));
      sprite.scale = new Vec2(1, 1);
      animation.tag = "PlayerSide";
      isMoving = true;
    }
    if (player.controlsEnabled && up) {
      newVel = newVel.add(new Vec2(0, this.speed * delta));
      animation.tag = "PlayerUp";
      isMoving = true;
    }
    if (player.controlsEnabled && down) {
      newVel = newVel.add(new Vec2(0, -this.speed * delta));
      animation.tag = "PlayerDown";
      isMoving = true;
    }
    if (!isMoving) {
      animation.tag = "PlayerIdle";
    }
    velocity.velocity = newVel.scalarMultiply(this.drag);
  }
}