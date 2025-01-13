import Layer from "@/models/games/common/Layer.ts";
import LayerType from "@/models/games/common/LayerType.ts";
import Direction from "@/models/games/common/Direction.ts";
import Point from "@/models/games/common/Point.ts";
import LayerItem from "@/models/games/common/LayerItem.ts";
import MathUtils from "@/utils/MathUtils.ts";

class BackgroundSpaceLayer extends Layer {

  type: LayerType = LayerType.Space
  direction: Direction = Direction.TopToBottom
  density: number = 0

  addStar() {
    const starX = MathUtils.randInt(0, this.size.x)
    const starY = MathUtils.randInt(0, this.size.y)
    const styleClassName = MathUtils.randInt(0, 50) === 49
      ? "star-big"
      : "star"

    const star = new LayerItem(styleClassName, LayerType.Space, true)
    star.styleClassName = styleClassName
    star.position = new Point(starX, starY)

    this.addItem(star)
    return this
  }

}

export default BackgroundSpaceLayer
