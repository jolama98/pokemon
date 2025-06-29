export class Pokemon {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.img = data.img || data.sprites.front_default
    this.type = data.type
    this.height = data.height
    this.health = data.health
    this.nickName = data.nickName
    this.defense = data.defense
    this.attack = data.attack
    this.speed = data.speed
    this.url = data.url
    this.sprites = data.sprites
  }

}
// name - String
// nickName - String
// img - String
// backImg - String
// weight - String
// height - String
// health - Number
// defense - Number
// attack - Number
// speed - Number
