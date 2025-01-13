import Layer from "@/models/games/common/Layer.ts";
import LayerItem from "@/models/games/common/LayerItem.ts";
import Point from "@/models/games/common/Point.ts";

class ForegroundLayer extends Layer {

  items: LayerItem[] = []

  constructor(styleClassName: string, size: Point, position: Point = new Point(0, 0)) {
    super();
    this.styleClassName = styleClassName
    this.size = size
    this.position = position
  }

}

export default ForegroundLayer
