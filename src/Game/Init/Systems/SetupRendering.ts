import Camera from "../../../2B2D/Components/Camera";
import Gradient from "../../../2B2D/Components/Gradient";
import Parent from "../../../2B2D/Components/Parent";
import Position from "../../../2B2D/Components/Position";
import Color from "../../../2B2D/Math/Color";
import Vec2 from "../../../2B2D/Math/Vec2";
import RenderGradients from "../../../2B2D/Rendering/GradientRenderer";
import RenderSprites from "../../../2B2D/Rendering/SpriteRenderer";
import RenderTilemaps from "../../../2B2D/Rendering/TilemapRenderer";
import Update from "../../../2B2D/Update";
import Layers from "../../Layers";
import BlackScreen from "../Components/BlackScreen";
import CameraTag from "../Components/CameraTag";

export default function SetupRendering(update: Update) {
  const parent = update.spawn([
    CameraTag,
    Position.fromXY(0, 0)
  ]);

  update.spawn([
    Camera,
    Position.fromXY(0, 0),
    new Parent(parent)
  ]);

  update.addRenderer(RenderSprites);
  update.addRenderer(RenderTilemaps);
  update.addRenderer(RenderGradients);

  update.spawn([
    Gradient.SolidBox(Layers.Hud, Color.Black(1), new Vec2(800, 800)),
    Position.fromXY(0, 0),
    BlackScreen
  ]);
}