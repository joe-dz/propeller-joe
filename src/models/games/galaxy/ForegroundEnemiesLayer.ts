import LayerType from "@/models/games/common/LayerType.ts";
import ForegroundCharacterLayer from "@/models/games/common/ForegroundCharacterLayer.ts";
import Enemy from "@/models/games/galaxy/Enemy.ts";

class ForegroundEnemiesLayer extends ForegroundCharacterLayer {

  type: LayerType = LayerType.Enemies
  items: Enemy[] = []

}

export default ForegroundEnemiesLayer
