/// <reference path="../dist/paper.d.ts"/>
interface IShape {
    type: number;
    point1: IPoint;
    point2: IPoint;
    childrens: Array<IShape>;
    valid: boolean;
    renderObject: paper.Group;
    parent: IShape;
}