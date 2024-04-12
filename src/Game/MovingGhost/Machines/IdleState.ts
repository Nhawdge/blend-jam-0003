import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import MovingGhost from "../Components/MovingGhost";
import BaseMovingGhostState from "./BaseMovingGhostState";

export default class IdleState extends BaseMovingGhostState {
  readonly updateImmediately = true;

  private constructor() { super(); }

  public static readonly Instance = new IdleState();

  protected onEnter(update: Update, components: { entity: number; movingGhost: MovingGhost; velocity: Velocity; animation: Animated; sprite: Sprite; body: KineticBody; }): void {
    const { animation } = components;
    animation.tag = 'Idle';
  }

  protected onUpdate(update: Update, components: { entity: number; movingGhost: MovingGhost; input: MappedInput, velocity: Velocity; animation: Animated; sprite: Sprite; body: KineticBody; }): MachineState | undefined {
    const { body, movingGhost } = components;
    //TODO add logic to change state.

    this.applyVelocity(update, components);
  }
}