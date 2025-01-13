import LayerType from "@/models/games/common/LayerType.ts";
import Point from "@/models/games/common/Point.ts";
import Rectangle from "@/models/games/common/Rectangle.ts";
import Direction from "@/models/games/common/Direction.ts";

class LayerItem {

  layerType: LayerType

  id: number = Math.random()
  position: Point = new Point
  size: Point = new Point
  styleClassName: string = ""
  cosmetic: Boolean = false
  direction: Direction | null = null

  constructor(styleClassName: string, layerType: LayerType, cosmetic: Boolean = false) {
    this.styleClassName = styleClassName
    this.layerType = layerType
    this.cosmetic = cosmetic
  }

  move(direction: Direction, velocity: number, limit: number | null = null) {
    this.moveItem(direction, this, velocity, limit)
  }

  private moveItem(direction: Direction, item: LayerItem, velocity: number, limit: number | null = null) {
    switch (direction) {
      case Direction.TopToBottom:
        if (limit === null || (item.position.y + velocity < limit)) {
          item.direction = direction
          item.position.y += velocity
        }
        break
      case Direction.BottomToTop:
        if (limit === null || (item.position.y - velocity >= limit)) {
          item.direction = direction
          item.position.y -= velocity
        }
        break
      case Direction.LeftToRight:
        if (limit === null || (item.position.x + velocity < limit)) {
          item.direction = direction
          item.position.x += velocity
        }
        break
      case Direction.RightToLeft:
        if (limit === null || (item.position.x - velocity >= limit)) {
          item.direction = direction
          item.position.x -= velocity
        }
        break
      default:
        item.direction = null
    }
  }

  getBoundingRectangle() {
    return new Rectangle(this.position, this.size)
  }

}

export default LayerItem
