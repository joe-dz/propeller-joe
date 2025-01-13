import LayerType from "@/models/games/common/LayerType.ts";
import ForegroundLayer from "@/models/games/common/ForegroundLayer.ts";
import Projectile from "@/models/games/galaxy/Projectile.ts";

class ForegroundShootingLayer extends ForegroundLayer {

  type: LayerType = LayerType.Projectiles
  items: Projectile[] = []

}

export default ForegroundShootingLayer
