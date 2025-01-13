import Point from "@/models/games/common/Point.ts";
import LayerType from "@/models/games/common/LayerType.ts";
import Character from "@/models/games/common/Character.ts";

class Enemy extends Character {

  lastShot: number = 0

  constructor(styleClassName: string) {
    super(styleClassName, LayerType.Enemies)
  }

  static create(position: Point, width: number, styleClassName: string) {
    const enemy = new Enemy(styleClassName)
    const maxWidth = Math.min(54, width)
    enemy.size = new Point(maxWidth, maxWidth * 90 / 54)
    enemy.position = position
    return enemy
  }

}

export default Enemy
