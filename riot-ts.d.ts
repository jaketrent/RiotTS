declare module Riot {
    interface Settings {
        brackets: string;
    }
    class Observable {
        on(events: string, callback: Function): void;
        one(events: string, callback: Function): void;
        off(events: string): void;
        trigger(eventName: string, ...args: any[]): void;
        constructor();
    }
    interface Router {
        (callback: Function): any;
        (to: string): any;
        start(): any;
        stop(): any;
        exec(callback: Function): any;
        parser(parser: Function): any;
    }
    interface Base {
        version: string;
        settings: Riot.Settings;
        mount(customTagSelector: string, opts?: any): Array<Riot.Element>;
        mount(selector: string, tagName: string, opts?: any): Array<Riot.Element>;
        mount(domNode: Node, tagName: string, opts?: any): Array<Riot.Element>;
        render(tagName: string, opts?: any): string;
        tag(tagName: string, html: string, css?: string, attrs?: string, constructor?: Function): any;
        tag(tagName: string, html: string, constructor?: Function): any;
        class(element: Function): void;
        observable(object: any): void;
        mixin(mixinName: string, mixinObject: any): void;
        compile(callback: Function): void;
        compile(url: string, callback: Function): void;
        compile(tag: string): string;
        compile(tag: string, dontExecute: boolean): string;
        route: Riot.Router;
    }
    interface LifeCycle {
        mounted?(F: Function): any;
        unmounted?(F: Function): any;
        updating?(F: Function): any;
        updated?(F: Function): any;
    }
    interface HTMLRiotElement extends HTMLElement {
        _tag: Element;
    }
    class Element implements Riot.Observable, LifeCycle {
        opts: any;
        parent: Element;
        root: HTMLElement;
        tags: any;
        tagName: string;
        template: string;
        isMounted: boolean;
        update(data?: any): void;
        unmount(keepTheParent?: boolean): void;
        on(eventName: string, fun: Function): void;
        one(eventName: string, fun: Function): void;
        off(events: string): void;
        trigger(eventName: string, ...args: any[]): void;
        mixin(mixinObject: Object | Function | string, instance?: any): void;
        static register(): void;
        static createElement(options?: any): HTMLRiotElement;
    }
    function registerAll(): void;
    var waitingToBeRegistered: Array<Function>;
    var templateCache: {};
    function registerClass(element: Function): void;
}
declare var riot: Riot.Base;
declare function template(template: string): (target: Function) => void;
