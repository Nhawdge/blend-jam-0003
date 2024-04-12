import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import { Entity } from "../../../2B2D/Entity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import MovingGhost from "../Components/MovingGhost";

export default abstract class BaseMovingGhostState implements MachineState {
  readonly abstract updateImmediately: boolean;
  readonly speed: number = 0.03;
  readonly drag: number = 0.8;


  // Keep re-using this query to get better query caching
  getMovingGhost(update: Update) {
    const query = update.single([MovingGhost.NAME, MappedInput.NAME, Velocity.NAME, Animated.NAME, Sprite.NAME, KineticBody.NAME]);
    if (!query)
      return;

    var [movingGhost, input, velocity, animation, sprite, body] = query.components as [MovingGhost, MappedInput, Velocity, Animated, Sprite, KineticBody];
    return { entity: query.entity, movingGhost, input, velocity, animation, sprite, body };
  }

  protected abstract onEnter(update: Update, components: { entity: Entity, movingGhost: MovingGhost, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): void;
  protected abstract onUpdate(update: Update, components: { entity: Entity, movingGhost: MovingGhost, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): MachineState | undefined;

  enter(update: Update): void {
    var movingGhost = this.getMovingGhost(update);
    if (!movingGhost)
      return;

    this.onEnter(update, movingGhost);
  }


  update(update: Update): MachineState | undefined {
    var movingGhost = this.getMovingGhost(update);
    if (!movingGhost)
      return;

    return this.onUpdate(update, movingGhost);
  }

  applyVelocity(update: Update, components: { input: MappedInput, velocity: Velocity, movingGhost: MovingGhost, sprite: Sprite }) {

    const { velocity, movingGhost, sprite } = components;

    let newVel = velocity.velocity;
    //TODO: add logic for moving wall velocity.

    velocity.velocity = newVel.scalarMultiply(this.drag);
  }
}