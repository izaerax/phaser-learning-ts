import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import LoadingScene from './scenes/Loading';
import Level1 from './scenes/Level1';



window.game = new Phaser.Game(
  Object.assign(config, {
    scene: [LoadingScene, Level1]
  })
);
