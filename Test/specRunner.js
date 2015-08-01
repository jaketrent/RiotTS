/// <reference path="bower_components/riot-ts/riot-ts.d.ts" />
/// <reference path="typings/jasmine/jasmine.d.ts" />
/*
function main() {
   riot.route((id,username) =>
   {
      console.log("hash changed to: "+id+"/"+username);
   });
   riot.route.start();
  
   riot.mount('*');

   riot.route("welcome/nino.porcino");

   var p = new Car();

   p.trigger("start");
}

class Car extends Riot.Observable
{
   constructor()
   {
      super();

      this.on('start', ()=>
      {
         console.log("car started!");
      });
   }
}
*/
/// <reference path="typings/jasmine/jasmine.d.ts" />
// jasmine boot.js links to window.onload 
var startJasmine = window.onload;
window.onload = function (e) {
    RunSpecs();
    startJasmine(null);
};
// simulates the old Jasmine 1.3 waitsFor()
function waitFor(F) {
    beforeEach(function (done) {
        setInterval(function () {
            if (F())
                done();
        }, 250);
    });
}
function querySelector(s) {
    return document.querySelector(s);
}
// quickly checks if instance implements the class 
function implements(instance, classFunction) {
    var instanceMembers = {};
    for (var i in instance)
        instanceMembers[i] = true;
    var classMembers = [];
    for (var i in classFunction.prototype)
        classMembers.push(i);
    for (var t = 0; t < classMembers.length; t++) {
        if (instanceMembers[classMembers[t]] === undefined) {
            return false;
        }
    }
    return true;
}
function RunSpecs() {
    describe("A jasmine spec", function () {
        it("tests something", function () {
            expect(!false).toBe(true);
        });
    });
}
/*
function RunSpecs()
{
   describe("webcomponents library", () => {
      waitFor( () => polymerReady );

      it("fires the event 'WebComponentsReady'", () =>
      {
         expect(polymerReady).toBe(true);
      });
   });

   describe("@component decorator", () => {
      it('registers regular elements', () => {
         var el:any = querySelector('#testElement');
         expect(implements(el, TestElement)).toBe(true);
         expect(el["is"]).toBe(TestElement.prototype["is"]);
         expect(el.$.inner.innerHTML).toBe("innerelement");
      });

      it('extends builtin elements using second argument', () => {
         var el = querySelector('#testInput1');
         expect(implements(el, TestInput1)).toBe(true);
      });

      it("sets 'is:' correctly", () => {
         var el1 = querySelector('#testElement');
         var el2 = querySelector('#testInput1');
         var el3 = querySelector('#testInput2');
         expect(el1["is"]).toBe(TestElement.prototype["is"]);
         expect(el2["is"]).toBe(TestInput1.prototype["is"]);
         expect(el3["is"]).toBe(TestInput2.prototype["is"]);
      });
   });

   describe("@extend decorator", () => {
      it('extends builtin elements', () => {
         var el = querySelector('#testInput2');
         expect(implements(el, TestInput2)).toBe(true);
      });
   });

   describe("a computed property", () =>
   {
      it('can be set with @computed decorator', () => {
         var element = <ComputedPropertiesTest> <any> querySelector('#computedProperties1');

         expect(element.computed1).toBe(2);
         element.set('first', 2);
         expect(element.computed1).toBe(3);
         element.set('second', 4);
         expect(element.computed1).toBe(6);

         // TODO check for "get_"
      });

      it('can be set with @property decorator', () => {
         var element=<ComputedPropertiesTest> <any> querySelector('#computedProperties2');

         expect(element.computed2).toBe(2);
         element.set('first', 2);
         expect(element.computed2).toBe(3);
         element.set('second', 4);
         expect(element.computed2).toBe(6);
      });
   });

   describe("custom constructor", () =>
   {
      var elementConstructor, el;

      beforeEach(() =>
      {
         // create the element
         el = CustomConstructorTest.create("42");
         
         // connect it to DOM
         querySelector("#put_custom_constructor_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar == "42"));

      it("provides custom initialization", () =>
      {
         expect(el.bar).toBe("42");
      });
   });

   describe("constructor()", () => {
      var el;

      beforeEach(() => {
         // create the element
         el = PropertyInitializationTest.create();

         // connect it to DOM
         querySelector("#put_custom_constructor_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar == "mybar"));

      it("initializes properties correctly", () => {
         expect(el.bar).toBe("mybar");
         expect(el.foo).toBe("myfoo");
         expect(el.war).toBe("mywar");
      });
   });

   describe("polymer.Base", () => {
      it("doesn't allow an element to be used before it's registered", () => {
         expect(()=>UnInitializedTest.create()).toThrow("element not yet registered in Polymer");
      });

      it("doesn't allow an element to be registered twice", () => {
         expect(() => DoubleInitializationTest.register() ).not.toThrow();
         expect(() => DoubleInitializationTest.register() ).toThrow("element already registered in Polymer");
      });

      it("create elements that are extensions of HTMLElement", () => {
         var el = DoubleInitializationTest.create();
         expect(implements(el, HTMLElement)).toBe(true);
      });

      it("create elements that are extensions Polymer.Base", () => {
         var el=DoubleInitializationTest.create();
         expect(implements(el, Polymer.Base)).toBe(true);
      });

      it("does not allow to redefine factoryImpl()", () => {
         expect(() => NoFactoryImplTest.register()).toThrow("do not use factoryImpl() use constructor() instead");
      });
   });

   describe("@listen decorator", () => {
      var el;

      beforeEach(() => {
         el=ListenerTest.create();
         querySelector("#put_custom_constructor_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="foo"));
                      
      it("sets an event listener function", () => {
         expect(el.bar).toBe("foo");
      });
   });

   describe("@observe decorator", () => {
      var el;

      beforeEach(() => {
         el = ObserverTest.create();
         querySelector("#put_custom_constructor_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="mybar"));

      it("observes a single property changes", () => {
         expect((<ObserverTest>el).nbar_changed).toBe(0);
         expect((<ObserverTest>el).nbar_foo_changed).toBe(0);
         el.set("bar", "42");
         expect((<ObserverTest>el).nbar_changed).toBe(1);
         expect((<ObserverTest>el).nbar_foo_changed).toBe(1);
      });

      it("observes more than one property changes", () => {
         expect((<ObserverTest>el).nbar_changed).toBe(0);
         expect((<ObserverTest>el).nbar_foo_changed).toBe(0);
         el.set("foo", "42");
         expect((<ObserverTest>el).nbar_changed).toBe(0);
         expect((<ObserverTest>el).nbar_foo_changed).toBe(1);
      });

      // TODO check path, deep path, array mutation
   });

   describe("@behavior decorator", () => {
      var el1, el2;

      beforeEach(() => {
         el1=BehaviorTest1.create();
         el2=BehaviorTest2.create();
         querySelector("#put_custom_constructor_here").appendChild(el1);
         querySelector("#put_custom_constructor_here").appendChild(el2);
      });

      // wait for the 'attached' event
      waitFor(() => (el1.bar=="mybar"));

      it("mixes code from another class (decorating the 'class' keyword)", () => {
         expect(el1.hasfired).toBe(true);
      });

      // wait for the 'attached' event
      waitFor(() => (el2.bar=="mybar"));

      it("mixes code from another class (decorator inside the class body)", () => {
         expect(el2.hasfired).toBe(true);
      });
   });

   describe("@template/@style decorators", () => {
      var el;

      beforeEach(() => {
         el = TemplateTest.create();
         querySelector("#put_test_elements_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="mybar"));

      it("provide a template for the element", () => {
         expect(el.$.inner.innerHTML).toBe("inner text");
      });
      
      it("provide a style for the element", () => {
         expect(el.$.inner.clientWidth).toBe(50);
      });
   });

   describe("@hostAttributes decorator", () => {
      var el;

      beforeEach(() => {
         el=HostAttributesTest.create();
         querySelector("#put_test_elements_here").appendChild(el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="mybar"));

      it("sets attributes on the host element", () => {
         expect(el.style.color).toBe("red");
      });
   });

   describe("element class", () => {
      var el: ExtendedElementTest;

      beforeEach(() => {
         el = <any> ExtendedElementTest.create();
         querySelector("#put_test_elements_here").appendChild(<any> el);
      });

      // wait for the 'attached' event
      waitFor(() => (el.bar=="mybar"));

      it("can be extended with 'extends'", () => {
         expect(el.prop).toBe("AB");
      });

      it("can be mixed with TypeScript mixins", () => {
         expect(el.pmix).toBe("C");
      });
   });
}
*/
//# sourceMappingURL=specRunner.js.map