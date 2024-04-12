import Component from "../../../2B2D/Component";

export default class WinFlag implements Component {
    static readonly NAME: string = 'Win Flag';
    readonly name: string = WinFlag.NAME;
    controlsEnabled: boolean = true;
}