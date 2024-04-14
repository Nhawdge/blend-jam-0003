import Update from "../2B2D/Update";
import GameAssets from "./GameAssets";

// HACK to get the background music to play once the modal is closed

let shouldPlay = false;
let isPlaying = false;

document.addEventListener('modalClosed', e => {
  shouldPlay = true;
});

export default function PlayBackgroundMusic(update: Update) {
  // console.log([shouldPlay, isPlaying]);

  if (shouldPlay && !isPlaying) {
    const audio = update.audio();

    audio.play(GameAssets.Sounds.Music.Handle, true, 0.5, true);

    isPlaying = true;
  }
}