import LdtkData from "../../../2B2D/Assets/LdtkData";
import { SpriteAtlas } from "../../../2B2D/Assets/SpriteAtlasAsset";
import Animated from "../../../2B2D/Components/Animated";
import KineticBody from "../../../2B2D/Components/KineticBody";
import MappedInput from "../../../2B2D/Components/MappedInput";
import Position from "../../../2B2D/Components/Position";
import Sprite from "../../../2B2D/Components/Sprite";
import StateMachine from "../../../2B2D/Components/StateMachine";
import TweenChain from "../../../2B2D/Components/TweenChain";
import UseSpriteRenderer from "../../../2B2D/Components/UseSpriteRenderer";
import Velocity from "../../../2B2D/Components/Velocity";
import Weight from "../../../2B2D/Components/Weight";
import Vec2 from "../../../2B2D/Math/Vec2";
import Update from "../../../2B2D/Update";
import GameAssets from "../../GameAssets";
import GameLoopCleanup from "../../GameLoop/Components/GameLoopCleanup";
import GameStateResouce from "../../GameStateResource";
import Layers from "../../Layers";
import MovingObstacle from "../Components/MovingObstacle";
import IdleState from "../Machines/IdleState";

// Blocks per second
const speed = 0.3 * 1000;

export default function SpawnMovingObstacle(update: Update) {
    const gameState = update.resource<GameStateResouce>(GameStateResouce.NAME);
    const assets = update.assets();

    const ldtk = assets.assume<LdtkData>(GameAssets.Clockworld.Ldtk.Handle);

    const levelName = `Level_${gameState.level}`;
    const level = ldtk.levels.find(x => x.identifier == levelName)!;
    const entities = level.layerInstances.find(x => x.__identifier == 'Entities')!;
    const movingObstacles = entities.entityInstances.filter(x => x.__identifier == 'MovingObstacle')!; // TODO get the entitiy name from ldtk

    for (var movingObstacle of movingObstacles) {
      if (movingObstacle.fieldInstances.length == 0)
        continue;

      const destinationPoint = movingObstacle.fieldInstances[0].__value;

        const gridHeight = level.pxHei / 32;
        const offset = new Vec2(level.pxWid, level.pxHei).scalarMultiply(-0.5);
        const position = (new Vec2(movingObstacle.px[0], level.pxHei - movingObstacle.px[1]).add(offset)).add(new Vec2(16, -16));
        const destination = new Vec2(32, 32).multiply(new Vec2(destinationPoint.cx, gridHeight - destinationPoint.cy)).add(offset).add(new Vec2(16, -16));
        console.log(destination);
        
        const pathLength = Math.max( Math.abs(destinationPoint.cx), Math.abs(destinationPoint.cy)  );

        const movementChain = TweenChain.build()
          .andThen(pathLength * speed, s => s.pos(destination))
          .andThen(1000)
          .andThen(pathLength * speed, s => s.pos(position))
          .chain();

        movementChain.loop = true;
        movementChain.enabled = false;

        /* TODO: add the spawn once we have textures from LDTK, from GameAssets.ts
        */
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
            new MovingObstacle(destination),
            GameLoopCleanup,
            new StateMachine(IdleState.Instance),
            new Animated('MovingWall_Idle'),
            movementChain
        ]);
    }
}