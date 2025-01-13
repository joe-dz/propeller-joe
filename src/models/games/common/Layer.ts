import LayerType from "@/models/games/common/LayerType.ts";
import Point from "@/models/games/common/Point.ts";
import Direction from "@/models/games/common/Direction.ts";
import LayerItem from "@/models/games/common/LayerItem.ts";

class Layer {

  type: LayerType = LayerType.Space
  size: Point = new Point
  position: Point = new Point
  direction: Direction = Direction.TopToBottom
  velocity: number = 1
  styleClassName: string = ""
  items: LayerItem[] = []

  addItem(item: LayerItem) {
    this.items.push(item)
  }

  move() {
    switch (this.direction) {
      case Direction.TopToBottom:
        this.position.y += this.velocity
        break
      case Direction.BottomToTop:
        this.position.y -= this.velocity
        break
      case Direction.LeftToRight:
        this.position.x += this.velocity
        break
      case Direction.RightToLeft:
        this.position.x -= this.velocity
        break
    }
  }

}

export default Layer
