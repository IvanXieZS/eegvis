import {div, empty} from "core/dom"
import * as p from "core/properties"
import {LayoutDOM, LayoutDOMView} from "models/layouts/layout_dom"

//import {jQuery} from "jquery.min.js"
// import * as $ from "jquery";
var url = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";

// load jQuery by hand
var script = document.createElement('script');
script.src = url;
script.async = false;
script.onreadystatechange = script.onload = function() {jQuery.noConflict(); };
document.querySelector("head").appendChild(script);
var gLastKeyCode = undefined

// create custom Bokeh model based upon example
export class KeyboardResponderView extends LayoutDOMView {

  initialize(options) {
    super.initialize(options)

    console.log("setting up jQuery");
    console.log(jQuery);
    this.model.keyCode = 0
    jQuery('body').keydown( // same as .on('keydown', handler);
      function(ev) {
          console.log("got key", ev.keyCode);
          // this.model.keyCode = ev.keyCode
          gLastKeyCode = ev.keyCode
          // this.render()
          // how to set lastKeyCode = ev.keyCode
	  // jQuery('#output').text(JSON.stringify(ev.keyCode));
	  // jQuery('#which').text(ev.which);
      });

    this.render()

    // Set listener so that when the a change happens
    // event, we can process the new data
    // this.connect(this.model.slider.change, () => this.render())
  }

  render() {
    // Bokehjs Views (like Backbone) create <div> elements by default, accessible as
    // this.el
    // Many Bokeh views ignore this default <div>, and instead do things
    // like draw to the HTML canvas. In this case though, we change the
    // contents of the <div>, based on the current value.
    console.log('trying render', this.el)
    empty(this.el)
    // this.el.appendChild(document.createTextNode(gLastKeyCode))

  }
}

export class KeyboardResponder extends LayoutDOM {

  // If there is an associated view, this is boilerplate.
  default_view = KeyboardResponderView

  // The ``type`` class attribute should generally match exactly the name
  // of the corresponding Python class.
  type = "KeyboardResponder"
}

// The @define block adds corresponding "properties" to the JS model. These
// should basically line up 1-1 with the Python model class. Most property
// types have counterparts, e.g. bokeh.core.properties.String will be
// p.String in the JS implementation. Where the JS type system is not yet
// as rich, you can use p.Any as a "wildcard" property type.
KeyboardResponder.define({
  // text:   [ p.String ],
  // slider: [ p.Any    ],
  keycode : [ p.Int ],
})