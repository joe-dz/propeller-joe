import LayerType from "@/models/games/common/LayerType.ts";
import ForegroundCharacterLayer from "@/models/games/common/ForegroundCharacterLayer.ts";
import Player from "@/models/games/galaxy/Player.ts";

class ForegroundPlayersLayer extends ForegroundCharacterLayer {

  type: LayerType = LayerType.Players
  items: Player[] = []

}

export default ForegroundPlayersLayer
