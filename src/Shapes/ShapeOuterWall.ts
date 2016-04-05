/// <reference path="../../dist/paper.d.ts"/>
class ShapeOuterWall implements IShape {
    public type: number = 1;
    public point1: IPoint;
    public point2: IPoint;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;
    public parent: IShape;

    constructor(point1: IPoint, point2: IPoint) {
        this.point1 = point1;
        this.point2 = point2;
        this.childrens = new Array();
    }
}