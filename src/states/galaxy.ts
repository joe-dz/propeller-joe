import {computed, ref} from "vue";
import Player from "@/models/games/galaxy/Player.ts";
import BackgroundSpaceLayer from "@/models/games/galaxy/BackgroundSpaceLayer.ts";
import ForegroundLayer from "@/models/games/common/ForegroundLayer.ts";
import LayerType from "@/models/games/common/LayerType.ts";
import Projectile from "@/models/games/galaxy/Projectile.ts";
import Direction from "@/models/games/common/Direction.ts";
import Point from "@/models/games/common/Point.ts";
import Enemy from "@/models/games/galaxy/Enemy.ts";
import Character from "@/models/games/common/Character.ts";
import ForegroundPlayersLayer from "@/models/games/galaxy/ForegroundPlayersLayer.ts";
import ForegroundEnemiesLayer from "@/models/games/galaxy/ForegroundEnemiesLayer.ts";
import ForegroundShootingLayer from "@/models/games/galaxy/ForegroundShootingLayer.ts";
import LayerItem from "@/models/games/common/LayerItem.ts";
import MathUtils from "@/utils/MathUtils.ts";

export const useGalaxyModel = () => {
  const playerLayerItem = ref(new Player("player"))
  const backgroundLayers = ref(new Array<BackgroundSpaceLayer>())
  const foregroundLayers = ref(new Array<ForegroundLayer>)

  const gameDuration = ref("00:00")

  const shootingAllowed = ref(true)
  const gameDurationCounter = ref(0)

  const playing = ref(false)
  const gameLost = ref(false)
  const gameWon = ref(false)
  const gamePaused = ref(false)
  const stageEnabled = ref(false)

  const initStage = (clientWidth: number, clientHeight: number) => {
    playerLayerItem.value = Player.create(
      "player",
      clientWidth / 10,
      clientWidth / 100
    )

    removeLayers()
    initBackgroundLayers(clientWidth, clientHeight)
    initForegroundLayers(clientWidth, clientHeight)

    gameDuration.value = "00:00"

    shootingAllowed.value = true
    gameDurationCounter.value = 0

    playing.value = false
    gameLost.value = false
    gameWon.value = false
    gamePaused.value = false
    stageEnabled.value = false
  }

  const removeLayers = () => {
    backgroundLayers.value = new Array<BackgroundSpaceLayer>
    foregroundLayers.value = new Array<ForegroundLayer>
  }

  const playerShoot = (velocity: number) => {
    shootingAllowed.value = false
    const shootingLayer = foregroundLayers.value.find(layer => layer.type === LayerType.Projectiles)
    const projectile = Projectile.create(
      playerLayerItem.value.getProjectileStartPosition(Direction.BottomToTop),
      new Point(2, 10),
      Direction.BottomToTop,
      Math.min(velocity, 12),
      "projectile-player-default"
    )
    if (shootingLayer) {
      shootingLayer.addItem(projectile)
    }
    setTimeout(() => shootingAllowed.value = true, projectile.pause)
  }

  const enemyShoot: (enemy: Enemy, velocity: number) => Projectile = (enemy: Enemy, velocity: number) => {
    const shootingLayer = foregroundLayers.value.find(layer => layer.type === LayerType.Projectiles)
    const projectile = Projectile.create(
      enemy.getProjectileStartPosition(Direction.TopToBottom),
      new Point(2, 10),
      Direction.TopToBottom,
      Math.min(velocity, 12),
      "projectile-enemy-default"
    )
    if (shootingLayer) {
      shootingLayer.addItem(projectile)
    }
    enemy.lastShot = 0
    return projectile
  }

  const spawnEnemy = (position: Point, width: number) => {
    const enemyLayer = foregroundLayers.value.find(layer => layer.type === LayerType.Enemies)
    const enemy = Enemy.create(position, width, "enemy")
    if (enemyLayer) {
      enemyLayer.addItem(enemy)
    }
    return enemy
  }

  const playerMoveLeft = (limit: number) => {
    playerLayerItem.value.styleClassName = "player-moving-left"
    playerLayerItem.value.move(Direction.RightToLeft, playerLayerItem.value.velocity, limit)
  }

  const playerMoveRight = (limit: number) => {
    playerLayerItem.value.styleClassName = "player-moving-right"
    playerLayerItem.value.move(Direction.LeftToRight, playerLayerItem.value.velocity, limit)
  }

  const togglePlay = () => {
    playing.value = !playing.value
    if (playing.value) {
      unpauseGame()
    } else {
      pauseGame()
    }
  }

  const enableStage = () => stageEnabled.value = true
  const stopPlaying = () => playing.value = true
  const pauseGame = () => gamePaused.value = true
  const unpauseGame = () => gamePaused.value = false
  const winGame = () => gameWon.value = true
  const loseGame = () => gameLost.value = true

  const setPlayerPosition = (x: number, y: number) => {
    playerLayerItem.value.position.x = x
    playerLayerItem.value.position.y = y
  }

  const isPlayerExploding = computed(() => {
    return playerLayerItem.value.styleClassName.startsWith("explode")
  })

  const resetPlayerStyle = () => {
    playerLayerItem.value.styleClassName = "player"
  }

  const getAllCharacters = () => {
    const characters: Character[] = []
    foregroundLayers.value.forEach(layer => {
      if (layer instanceof ForegroundPlayersLayer || layer instanceof ForegroundEnemiesLayer) {
        characters.push(...layer.items)
      }
    })
    return characters
  }

  const gameDurationLoop = (frameTime: number) => {
    let minutes = Math.floor(gameDurationCounter.value / 60)
    let seconds = Math.floor(gameDurationCounter.value % 60)

    if (seconds === 60) {
      minutes += 1
    }

    gameDuration.value = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    gameDurationCounter.value += frameTime / 1000
  }

  const createBackgroundSpaceLayer = (velocity: number, density: number, size: Point, position: Point) => {
    const result = new BackgroundSpaceLayer()
    result.styleClassName = "layer-background-space"
    result.velocity = velocity
    result.density = density
    result.size = size
    result.position = position
    return result
  }

  const updateBackgroundSpaceLayer = (layer: BackgroundSpaceLayer, height: number) => {
    layer.move()
    if (layer.position.y >= height) {
      layer.styleClassName = "hidden"
      layer.position.y = -Math.ceil(height / 2)
      layer.items = []

      for (let i = 0; i < layer.density * 20; i++) {
        layer.addStar()
      }
      setTimeout(() => layer.styleClassName = "layer-background-space", 100)
    }
  }

  const backgroundLoop = (clientHeight: number) => {
    backgroundLayers.value.forEach(layer => {
      updateBackgroundSpaceLayer(layer, clientHeight)
    })
  }

  const removeForegroundLayerItem = (item: LayerItem, delay = 0) => {
    const layer = foregroundLayers.value.find(layer => layer.type === item.layerType)
    if (layer) {
      if (item.layerType === LayerType.Players || item.direction === Direction.BottomToTop) {
        item.styleClassName = "explode-from-top"
      } else {
        item.styleClassName = "explode-from-bottom"
      }
      setTimeout(() => {
        layer.items.splice(layer.items.indexOf(item), 1)
      }, delay)
    }
  }

  const shootingLoop = () => {
    foregroundLayers.value.forEach(layer => {
      if (layer instanceof ForegroundShootingLayer) {
        layer.items.slice().forEach(projectile => {
          projectile.move()
          if (projectile.position.y < 0) {
            removeForegroundLayerItem(projectile)
          }

          const hitCharacters = getAllCharacters()
            .filter(c => projectile.hitsCharacter(c))

          if (hitCharacters.length) {
            hitCharacters.forEach(c => removeForegroundLayerItem(c, 200))
            removeForegroundLayerItem(projectile)
          }
        })
      }
    })
  }

  const enemyActionLoop = (clientWidth: number) => {
    const enemyVelocity = 5
    foregroundLayers.value.forEach(layer => {
      if (layer instanceof ForegroundEnemiesLayer) {
        layer.items.slice().forEach(enemy => {
          if (enemy.direction === Direction.RightToLeft && enemy.position.x - enemyVelocity > 0) {
            enemy.move(Direction.RightToLeft, enemyVelocity)
          } else if (enemy.direction === Direction.LeftToRight && enemy.position.x + enemy.size.x + enemyVelocity < clientWidth) {
            enemy.move(Direction.LeftToRight, enemyVelocity)
          } else {
            enemy.move(MathUtils.randBool() ? Direction.LeftToRight : Direction.RightToLeft, enemyVelocity)
          }
          if (enemy.lastShot === -1 || enemy.lastShot > 33) {
            enemyShoot(enemy, clientWidth / 100)
          } else {
            enemy.lastShot += 1
          }
        })
      }
    })
  }

  const initBackgroundLayers = (clientWidth: number, clientHeight: number) => {
    const halfHeight = Math.ceil(clientHeight / 2)

    Array.from(Array(3).keys()).forEach(i => {
      backgroundLayers.value.push(
        createBackgroundSpaceLayer(
          halfHeight / 210,
          6,
          new Point(clientWidth, halfHeight),
          new Point(0, (i - 1) * halfHeight)
        )
      )
    })

    Array.from(Array(3).keys()).forEach(i => {
      backgroundLayers.value.push(
        createBackgroundSpaceLayer(
          halfHeight / 150,
          5,
          new Point(clientWidth, halfHeight),
          new Point(0, (i - 1) * halfHeight)
        )
      )
    })

    Array.from(Array(3).keys()).forEach(i => {
      backgroundLayers.value.push(
        createBackgroundSpaceLayer(
          halfHeight / 90,
          4,
          new Point(clientWidth, halfHeight),
          new Point(0, (i - 1) * halfHeight)
        )
      )
    })

    backgroundLayers.value.forEach(layer => {
      for (let i = 0; i < halfHeight; i++) {
        updateBackgroundSpaceLayer(layer, clientHeight)
      }
    })
  }

  const initForegroundLayers = (clientWidth: number, clientHeight: number) => {
    const fgLayerPlayers = new ForegroundPlayersLayer(
      "layer-players",
      new Point(clientWidth, clientHeight)
    )

    const fgLayerEnemies = new ForegroundEnemiesLayer(
      "layer-enemies",
      new Point(clientWidth, clientHeight)
    )

    const fgLayerShooting = new ForegroundShootingLayer(
      "layer-shooting",
      new Point(clientWidth, clientHeight)
    )

    setPlayerPosition(
      clientWidth / 2 - playerLayerItem.value.size.x / 2,
      clientHeight - playerLayerItem.value.size.y - 128
    )

    fgLayerPlayers.addItem(playerLayerItem.value)

    foregroundLayers.value.push(fgLayerPlayers)
    foregroundLayers.value.push(fgLayerEnemies)
    foregroundLayers.value.push(fgLayerShooting)
  }

  return {
    playerLayerItem,
    backgroundLayers,
    foregroundLayers,
    gameDuration,
    gameDurationCounter,
    stageEnabled,
    playing,
    gamePaused,
    gameWon,
    gameLost,
    shootingAllowed,
    isPlayerExploding,
    initStage,
    removeLayers,
    playerShoot,
    enemyShoot,
    spawnEnemy,
    playerMoveLeft,
    playerMoveRight,
    togglePlay,
    pauseGame,
    unpauseGame,
    setPlayerPosition,
    resetPlayerStyle,
    getAllCharacters,
    winGame,
    loseGame,
    stopPlaying,
    enableStage,
    gameDurationLoop,
    backgroundLoop,
    shootingLoop,
    enemyActionLoop
  }
}
