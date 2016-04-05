/// <reference path="../dist/paper.d.ts"/>

class RenderApi {
    public zoom: number;
    public center: paper.Point;
    private _menu: paper.Path = null;

    constructor(zoom: number, center: paper.Point) {
        this.zoom = zoom;
        this.center = center;
    }

    public static getShapeLenght(point1: IPoint, point2: IPoint): string {
        const result: number = Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
        return Math.floor(result).toString();
    }

    public originalPosition(x: number, y: number): paper.Point {
        const cx: number = this.center.x;
        const cy: number = this.center.y;
        const x1: number = x - cx;
        const y1: number = y - cy;
        const r: number = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));

        const cosN: number = x1 / r;
        const sinN: number = y1 / r;
        const x2: number = cx + r * cosN / this.zoom;
        const y2: number = cy + r * sinN / this.zoom;
        return new paper.Point(x2, y2);
    }

    public newPosition(x: number, y: number): paper.Point {
        const cx: number = this.center.x;
        const cy: number = this.center.y;
        const x1: number = x - cx;
        const y1: number = y - cy;
        const r: number = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));

        const cosN: number = x1 / r;
        const sinN: number = y1 / r;
        const x2: number = cx + r * cosN * this.zoom;
        const y2: number = cy + r * sinN * this.zoom;
        return new paper.Point(x2, y2);
    }

    public getPoint(point: IPoint): paper.Point {
        const result = new paper.Point(point.x, point.y);
        return result;
    }
    
    public drawGreed(shape: IShape, winWidth, winHeight, offsetX: number, offsetY: number): paper.Group {
        let i: number;
        const high: number = 80;
        const width: number = 80;
        const pool: Array<paper.Path> = new Array;
        const widthElemen =  Math.floor(winWidth/width);
        const highElemen =  Math.floor(winHeight/high);
        const widthLength = widthElemen * width;
        const highLength = highElemen * high;
        for (i = 0; i <= widthElemen; i++) {
            var myPath = new paper.Path();
            myPath.strokeColor = '#cccccc';
            myPath.strokeWidth = 1;
            const point1: paper.Point = this.newPosition(i * width + 0.5 + offsetX, + 0.5 + offsetY);
            const point2: paper.Point = this.newPosition(i * width + 0.5 + offsetX, highLength + 0.5 + offsetY);
            myPath.add(new paper.Point(point1));
            myPath.add(new paper.Point(point2));
            pool.push(myPath);
        }
        for (i = 0; i <= highElemen; i++) {
            var myPath2 = new paper.Path();
            myPath2.strokeColor = '#cccccc';
            myPath2.strokeWidth = 1;
            const point1: paper.Point = this.newPosition(0.5 + offsetX, i * high + 0.5 + offsetY);
            const point2: paper.Point = this.newPosition(widthLength + 0.5 + offsetX, i * high + 0.5 + offsetY);
            myPath2.add(point1);
            myPath2.add(point2);
            pool.push(myPath2);
        }
        const result: paper.Group = new paper.Group(pool);

        if (shape.renderObject) {
            result.insertBelow(shape.renderObject);
            shape.renderObject.remove();
        }

        shape.renderObject = result;
        shape.point1 = new paper.Point(result.position.x, result.position.y);
       // shape.coordDraw = new paper.Point(result.position.x, result.position.y);
    
        return result;
    }

    public drawMenu(count: number, width: number, hight: number): Array<paper.Group> {
        const path: any = paper.Path;
        this._menu = new path.Rectangle(new paper.Point(0, 0), new paper.Point(width, 40));
        this._menu.fillColor = '#f6f0e7';

        const menuItem: Array<paper.Group> = new Array;
        const point1: paper.Point = new paper.Point(0, 0);
        const margin: number = 5;
        const heightItem: number = hight - margin;
        const widthItem: number = 100;

        let i: number;
        for (i = 0; i < count; i++) {

            const icon: paper.Raster = new paper.Raster('icon/menu' + i + '.png');
            icon.position = new paper.Point(point1.x + 16 , point1.y + 16);
            icon.scale(0.25);

            const point2: paper.Point = new paper.Point(point1.x + widthItem, point1.y + heightItem);
            const button: paper.Path = new path.Rectangle(point1, point2);
            const outSelect: paper.Path = new path.Rectangle(point1, new paper.Point(point1.x + widthItem, point1.y + heightItem + 4 * 20));
            outSelect.fillColor = new paper.Color(0, 0, 0, 0.0);
            button.fillColor = '#f6f0e7';

            const text = new paper.PointText(new paper.Point(point1.x + 60, point1.y + 22));
            text.justification = 'center';
            text.fillColor = '#956429';
            text.content = 'Button ' + i;

            const subMenu: paper.Group = this.drawSubMenu(4, point1.x);
            subMenu.visible = false;

            const group = new paper.Group([outSelect, button, text, subMenu, icon]);

            group.onMouseEnter = function (event) {
                this.children[1].fillColor = '#ffbb80';
                this.children[3].visible = true;
                document.body.style.cursor = "pointer";
            }

            group.onMouseLeave = function (event) {
                this.children[1].fillColor = '#f6f0e7';
                this.children[3].visible = false;
                document.body.style.cursor = "default";
            }
            menuItem.push(group);
            point1.x = point1.x + margin + widthItem;
        }
        return menuItem;
    }

    public drawSubMenu(count: number, positionStartX: number): paper.Group {
        let subMenu: paper.Group;
        const point1: paper.Point = new paper.Point(positionStartX, 40);
        let point2: paper.Point;
        const margin: number = 5;
        const heightItem: number = 20
        const widthItem: number = 150;

        const path: any = paper.Path;
        const subMenuItems: Array<paper.Group> = new Array;

        let i: number;
        for (i = 0; i < count; i++) {

            point2 = new paper.Point(point1.x + widthItem, point1.y + heightItem);
            const button: paper.Path = new path.Rectangle(point1, point2);
            button.fillColor = '#f6f0e7';

            const text = new paper.PointText(new paper.Point(point1.x + 10, point1.y + 13));

            text.fillColor = '#D7CDC1';//'#956429';
            text.content = 'Button ' + i;

            const subMenuItem: paper.Group = new paper.Group([button, text]);
            subMenuItem.onMouseEnter = function (event) {
                this.children[0].fillColor = '#ffbb80';
            }

            subMenuItem.onMouseLeave = function (event) {
                this.children[0].fillColor = '#f6f0e7';
            }

            subMenuItems.push(subMenuItem);
            point1.y = point1.y + heightItem;
        }

        subMenu = new paper.Group();
        subMenu.addChildren(subMenuItems);
        return subMenu;
    }
    
    public renderShape(shape: IShape, offsetX: number, offsetY: number): void {
        if (shape.type === 1) {
            this.reDrawOuterWall(shape, offsetX, offsetY);
        }
        if (shape.type === 3) {
            this.drawColumn(shape, offsetX, offsetY);
        }
        if (shape.type === 6) {
            this.drawDoor(shape, offsetX, offsetY);
        }
        if (shape.type === 11 || shape.type === 12) {
            this.drawControl(shape, offsetX, offsetY);
        }
        if (shape.childrens) {
            shape.childrens.forEach((child: IShape) => this.renderShape(child, offsetX, offsetY));
        }
    }

    public drawControl(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);
        const point2: paper.Point = this.newPosition(shape.point2.x + offsetX, shape.point2.y + offsetY);
        const vect: paper.Point = new paper.Point(point2.x - point1.x, point2.y - point1.y);

        const width: number = 8 * this.zoom;
        const length: number = 8 * this.zoom;

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.position.y -= length / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = 'yellow';


        let result: paper.Group;
        if (shape.renderObject && shape.renderObject.children[0]) {
            rect.insertBelow(shape.renderObject);
            shape.renderObject.children[0].remove();
            shape.renderObject.addChild(rect);
        } else {
            result = new paper.Group([rect]);
            result.onMouseEnter = () => {
                shape.renderObject.children[0].fillColor = 'lightblue';
            };
            result.onMouseLeave = () => {
                shape.renderObject.children[0].fillColor = 'yellow';
            };
            shape.renderObject = result;
            if (this._menu) {
                result.insertBelow(this._menu);
            }
        }
        return result;
    }

    public reDrawOuterWall(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);
        const point2: paper.Point = this.newPosition(shape.point2.x + offsetX, shape.point2.y + offsetY);
        const vect: paper.Point = new paper.Point(point2.x - point1.x, point2.y - point1.y);

        const width: number = 20 * this.zoom;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(1, 0.45, 0, 0.5);
        rect.rotate(vect.angle - 90, point1);
        /*
        let text: paper.TextItem = new paper.PointText(new paper.Point((coordDraw.x1 + coordDraw.x2) / 2, (coordDraw.y1 + coordDraw.y2) / 2));
        text.name = 'text';
        text.position.y += width/3;
        text.fontSize = 20;
        text.fontWeight = 'bold';
        text.content = 'Wall';
        text.justification = 'center';
        text.visible = false;
        */

        let result: paper.Group;
        if (shape.renderObject && shape.renderObject.children[0]) {
            rect.insertBelow(shape.renderObject);
            shape.renderObject.children[0].remove();
            shape.renderObject.addChild(rect);
        } else {
            result = new paper.Group([rect]);
            result.onMouseEnter = () => {
                shape.renderObject.children[0].fillColor = new paper.Color(0, 0.45, 1, 0.5);
                // text.content = getShapeLenght(shape.coord);
                //  text.visible = true;
            };
            result.onMouseLeave = () => {
                shape.renderObject.children[0].fillColor = new paper.Color(1, 0.45, 0, 0.5);
                // text.visible = false;
            };
            shape.renderObject = result;
            //result.pivot = new paper.Point(result.position.x, result.position.y);

            if (this._menu) {
                result.insertBelow(this._menu);
            }
        }
        return result;
    }

    public drawInnerWall(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);
        const point2: paper.Point = this.newPosition(shape.point2.x + offsetX, shape.point2.y + offsetY);
        const vect: paper.Point = new paper.Point(point2.x - point1.x, point2.y - point1.y);

        const width: number = 20 * this.zoom;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.60, 0.73, 0.21, 0.5);

        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.fillColor = new paper.Color(0, 0.45, 1, 0.5);
            // TODO: Realize show Length
        };
        result.onMouseLeave = () => {
            rect.fillColor = new paper.Color(1, 0.45, 0, 0.5);
            // TODO: Realize hide Length
        };    
        shape.renderObject = result;
      //  shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        if (this._menu) {
            result.insertBelow(this._menu);
        }

        return result;
    }

    public drawColumn(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);

        const width: number = 20 * this.zoom;
        const length: number = 20 * this.zoom;

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.position.y -= length / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(1, 0.45, 0, 0.5);

        let result: paper.Group;
        if (shape.renderObject && shape.renderObject.children[0]) {
            rect.insertBelow(shape.renderObject);
            shape.renderObject.children[0].remove();
            shape.renderObject.addChild(rect);
        } else {
            result = new paper.Group([rect]);
            result.onMouseEnter = () => {
                shape.renderObject.children[0].fillColor = new paper.Color(0, 0.45, 1, 0.5);
            };
            result.onMouseLeave = () => {
                shape.renderObject.children[0].fillColor = new paper.Color(1, 0.45, 0, 0.5);
            };
            shape.renderObject = result;

            if (this._menu) {
                result.insertBelow(this._menu);
            }
        }
        return result;
    }

    public drawPartition(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);
        const point2: paper.Point = this.newPosition(shape.point2.x + offsetX, shape.point2.y + offsetY);
        const vect: paper.Point = new paper.Point(point2.x - point1.x, point2.y - point1.y);

        const width: number = 8 * this.zoom;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = new paper.Color(0.72, 0.34, 0.02, 0.5);

        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.strokeColor = 'black';
        };    
        shape.renderObject = result;
     //   shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        if (this._menu) {
            result.insertBelow(this._menu);
        }

        return result;
    }

    public drawWindow(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);
        const point2: paper.Point = this.newPosition(shape.point2.x + offsetX, shape.point2.y + offsetY);
        const vect: paper.Point = new paper.Point(point2.x - point1.x, point2.y - point1.y);

        const width: number = 20 * this.zoom;
        const smallwidth: number = 8 * this.zoom;
        const length: number = point2.getDistance(point1, false);

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = 'white';

        size = new paper.Size(smallwidth, length);
        let smallRect: paper.Path = paper.Path.Rectangle(point1, size);
        smallRect.position.x -= smallwidth / 2;
        smallRect.strokeColor = 'black';
        smallRect.name = 'smallrect';
        smallRect.fillColor = new paper.Color(0.44, 0.62, 0.80, 0.5);

        const result: paper.Group = new paper.Group([rect, smallRect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
            smallRect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.strokeColor = 'black';
            smallRect.strokeColor = 'black';
        };    
        shape.renderObject = result;
        //shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        if (this._menu) {
            result.insertBelow(this._menu);
        }

        return result;
    }

    public drawDoor(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);
        const point2: paper.Point = this.newPosition(shape.point2.x + offsetX, shape.point2.y + offsetY);
        const vect: paper.Point = new paper.Point(point2.x - point1.x, point2.y - point1.y);

        const width: number = 20 * this.zoom;
        const smallwidth: number = 8 * this.zoom;
        const length: number = 80 * this.zoom;

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.position.y -= length / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = 'white';
        rect.rotate(vect.angle - 90, point1);

        size = new paper.Size(smallwidth, length);
        let smallRect: paper.Path = paper.Path.Rectangle(point1, size);
        smallRect.position.x -= smallwidth / 2;
        smallRect.position.y -= length / 2;
        smallRect.strokeColor = 'black';
        smallRect.name = 'smallrect';
        smallRect.fillColor = new paper.Color(0.72, 0.34, 0.02, 0.5);
        smallRect.rotate(vect.angle - 90, point1);

        let result: paper.Group;
        if (shape.renderObject && shape.renderObject.children[0]) {            
            smallRect.insertBelow(shape.renderObject);
            rect.insertBelow(shape.renderObject);

            shape.renderObject.children[1].remove();
            shape.renderObject.children[0].remove();

            shape.renderObject.addChild(rect);
            shape.renderObject.addChild(smallRect);            
        } else {
            result = new paper.Group([rect, smallRect]);

            result.onMouseEnter = () => {
                shape.renderObject.children[0].strokeColor = new paper.Color(0, 0.45, 1, 0.5);
                shape.renderObject.children[1].strokeColor = new paper.Color(0, 0.45, 1, 0.5);
            };
            result.onMouseLeave = () => {
                shape.renderObject.children[0].strokeColor = 'black';
                shape.renderObject.children[1].strokeColor = 'black';
            };
            shape.renderObject = result;
            if (this._menu) {
                result.insertBelow(this._menu);
            }
        }
        return result;
    }

    public drawDoorWay(shape: IShape, offsetX: number, offsetY: number): paper.Group {
        const point1: paper.Point = this.newPosition(shape.point1.x + offsetX, shape.point1.y + offsetY);
        const point2: paper.Point = this.newPosition(shape.point2.x + offsetX, shape.point2.y + offsetY);
        const vect: paper.Point = new paper.Point(point2.x - point1.x, point2.y - point1.y);

        const width: number = 20 * this.zoom;
        const length: number = point2.getDistance(point1, false) * this.zoom;

        let size: paper.Size = new paper.Size(width, length);
        let rect: paper.Path = paper.Path.Rectangle(point1, size);
        rect.position.x -= width / 2;
        rect.strokeColor = 'black';
        rect.name = 'rect';
        rect.fillColor = 'white';

        const result: paper.Group = new paper.Group([rect]);
        result.rotate(vect.angle - 90, point1);
        result.onMouseEnter = () => {
            rect.strokeColor = new paper.Color(0, 0.45, 1, 0.5);
        };
        result.onMouseLeave = () => {
            rect.strokeColor = 'black';
        };  
        shape.renderObject = result;
      //  shape.coordDraw = new paper.Point(result.position.x, result.position.y);

        if (this._menu) {
            result.insertBelow(this._menu);
        }

        return result;
    }

    public getNormal(A: IPoint, B: IPoint, C: IPoint): IPoint {
        function VDot(v1: IPoint, v2: IPoint): number {
            return v1.x * v2.x + v1.y * v2.y
        }
        function VMul(v1: IPoint, A: number): IPoint {
            const result: IPoint = new paper.Point(0, 0);
            result.x = v1.x * A;
            result.y = v1.y * A;
            return result;
        }
        function VSub(v1: IPoint, v2: IPoint): IPoint {
            const result: IPoint = new paper.Point(0, 0);
            result.x = v1.x - v2.x;
            result.y = v1.y - v2.y;
            return result;
        }
        function VNorm(V): IPoint {
            const result: IPoint = new paper.Point(0, 0);
            var vl;
            vl = Math.sqrt(V.x * V.x + V.y * V.y);
            result.x = V.x / vl;
            result.y = V.y / vl;
            return result;
        }
        function VProject(A: IPoint, B: IPoint): IPoint {
            let result: IPoint = new paper.Point(0, 0);
            A = VNorm(A);
            result = VMul(A, VDot(A, B));
            return result
        }

        let result: IPoint = new paper.Point(0, 0);
        var CA = VSub(C, A);
        result = VSub(VProject(VSub(B, A), CA), CA);
        return result;
    }
}