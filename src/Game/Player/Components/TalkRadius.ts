import Component from "../../../2B2D/Component";

export default class TalkRadius implements Component {
  static readonly NAME:string = 'TalkRadius';
  readonly name:string = TalkRadius.NAME;

  constructor(public time:number) { }
}