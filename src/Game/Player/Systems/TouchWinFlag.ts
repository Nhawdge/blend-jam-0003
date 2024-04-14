import Position from "../../../2B2D/Components/Position";
import Signal from "../../../2B2D/Signal";
import CollisionTargetHit from "../../../2B2D/Signals/CollisionTargetHit";
import Update from "../../../2B2D/Update";
import NextLevel from "../../GameLoop/States/NextLevel.js";
import GameStateResouce from "../../GameStateResource.js";
import SpawnLevel from "../../Level/Systems/SpawnLevel";
import WinFlagTarget from "../../WinFlag/WinFlagTarget";
import Player from "../Components/Player";
import PlayerTouchedWinFlag from "../Signals/PlayerTouchedWinFlag";


export default function TouchWinFlag(update: Update, signals: Signal[]) {
    console.log('touchFlagSignals: ' + signals);

    const evs = signals as CollisionTargetHit[];
    const playerTouchedWinFlag = evs.find(x => x.sender == WinFlagTarget);
 
    if (!playerTouchedWinFlag) {
        return;
    }

    const player = update.single([ Player.NAME, Position.NAME ]);
    if (!player)
      return;

    update.signals.send(NextLevel);
}