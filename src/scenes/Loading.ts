import Phaser, { GameObjects } from 'phaser';

export default class LoadingScene extends Phaser.Scene {
    
  constructor() {
    super('loading-scene')
  }

  preload(): void {
    this.load.baseURL = 'assets/'
    this.load.image('king', 'sprites/king.png')
    this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json')
    this.load.image({
      key: 'tiles',
      url: 'tilemaps/tiles/dungeon-16-16.png',
    })
    this.load.tilemapTiledJSON('dungeon', 'tilemaps/json/dungeon.json')
    this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 16,
    })
  }

  create(): void {
    this.scene.start('level-1-scene')
    this.scene.start('ui-scene')
  }

}