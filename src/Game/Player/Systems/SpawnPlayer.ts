import LdtkData from "../../../2B2D/Assets/LdtkData";
import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Position from "../../../2B2D/Components/Position";
import Sprite from "../../../2B2D/Components/Sprite";
import StateMachine from "../../../2B2D/Components/StateMachine";
import UseSpriteRenderer from "../../../2B2D/Components/UseSpriteRenderer";
import Velocity from "../../../2B2D/Components/Velocity";
import Weight from "../../../2B2D/Components/Weight";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import GameLoopCleanup from "../../GameLoop/Components/GameLoopCleanup";
import GameStateResouce from "../../GameStateResource";
import Layers from "../../Layers";
import Player from "../Components/Player";
import IdleState from "../Machines/IdleState";
import PlayerActions from "../PlayerActions";


export default function SpawnPlayer(update: Update) {
  const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
  const assets = update.assets();

  const ldtk = assets.assume<LdtkData>(GameAssets.Clockworld.Ldtk.Handle);

  const levelName = GameAssets.Clockworld.Tilemap.LevelName(gameState.level);
  const level = ldtk.levels.find(x => x.identifier == levelName)!;
  const entities = level.layerInstances.find(x => x.__identifier == 'Entities')!;
  const player = entities.entityInstances.find(x => x.__identifier == 'Player')!;
  const offset = new Vec2(level.pxWid, level.pxHei).scalarMultiply(-0.5);
  const position = new Vec2(player.px[0], level.pxHei - player.px[1]).add(offset);

  const inputMap = MappedInput.build(0, b => {
    b.for(PlayerActions.Up, a => {
      a.keyboard('w');
      a.keyboard('W');
      a.keyboard('ArrowUp');
      a.negative(1, 0.25);
    });
    b.for(PlayerActions.Down, a => {
      a.keyboard('s');
      a.keyboard('S');
      a.keyboard('ArrowDown');
      a.positive(1, 0.25);
    });
    b.for(PlayerActions.Left, a => {
      a.keyboard('a');
      a.keyboard('A');
      a.keyboard('ArrowLeft');
      a.negative(0, 0.25);
    });
    b.for(PlayerActions.Right, a => {
      a.keyboard('d');
      a.keyboard('D');
      a.keyboard('ArrowRight');
      a.positive(0, 0.25);
    });
    b.for(PlayerActions.Space, a => {
      a.keyboard(' ');
      a.button(0);
    });
  });

  update.spawn([
    new Position(position),
    new Sprite(
      GameAssets.JamAssets.Texture.Handle,
      GameAssets.JamAssets.Atlas.Handle,
      Layers.Entities,
      '0'
    ),
    UseSpriteRenderer,
    new Velocity(Vec2.ZERO),
    new KineticBody(new Vec2(10, 15)),
    new Weight(0),
    new Player(position),
    GameLoopCleanup,
    new StateMachine(IdleState.Instance),
    inputMap,
    new Animated('PlayerIdle')
  ]);
}