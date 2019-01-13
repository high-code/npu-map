import * as modernizr from 'modernizr';
import * as prefix from './vendor-prefix';
import * as classHelper from './classHelper';
export default class BuildingMap {


    mapEl: HTMLElement;
    buildingEl: HTMLElement;
    stagesEl: HTMLElement;
    stages: HTMLElement[];
    pins: HTMLElement[];
    contentEl: HTMLElement;
    spaceRef: string;
    isOpenContentArea : boolean = false;
    contentCloseCtrl  : Element;

    constructor(mapElement: HTMLElement) {
        this.mapEl = mapElement;
    }

    support: Object = { "transitions": modernizr.csstransitions };
    transEndEventNames: Object = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'msTransition': 'MSTransitionEnd',
        'transition': 'transitionend'
    };

    transEndEventName: string = this.transEndEventNames[Modernizr.prefixed('transition')];



    public Init() {
        this.buildingEl = this.mapEl.querySelector(".building");
        this.stagesEl = this.mapEl.querySelector(".stages");
        this.stages = Array.from(this.stagesEl.querySelectorAll(".stage"));
        this.pins = Array.from(this.stagesEl.querySelectorAll(".pin-link"));
        this.contentEl = this.mapEl.querySelector('.content');
        this.contentCloseCtrl = this.contentEl.querySelector('button.content__button');
        this.InitEvents();
    }

    private InitEvents() {
        this.pins.forEach(pin => {
            pin.addEventListener("click", (ev) => {
                ev.preventDefault();

                this.openContent(pin.getAttribute("data-space"));
            })
        });


        this.contentCloseCtrl.addEventListener('click', () => {
            this.closeContentArea();
        })
    }





    private openContent(dataSpace: string) {

        if(this.isOpenContentArea) {
            this.hideSpace();
            this.spaceRef = dataSpace;
            this.showSpace(false);
        }
        else {
            this.spaceRef = dataSpace;
            this.openContentArea();
        }


        let spaceActiveArea = this.stages[0].querySelector('.map__space--selected');
        if (spaceActiveArea)
            classHelper.removeClass(spaceActiveArea, 'map__space--selected');
        
        classHelper.addClass(this.stages[0].querySelector(`.map__space[data-space="${dataSpace}"]`), "map__space--selected");
    }
    
    private hideSpace() {
        var contentItem = this.contentEl.querySelector('.content__item[data-space="' + this.spaceRef + '"]');;
        
        classHelper.removeClass(contentItem, "content__item--current" );

        classHelper.removeClass(this.stagesEl.querySelector(`.pin-link[data-space="${this.spaceRef}"]`), "pin--active")

        var activeSpaceArea = this.stages[0].querySelector('.map__space--selected');
        if(activeSpaceArea) {
            classHelper.removeClass(activeSpaceArea, 'map__space--selected');
        }
    }

   
    
    private openContentArea() {
        this.isOpenContentArea = true;
        this.showSpace(true);

        classHelper.removeClass(this.contentCloseCtrl, 'content__button--hidden');

        classHelper.addClass(this.buildingEl, 'building--content-open');
    }
    
    private showSpace(sliding: boolean) {
        var contentItem = this.contentEl.querySelector('.content__item[data-space="' + this.spaceRef + '"]');
        
        classHelper.addClass(contentItem,"content__item--current");
        

        if (sliding) {
            this.onEndTransition(contentItem, () => {
                classHelper.addClass(this.contentEl, 'content--open')
            }, null);

        }

        classHelper.addClass(this.stagesEl.querySelector(`.pin-link[data-space="${this.spaceRef}"]`), 'pin--active');
    }


    private closeContentArea() {
        classHelper.removeClass(this.contentEl, 'content--open');

        this.hideSpace();

        classHelper.addClass(this.contentCloseCtrl, 'content__button--hidden');

        classHelper.removeClass(this.buildingEl, 'building--content-open');

        this.isOpenContentArea = false;
    }

    private onEndTransition(el: Element, callback, propTest) {

        var classCtx = this;
        let onEndCallbackFn =  (ev: TransitionEvent) => {
            if (Modernizr.csstransitions) {
                if (ev.target != ev.currentTarget || propTest && ev.propertyName != propTest &&
                    ev.propertyName !== prefix.css + propTest)
                    return;
                if (callback && typeof callback == 'function') { callback.call(this) }
            };
        }

        if (Modernizr.csstransitions)
            el.addEventListener(this.transEndEventName, onEndCallbackFn);
        else
            onEndCallbackFn(null);
    }
}
