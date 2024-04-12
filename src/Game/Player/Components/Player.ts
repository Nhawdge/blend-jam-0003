import Component from "../../../2B2D/Component";

export default class Player implements Component {
    static readonly NAME: string = 'Player';
    readonly name: string = Player.NAME;
    controlsEnabled: boolean = true;
}