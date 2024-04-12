import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import { Entity } from "../../../2B2D/Entity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import MovingObstacle from "../Components/MovingObstacle";

export default abstract class BaseMovingObstacleState implements MachineState {
  readonly abstract updateImmediately: boolean;
  readonly speed: number = 0.03;
  readonly drag: number = 0.8;


  // Keep re-using this query to get better query caching
  getMovingObstacle(update: Update) {
    const query = update.single([MovingObstacle.NAME, MappedInput.NAME, Velocity.NAME, Animated.NAME, Sprite.NAME, KineticBody.NAME]);
    if (!query)
      return;

    var [movingObstacle, input, velocity, animation, sprite, body] = query.components as [MovingObstacle, MappedInput, Velocity, Animated, Sprite, KineticBody];
    return { entity: query.entity, movingObstacle, input, velocity, animation, sprite, body };
  }

  protected abstract onEnter(update: Update, components: { entity: Entity, movingObstacle: MovingObstacle, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): void;
  protected abstract onUpdate(update: Update, components: { entity: Entity, movingObstacle: MovingObstacle, input: MappedInput, velocity: Velocity, animation: Animated, sprite: Sprite, body: KineticBody }): MachineState | undefined;

  enter(update: Update): void {
    var movingObstacle = this.getMovingObstacle(update);
    if (!movingObstacle)
      return;

    this.onEnter(update, movingObstacle);
  }


  update(update: Update): MachineState | undefined {
    var movingObstacle = this.getMovingObstacle(update);
    if (!movingObstacle)
      return;

    return this.onUpdate(update, movingObstacle);
  }

  applyVelocity(update: Update, components: { input: MappedInput, velocity: Velocity, movingObstacle: MovingObstacle, sprite: Sprite }) {

    const { velocity, movingObstacle, sprite } = components;

    let newVel = velocity.velocity;
    //TODO: add logic for moving wall velocity.

    velocity.velocity = newVel.scalarMultiply(this.drag);
  }
}