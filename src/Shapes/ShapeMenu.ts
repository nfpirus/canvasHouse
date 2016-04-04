/// <reference path="../../dist/paper.d.ts"/>
class ShapeMenu implements IShape {
    public type: number = null;
    public point1: IPoint;
    public point2: IPoint;
    public childrens: Array<IShape>;
    public valid: boolean;
    public renderObject: paper.Group;
}