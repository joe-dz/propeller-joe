import Point from "@/models/games/common/Point.ts"
import LayerType from "@/models/games/common/LayerType.ts"
import Character from "@/models/games/common/Character.ts"

class Player extends Character {

  velocity: number = 0

  constructor(styleClassName: string) {
    super(styleClassName, LayerType.Players)
  }

  static create(styleClassName: string, width: number, velocity: number) {
    const player = new Player(styleClassName)
    const maxWidth = Math.min(width, 100)
    player.size = new Point(maxWidth, maxWidth * 6 / 5)
    player.velocity = velocity
    return player
  }

}

export default Player
