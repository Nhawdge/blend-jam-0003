import Timer from "../../../2B2D/Components/Timer";
import Update from "../../../2B2D/Update";
import BlackScreen from "../Components/BlackScreen";

export default function StartFadeoutBlackscreen(update: Update) {
  const screen = update.single([ BlackScreen ]);

  if (!screen)
    return;

  update.data.world.add(screen.entity, new Timer(1000));
}
