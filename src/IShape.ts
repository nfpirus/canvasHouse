interface IShape {
    type: number;
    coordinates: ICoordinates;
    childrens: Array<IShape>;
    valid: boolean;
    renderObject: paper.Group;
}