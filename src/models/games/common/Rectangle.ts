import Point from "@/models/games/common/Point.ts";

class Rectangle {

  topLeft: Point = new Point()
  topRight: Point = new Point()
  bottomLeft: Point = new Point()
  bottomRight: Point = new Point()

  constructor(topLeft: Point, size: Point) {
    this.topLeft = topLeft.clone()
    this.topRight = new Point(topLeft.x + size.x - 1, topLeft.y)
    this.bottomLeft = new Point(topLeft.x, topLeft.y + size.y - 1)
    this.bottomRight = new Point(topLeft.x + size.x - 1, topLeft.y + size.y - 1)
  }

  intersects(other: Rectangle) {
    return other.containsPoint(this.topLeft) ||
      other.containsPoint(this.topRight) ||
      other.containsPoint(this.bottomLeft) ||
      other.containsPoint(this.bottomRight)
  }

  private containsPoint(point: Point) {
    return point.x >= this.topLeft.x &&
      point.x <= this.topRight.x &&
      point.y >= this.topLeft.y &&
      point.y <= this.bottomLeft.y
  }

}

export default Rectangle
