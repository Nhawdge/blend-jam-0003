import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import Squawks from "../../Squawks";
import PlayingSound from "../Components/PlayingSound";

let remaining:{ start: number, duration: number }[] = [];

export default function PlaySounds(update: Update) {
  const keys = update.keys();
  const space = keys.keyJustReleased(' ');
  const audio = update.audio();

  const playing = update.single([ PlayingSound.NAME ]);
  if (playing) {
    const [ sound ] = playing.components as [ PlayingSound ] ;
    sound.time -= update.delta();

    if (sound.time < 0) {
      update.despawn(playing.entity);
    }

    return;
  }

  if (space) {
    if (remaining.length === 0) {
      remaining = Squawks.slice();
    }

    const index = Math.floor(remaining.length * Math.random());
    const squawk = remaining[index];

    console.log(remaining);
    remaining.splice(index, 1);

    audio.play(GameAssets.Sounds.Squawks.Handle, true, 1, false, squawk.start, squawk.duration);
    update.spawn([
      new PlayingSound(squawk.duration * 1000)
    ]);
  }
}