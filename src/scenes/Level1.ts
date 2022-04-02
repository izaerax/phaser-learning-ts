import { Scene, Tilemaps } from "phaser";
import { Player } from "../classes/Player";
import { gameObjectsToObjectPoints } from "../helpers/gameobject-to-object-point";

export default class Level1 extends Scene {
  
  private player!: Player;
  private tileset!: Tilemaps.Tileset
  private map!: Tilemaps.Tilemap
  private wallsLayer!: Tilemaps.TilemapLayer
  private groundLayer!: Tilemaps.TilemapLayer
  private chests!: Phaser.GameObjects.Sprite[]

  constructor() {
    super('level-1-scene')
  }
  
  create(): void {
    this.initMap()
    this.player = new Player(this, 300, 300)
    this.physics.add.collider(this.player, this.wallsLayer)
    this.initChests()
    this.initCamera()
  }

  update(): void {
    this.player.update();
  }

  private initMap(): void {
    this.map = this.make.tilemap({ key: 'dungeon', tileWidth: 16, tileHeight: 16 })
    this.tileset = this.map.addTilesetImage('dungeon', 'tiles')
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0)
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0)

    this.wallsLayer.setCollisionByProperty({ collides: true })

    this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height)
    this.showDebugWalls();
  }


  private initChests(): void {

    // type fix
    const chestPoints = gameObjectsToObjectPoints(
      this.map.filterObjects('Chests', obj => obj.name === 'ChestPoint'),
    )

    //add the sprites
    this.chests = chestPoints.map(chestPoint => 
      this.physics.add.sprite(chestPoint.x, chestPoint.y, 'tiles_spr', 596).setScale(1.5)
    )
    
    // add the overlap action
    this.chests.forEach(chest => {
      this.physics.add.overlap(this.player, chest, (obj1, obj2) => {
        obj2.destroy()
        this.cameras.main.flash()
      })
    })
    
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height)
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09)
    this.cameras.main.setZoom(2)
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7)
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    })
  }
}