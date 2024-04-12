import Component from "../../../2B2D/Component";

export default class MovingObstacle implements Component {
    static readonly NAME: string = 'Moving Obstacle';
    readonly name: string = MovingObstacle.NAME;
    controlsEnabled: boolean = true;
}