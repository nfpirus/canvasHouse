/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeMenu.ts"/>

class Events {
    private _mouseMoveListenerPool: Array<EventListener> = new Array;
    private _mouseDownListenerPool: Array<EventListener> = new Array;
    private _renderBind;

    constructor(renderBind: any) {
        this._renderBind = renderBind;
        paper.project.activeLayer.onMouseMove = (event: any) => this.mouseMoveListenerCall(event);
        paper.project.activeLayer.onMouseDown = (event: any) => this.mouseDownListenerCall(event);
    }

    private mouseMoveListenerCall(event: any) {
        if (this._mouseMoveListenerPool.length > 0) {
            this._mouseMoveListenerPool.forEach((listener: any) => listener(event, this._renderBind));
        }
    }

    public addMouseMoveListener(listener: any) {
        this._mouseMoveListenerPool.push(listener);
    }

    public removeMouseMoveListener(listener: any) {
        this._mouseMoveListenerPool.splice(this._mouseMoveListenerPool.indexOf(listener), 1);
    }

    private mouseDownListenerCall(event: any) {
        if (this._mouseDownListenerPool.length > 0) {
            this._mouseDownListenerPool.forEach((listener: any) => listener(event, this._renderBind));
        }
    }

    public addMouseDownListener(listener: any) {
        this._mouseDownListenerPool.push(listener);
    }

    public removeMouseDownListener(listener: any) {
        this._mouseDownListenerPool.splice(this._mouseDownListenerPool.indexOf(listener), 1);
    }
}