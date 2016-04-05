/// <reference path="Shape.ts"/>
class ShapeOuterWall extends Shape {
    public type: number = 1;

    constructor(point1: IPoint, point2: IPoint) {
        super(point1, point2);
        this.childrens = new Array();
    }
}