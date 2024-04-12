import Component from "../../../2B2D/Component";

export default class MovingGhost implements Component {
    static readonly NAME: string = 'Moving Ghost';
    readonly name: string = MovingGhost.NAME;
    controlsEnabled: boolean = true;
}