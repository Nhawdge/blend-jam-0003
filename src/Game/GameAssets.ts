import loadJsonAsset from "../2B2D/Assets/JsonAsset";
import LdtkData from "../2B2D/Assets/LdtkData";
import loadSpriteAtlasAsset, { generateTiledSpriteAtlas } from "../2B2D/Assets/SpriteAtlasAsset";
import loadTextureAsset from "../2B2D/Assets/TextureAsset";
import createTilemapFromLdtkJson from "../2B2D/Assets/TilemapData";
import Vec2 from "../2B2D/Math/Vec2";
import AssetsResource from "../2B2D/Resources/AssetsResource";

const GameAssets = {
  JamAssets: {
    Texture: {
      Handle: 'jamassets-texture',
      Load: () => loadTextureAsset('jamassets-texture', 'assets/JamAssets.png')
    },
    Atlas: {
      Handle: 'jamassets-atlas',
      Load: () => loadSpriteAtlasAsset('jamassets-atlas', 'assets/JamAssets.json')
    }
  },
  Clockworld: {
    Texture: {
      Handle: 'clockworld-texture',
      Load: () => loadTextureAsset('clockworld-texture', 'assets/Clockworld.png')
    },
    Ldtk: {
      Handle: 'clockworld-ldtk',
      Load: () => loadJsonAsset<LdtkData>('clockworld-ldtk', 'assets/Clockworld.ldtk')
    },
    Tilemap: {
      Handle: (id:string, layer:string) => `clockworld-tilemap-${id}-${layer}`,
      LevelName: (id:number) => `Level_${id}`
    },
    Atlas: {
      Handle: 'clockworld-atlas',
      Load: () => generateTiledSpriteAtlas(GameAssets.Clockworld.Atlas.Handle, new Vec2(32,32), new Vec2(3,3), new Vec2(0,0))
    }
  },
  Load: (assets: AssetsResource) => {
    assets.add(GameAssets.JamAssets.Texture.Load());
    assets.add(GameAssets.JamAssets.Atlas.Load());
    assets.add(GameAssets.Clockworld.Texture.Load());
    assets.add(GameAssets.Clockworld.Ldtk.Load());
    assets.add(GameAssets.Clockworld.Atlas.Load());
  },
  IsLoaded: (assets: AssetsResource) => {
    return assets.loaded([
      GameAssets.JamAssets.Texture.Handle,
      GameAssets.JamAssets.Atlas.Handle,
      GameAssets.Clockworld.Texture.Handle,
      GameAssets.Clockworld.Ldtk.Handle,
      GameAssets.Clockworld.Atlas.Handle
    ]);
  },
  LoadLevelTextures: (assets: AssetsResource) => {
    const ldtk = assets.assume<LdtkData>(GameAssets.Clockworld.Ldtk.Handle);

    for (const level of ldtk.levels) {
      const t = GameAssets.Clockworld.Tilemap.Handle(level.identifier, 'Tiles');
      assets.add(createTilemapFromLdtkJson(t, ldtk, level.identifier, 'Tiles', 0));
      const bg = GameAssets.Clockworld.Tilemap.Handle(level.identifier, 'Background');
      assets.add(createTilemapFromLdtkJson(bg, ldtk, level.identifier, 'Background', 0));
    }
  }
}

export default GameAssets;
