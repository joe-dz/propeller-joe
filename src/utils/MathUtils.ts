class MathUtils {

  static randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static randBool() {
    return MathUtils.randInt(0, 2) > 0
  }

}

export default MathUtils
