import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import { Entity } from "../../../2B2D/Entity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import MovingWall from "../Components/MovingWall";

export default abstract class BaseMovingWallState implements MachineState {
  readonly abstract updateImmediately: boolean;
  readonly speed: number = 0.03;
  readonly drag: number = 0.8;


  // Keep re-using this query to get better query caching
  getMovingWall(update: Update) {
    const query = update.single([MovingWall.NAME, MappedInput.NAME, Velocity.NAME, Animated.NAME, Sprite.NAME, KineticBody.NAME]);
    if (!query)
      return;

    var [movingWall, input, velocity, animation, sprite, body] = query.components as [MovingWall, MappedInput, Velocity, Animated, Sprite, KineticBody];
    return { entity: query.entity, movingWall, input, velocity, animation, sprite, body };
  }

  protected abstract onEnter(update: Update, components: { entity: Entity, movingWall: MovingWall, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): void;
  protected abstract onUpdate(update: Update, components: { entity: Entity, movingWall: MovingWall, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): MachineState | undefined;

  enter(update: Update): void {
    var movingWall = this.getMovingWall(update);
    if (!movingWall)
      return;

    this.onEnter(update, movingWall);
  }


  update(update: Update): MachineState | undefined {
    var movingWall = this.getMovingWall(update);
    if (!movingWall)
      return;

    return this.onUpdate(update, movingWall);
  }

  applyVelocity(update: Update, components: { input: MappedInput, velocity: Velocity, movingWall: MovingWall, sprite: Sprite }) {

    const { velocity, movingWall, sprite } = components;

    let newVel = velocity.velocity;
    //TODO: add logic for moving wall velocity.

    velocity.velocity = newVel.scalarMultiply(this.drag);
  }
}