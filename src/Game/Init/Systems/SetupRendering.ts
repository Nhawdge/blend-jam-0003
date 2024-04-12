import Camera from "../../../2B2D/Components/Camera";
import Parent from "../../../2B2D/Components/Parent";
import Position from "../../../2B2D/Components/Position";
import RenderGradients from "../../../2B2D/Rendering/GradientRenderer";
import RenderSprites from "../../../2B2D/Rendering/SpriteRenderer";
import RenderTilemaps from "../../../2B2D/Rendering/TilemapRenderer";
import Update from "../../../2B2D/Update";
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
}