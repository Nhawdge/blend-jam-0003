import loadSpriteAtlasAsset from "../2B2D/Assets/SpriteAtlasAsset";
import loadTextureAsset from "../2B2D/Assets/TextureAsset";
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
  Load: (assets: AssetsResource) => {
    assets.add(GameAssets.JamAssets.Texture.Load()),
    assets.add(GameAssets.JamAssets.Atlas.Load())
  },
  IsLoaded: (assets: AssetsResource) => {
    return assets.loaded([
      GameAssets.JamAssets.Texture.Handle,
      GameAssets.JamAssets.Atlas.Handle
    ]);
  }
}

export default GameAssets;
