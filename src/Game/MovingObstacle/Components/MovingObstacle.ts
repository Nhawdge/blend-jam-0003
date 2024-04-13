import Component from "../../../2B2D/Component";
import Vec2 from "../../../2B2D/Math/Vec2";

export default class MovingObstacle implements Component {
    static readonly NAME: string = 'Moving Obstacle';
    readonly name: string = MovingObstacle.NAME;
    controlsEnabled: boolean = true;

    constructor(public destination:Vec2) { }
}