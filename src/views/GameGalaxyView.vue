<template>
  <div class="absolute-full wrapper theme-red">
    <div id="mainContainer" class="absolute-full main-container font-orbitron-400 fade-in">
      <div v-if="!gameModel.playing.value" class="absolute-full flex-center-column">
        <div v-if="gameModel.gameLost.value" class="game-title blink-quick">
          <div>GAME</div>
          <div>OVER</div>
        </div>
        <div v-else-if="gameModel.gameWon.value" class="game-title fade-in">
          <div>GALAXY</div>
          <div>SAVED!</div>
        </div>
        <div v-else-if="gameModel.gamePaused.value" class="game-title blink">
          <div>GAME</div>
          <div>PAUSED</div>
        </div>
        <div v-else class="game-title fade-in">
          <div>GALAXY</div>
          <div>INVADERS</div>
        </div>
      </div>

      <transition name="fade-quick">
        <div v-if="gameModel.stageEnabled.value && !gameModel.gameWon.value && !gameModel.gameLost.value">
          <layer v-for="layer in gameModel.backgroundLayers.value" :layer="layer"/>
          <layer v-for="layer in gameModel.foregroundLayers.value" :layer="layer"/>
          <div class="flex-stretch-horizontal control-row elevated ml-1 mr-1 mb-1">
            <div
              v-text="gameModel.playing.value ? (hasTouch ? '' : 'SPACE = ') + 'Pause' : (hasTouch ? '' : 'SPACE = ') + 'Play'"
              :class="gameModel.playing.value ? 'pause-button' : 'play-button'"
              @click.stop="togglePlay"
            ></div>
            <div
              class="duration-counter"
              :class="gameModel.playing.value ? 'playing' : 'paused'"
            >
              <div
                v-for="char in gameModel.gameDuration.value"
                v-text="char"
                class="single-char"
              ></div>
            </div>
          </div>
          <div class="flex-center">
            <control-panel
              :left-action="gameModel.playing.value ? playerMoveLeft : () => {}"
              :center-action="gameModel.playing.value ? () => gameModel.playerShoot(12) : () => {}"
              :right-action="gameModel.playing.value ? playerMoveRight : () => {}"
              :frame-time="frameTime"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">

import {onMounted} from "vue"
import {useUiStore} from "@/stores/ui.ts"
import {useGalaxyModel} from "@/states/galaxy.ts";
import {onBeforeRouteLeave} from "vue-router"
import Point from "@/models/games/common/Point.ts"
import ForegroundPlayersLayer from "@/models/games/galaxy/ForegroundPlayersLayer.ts";
import ForegroundEnemiesLayer from "@/models/games/galaxy/ForegroundEnemiesLayer.ts";
import Layer from "@/components/games/common/Layer.vue";
import ControlPanel from "@/components/games/galaxy/ControlPanel.vue"
import * as KeyCode from "keycode-js"

const uiStore = useUiStore()
const gameModel = useGalaxyModel()

onBeforeRouteLeave((to, from) => {
  gameModel.removeLayers()
  uiStore.updateMainViewTransition(from.name, to.name)
})

const hasTouch = "ontouchstart" in document.documentElement

let mainLoop: any
let gameDurationInterval: any

let clientWidth = 0
let clientHeight = 0

const frameTime = 1000 / 60

const keyState: any = {};
addEventListener('keydown', e => {
  if (e.code === KeyCode.CODE_SPACE) {
    if (!gameModel.gameLost.value && !gameModel.gameWon.value) {
      togglePlay()
    }
  } else {
    keyState[e.code] = true
  }
}, true);
addEventListener('keyup', e => {
  keyState[e.code] = false
}, true);

const pauseDurationCounter = () => {
  clearInterval(gameDurationInterval)
}

const foregroundLoop = () => {
  gameModel.foregroundLayers.value.forEach(layer => {
    if (layer instanceof ForegroundEnemiesLayer) {
      if (layer.items.length === 0) {
        togglePlay()
        gameModel.winGame()
        setTimeout(() => {
          initNewGame()
        }, 2000)
      }
    }
    if (layer instanceof ForegroundPlayersLayer) {
      if (layer.items.length === 0) {
        togglePlay()
        gameModel.loseGame()
        setTimeout(() => {
          initNewGame()
        }, 2000)
      }
    }
  })
}

const playerMoveLeft = () => {
  gameModel.playerMoveLeft(0)
}

const playerMoveRight = () => {
  gameModel.playerMoveRight(clientWidth - gameModel.playerLayerItem.value.size.x);
}

const controlsLoop = () => {
  if (!keyState.length) {
    if (!gameModel.isPlayerExploding) {
      gameModel.resetPlayerStyle()
    }
  }
  if (keyState[KeyCode.CODE_A]) {
    playerMoveLeft()
  }
  if (keyState[KeyCode.CODE_D]) {
    playerMoveRight()
  }
  if (keyState[KeyCode.CODE_SPACE]) {
    togglePlay()
  }
  if (keyState[KeyCode.CODE_W] && gameModel.shootingAllowed.value) {
    gameModel.playerShoot(clientWidth / 100);
  }
}

const startMainLoop = () => {
  mainLoop = setInterval(() => {
    gameModel.backgroundLoop(clientHeight)
    gameModel.shootingLoop()
    gameModel.enemyActionLoop(clientWidth)
    foregroundLoop()
    controlsLoop()
    gameModel.gameDurationLoop(frameTime)
  }, frameTime)
}

const stopMainLoop = () => {
  clearInterval(mainLoop)
  pauseDurationCounter()
  gameModel.playing.value = false
}

const togglePlay = () => {
  gameModel.togglePlay()
  if (gameModel.playing.value) {
    startMainLoop()
  } else {
    stopMainLoop()
  }
}

const initNewGame = () => {
  const mainContainer = document.getElementById("mainContainer")
  if (!mainContainer) {
    return
  }
  clientWidth = mainContainer.clientWidth
  clientHeight = mainContainer.clientHeight

  gameModel.initStage(clientWidth, clientHeight)
  gameModel.spawnEnemy(new Point(clientWidth / 2 - 24, 32), clientWidth / 10)
  gameModel.enableStage()
}

onMounted(() => {
  initNewGame()
})

</script>

<style scoped lang="scss">
@import "@/assets/main";

.theme-red {
  --var-color-background: rgb(195, 65, 35);

  --var-color-indicator-active: var(--var-color-background);
  --var-color-indicator-paused: rgba(50, 220, 50, 0.8);
}

.wrapper {
  overflow: hidden;
}

.game-title {
  --var-game-title-width: 20rem;

  z-index: 5;

  width: 20rem;

  text-align: center;

  font-size: 3rem;
  font-weight: 900;

  background: linear-gradient(10deg, white 1rem, var(--var-color-background) 4rem);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-container {
  top: 1rem;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;

  overflow: hidden;

  border-radius: 0.5rem;

  background: black;

  box-shadow: 0 0 8px 8px black;

  color: lightgrey;
}

.control-row {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3rem;

  &.elevated {
    bottom: 4rem;
  }
}

@mixin indicator {
  @include user-select-none;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 2rem;

  border-radius: 1rem;

  font-size: x-large;
  font-weight: 900;

  cursor: pointer;

  transition: all 0.1s linear;
}

@mixin indicator-playing {
  @include indicator;
  color: var(--var-color-indicator-active);
}

@mixin indicator-paused {
  @include indicator;
  @include blink;
  color: var(--var-color-indicator-paused);
}

.play-button {
  @include indicator-paused;
}

.pause-button {
  @include indicator-playing;
}

.duration-counter {
  letter-spacing: 2px;

  &.playing {
    @include indicator-playing;
  }

  &.paused {
    @include indicator-paused;
  }

  .single-char {
    text-align: center;
    width: 1.2rem;
  }
}

.control-button-playing {
  @include indicator-paused;
}

.control-button-paused {
  @include indicator-playing;
}

</style>
