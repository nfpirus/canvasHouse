/// <reference path="../dist/paper.d.ts"/>
/// <reference path="Shapes/ShapeControl.ts"/>
/// <reference path="Shapes/ShapeOuterWall.ts"/>
/// <reference path="Shapes/ShapeColumn.ts"/>
/// <reference path="Shapes/ShapeInnerWall.ts"/>
/// <reference path="Shapes/ShapePartition.ts"/>
/// <reference path="Shapes/ShapeWindow.ts"/>
/// <reference path="Shapes/ShapeDoor.ts"/>
/// <reference path="Shapes/ShapeDoorWay.ts"/>

class Stages {
    private _shapes: Array<IShape>;
    private _render: Render;
    private _menu: Array<any>;

    constructor(stageContainer: HTMLDivElement) {
        
        this._shapes = new Array;
        this._render = new Render(stageContainer, this._shapes);
        this._menu = this._render.createMenu(6);
        this._render.zoom = 1;

        this.initialization();
    }

    private deleteShape(shape: IShape): void {
        const item: number = this._shapes.indexOf(shape);
        if (item) {
            shape.renderObject.remove();
            this._shapes.splice(item, 1);
        } else {
            console.log('ex: deliteShape not found shape');
        }
    }

    private initialization(): void {

        this._menu[0].children[2].content = 'Проект';
        this._menu[0].children[3].children[0].children[1].content = 'Создать новый';
        this._menu[0].children[3].children[1].children[1].content = 'Сохранить проект';
        this._menu[0].children[3].children[2].children[1].content = 'Загрузить проект';
        this._menu[0].children[3].children[3].children[1].content = 'Параметры проекта';

        this._menu[1].children[2].content = 'Курсор';
        this._menu[1].children[2].onClick = () => {
            this._render.zoom = 0.5;
        };
        this._menu[1].children[3].children[0].visible = false;
        this._menu[1].children[3].children[1].visible = false;
        this._menu[1].children[3].children[2].visible = false;
        this._menu[1].children[3].children[3].visible = false;

        this._menu[2].children[2].content = 'Стена';
        this._menu[2].children[3].children[0].children[1].content = 'Добавить стену';
        this._menu[2].children[3].children[0].children[1].fillColor = '#956429';
        this._menu[2].children[3].children[0].onClick = () => this._render.createWall(false);
        this._menu[2].children[3].children[1].children[1].content = 'Добавить цепочку стен';
        this._menu[2].children[3].children[1].children[1].fillColor = '#956429';
        this._menu[2].children[3].children[1].onClick = () => this._render.createWall(true);
        this._menu[2].children[3].children[2].children[1].content = 'Добавить коробку стен';
        this._menu[2].children[3].children[3].children[1].content = 'Добавить столб';
        this._menu[2].children[3].children[3].children[1].fillColor = '#956429';
        this._menu[2].children[3].children[3].onClick = () => this._render.createColumn();
        
        this._menu[3].children[2].content = 'Проём';
        this._menu[3].children[3].children[0].children[1].content = 'Добавить дверь';
        this._menu[3].children[3].children[0].children[1].fillColor = '#956429';
        this._menu[3].children[3].children[0].onClick = () => this._render.createDoor();
        this._menu[3].children[3].children[1].children[1].content = 'Добавить окно';
        this._menu[3].children[3].children[2].children[1].content = 'Пустой проём';
        this._menu[3].children[3].children[3].visible = false;

        this._menu[4].children[2].content = 'Крыша';
        this._menu[4].children[3].children[0].children[1].content = 'Односкатная';
        this._menu[4].children[3].children[1].children[1].content = 'Двускатная';
        this._menu[4].children[3].children[2].children[1].content = 'Шатровая';
        this._menu[4].children[3].children[3].children[1].content = 'Мансардная';

        this._menu[5].children[2].content = 'Уровень';
        this._menu[5].children[3].children[0].children[1].content = '1й этаж';
        this._menu[5].children[3].children[1].children[1].content = '2й этаж';
        this._menu[5].children[3].children[2].children[1].content = 'Добавить этаж';
        this._menu[5].children[3].children[3].children[1].content = 'Удалить текущий этаж';
    }
}