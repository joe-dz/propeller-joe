import LayerItem from "@/models/games/common/LayerItem.ts";
import Direction from "@/models/games/common/Direction.ts";
import LayerType from "@/models/games/common/LayerType.ts";
import Character from "@/models/games/common/Character.ts";
import Point from "@/models/games/common/Point.ts";

class Projectile extends LayerItem {

  velocity: number = 8
  direction: Direction = Direction.BottomToTop
  pause: number = 1000

  constructor(styleClassName: string) {
    super(styleClassName, LayerType.Projectiles)
  }

  static create(position: Point, size: Point, direction: Direction, velocity: number, styleClassName: string) {
    const projectile = new Projectile(styleClassName)
    projectile.position = position
    projectile.size = size
    projectile.direction = direction
    projectile.velocity = velocity
    if (projectile.direction === Direction.BottomToTop) {
      projectile.position.y -= projectile.size.y / 2
    }
    return projectile
  }

  move() {
    super.move(this.direction, this.velocity)
  }

  hitsCharacter(character: Character): Boolean {
    return this.getBoundingRectangle().intersects(character.getBoundingRectangle())
  }

}

export default Projectile
