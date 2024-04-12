import Component from "../../../2B2D/Component";

export default class MovingWall implements Component {
    static readonly NAME: string = 'Moving Wall';
    readonly name: string = MovingWall.NAME;
    controlsEnabled: boolean = true;
}