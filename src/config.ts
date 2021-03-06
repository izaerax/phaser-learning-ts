import Phaser, {Types} from 'phaser';

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);
      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
      );
    }, 100);
  }
};
window.onresize = () => window.sizeChanged();

type GameConfigExtended = Types.Core.GameConfig & {
  winScore: number;
};

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.ScaleModes.NONE,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    }
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    }
  },
  canvasStyle: 'display: block; width: 100%; height: 100%',
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  winScore: 40
} as GameConfigExtended;
