import Component from "../../../2B2D/Component";
import Gradient from "../../../2B2D/Components/Gradient";
import Timer from "../../../2B2D/Components/Timer";
import Color from "../../../2B2D/Math/Color";
import Update from "../../../2B2D/Update";
import BlackScreen from "../Components/BlackScreen";


export default function FadeoutBlackscreen(update: Update) {
  const screen = update.single([ BlackScreen, Timer.NAME, Gradient.NAME ]);

  if (!screen)
    return;

  const [ _b, timer, grad ] = screen.components as [ Component, Timer, Gradient ];

  const alpha = 1 - (timer.currentTime / timer.totalTime);
  const color = Color.Black(alpha);
  grad.nw = grad.ne = grad.sw = grad.se = color;
}