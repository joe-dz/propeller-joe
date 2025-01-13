import LayerItem from "@/models/games/common/LayerItem.ts";
import Point from "@/models/games/common/Point.ts";
import Direction from "@/models/games/common/Direction.ts";

abstract class Character extends LayerItem {

  getProjectileStartPosition(direction: Direction) {
    switch (direction) {
      case Direction.TopToBottom:
        return new Point(this.position.x + this.size.x / 2, this.position.y + this.size.y + 8)
      case Direction.BottomToTop:
        return new Point(this.position.x + this.size.x / 2, this.position.y - 8)
    }
    return new Point(this.position.x + this.size.x / 2, this.position.y + this.size.y / 2)
  }

}

export default Character
