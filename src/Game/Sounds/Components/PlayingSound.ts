import Component from "../../../2B2D/Component";

export default class PlayingSound implements Component {
  static readonly NAME:string = 'PlayingSound';
  readonly name:string = PlayingSound.NAME;

  constructor(public time:number) { }
}