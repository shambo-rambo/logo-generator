// Parent Shape class
class Shape {
    constructor() {
      this.color = 'black'; // Default color
    }
  
    setColor(color) {
      this.color = color;
    }
  }
  
  // Triangle class
  class Triangle extends Shape {
    render() {
      return `<polygon points="150,18 244,182 56,182" fill="${this.color}" />`;
    }
  }
  
  // Square class
  class Square extends Shape {
    render() {
      return `<rect x="50" y="50" width="100" height="100" fill="${this.color}" />`;
    }
  }
  
  // Circle class
  class Circle extends Shape {
    render() {
      return `<circle cx="150" cy="100" r="50" fill="${this.color}" />`;
    }
  }
  
  export { Triangle, Square, Circle };
  