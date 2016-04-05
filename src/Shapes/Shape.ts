/// <reference path="../../dist/paper.d.ts"/>
class Shape implements IShape {
    public type: number;
    public point1: IPoint;
    public point2: IPoint;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;
    public parent: IShape;

    constructor(point1: IPoint, point2: IPoint) {
        this.point1 = new paper.Point(point1.x, point1.y);
        this.point2 = new paper.Point(point2.x, point2.y);
    }
}