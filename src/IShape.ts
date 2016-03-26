/// <reference path="../dist/paper.d.ts"/>
interface IShape {
    type: number;
    coord: ICoordinates;
    coordDraw: ICoordinates;
    childrens: Array<IShape>;
    valid: boolean;
    renderObject: paper.Group;
}