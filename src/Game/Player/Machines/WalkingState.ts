import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Sprite from "../../../2B2D/Components/Sprite";
import Velocity from "../../../2B2D/Components/Velocity";
import MachineState from "../../../2B2D/MachineState";
import Update from "../../../2B2D/Update";
import Player from "../Components/Player";
import BasePlayerState from "./BasePlayerState";
import IdleState from "./IdleState";

export default class WalkingState extends BasePlayerState {
  readonly updateImmediately = true;

  private constructor() { super(); }

  public static readonly Instance = new WalkingState();


  protected onEnter(update: Update, components: { entity: number; player: Player; velocity: Velocity; animation: Animated; sprite: Sprite; body: KineticBody; }): void {
    const { animation } = components;
    animation.tag = 'PlayerIdle'; //TODO, update to walk animation
  }

  protected onUpdate(update: Update, components: { entity: number; player: Player; input:MappedInput, velocity: Velocity; animation: Animated; sprite: Sprite; body: KineticBody; }): MachineState | undefined {
    const { body, player } = components;
    const { space, left, right, up, down } = this.getKeys(update, components);

    if (!player.controlsEnabled || (!left && !right && !up && !down)) {
      return IdleState.Instance;
    }

    this.applyLeftAndRightVelocity(update, components);
  }
}