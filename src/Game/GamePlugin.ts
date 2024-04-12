import Builder from "../2B2D/Builder";
import InitPlugin from "./Init/InitPlugin";

export default function GamePlugin(builder: Builder) {
  builder.plugin(InitPlugin);
}