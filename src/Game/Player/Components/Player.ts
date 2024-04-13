import Component from "../../../2B2D/Component";
import Vec2 from "../../../2B2D/Math/Vec2";

export default class Player implements Component {
    static readonly NAME: string = 'Player';
    readonly name: string = Player.NAME;
    controlsEnabled: boolean = true;

    constructor(public originalPosition:Vec2) {

    }
}