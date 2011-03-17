/**
 * @license Ninja ui JavaScript/CSS Library v0.9.9.9
 * http://ninjaui.com/
 * Copyright 2010, Jamie Hoover
 * Includes jQuery UI draggable and position components
 * http://jqueryui.com/
 */
(function($){
  if(!$.ui || !$.ui.core || $.ui.version !='1.8.6'){
/*!
 * jQuery UI 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function( $, undefined ) {

$.ui = $.ui || {};
if ( $.ui.version ) {
	return;
}

$.extend( $.ui, {
	version: "1.8.6",

	keyCode: {
		ALT: 18,
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		COMMA: 188,
		COMMAND: 91,
		COMMAND_LEFT: 91, // COMMAND
		COMMAND_RIGHT: 93,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		MENU: 93, // COMMAND_RIGHT
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38,
		WINDOWS: 91 // COMMAND
	}
});

$.fn.extend({
	_focus: $.fn.focus,
	focus: function( delay, fn ) {
		return typeof delay === "number" ?
			this.each(function() {
				var elem = this;
				setTimeout(function() {
					$( elem ).focus();
					if ( fn ) {
						fn.call( elem );
					}
				}, delay );
			}) :
			this._focus.apply( this, arguments );
	},

	scrollParent: function() {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function() {
				return (/(relative|absolute|fixed)/).test($.curCSS(this,'position',1)) && (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function() {
				return (/(auto|scroll)/).test($.curCSS(this,'overflow',1)+$.curCSS(this,'overflow-y',1)+$.curCSS(this,'overflow-x',1));
			}).eq(0);
		}

		return (/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	},

	disableSelection: function() {
		return this.bind( ( $.support.selectstart ? "selectstart" : "mousedown" ) +
			".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
	},

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	}
});

$.each( [ "Width", "Height" ], function( i, name ) {
	var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
		type = name.toLowerCase(),
		orig = {
			innerWidth: $.fn.innerWidth,
			innerHeight: $.fn.innerHeight,
			outerWidth: $.fn.outerWidth,
			outerHeight: $.fn.outerHeight
		};

	function reduce( elem, size, border, margin ) {
		$.each( side, function() {
			size -= parseFloat( $.curCSS( elem, "padding" + this, true) ) || 0;
			if ( border ) {
				size -= parseFloat( $.curCSS( elem, "border" + this + "Width", true) ) || 0;
			}
			if ( margin ) {
				size -= parseFloat( $.curCSS( elem, "margin" + this, true) ) || 0;
			}
		});
		return size;
	}

	$.fn[ "inner" + name ] = function( size ) {
		if ( size === undefined ) {
			return orig[ "inner" + name ].call( this );
		}

		return this.each(function() {
			$( this ).css( type, reduce( this, size ) + "px" );
		});
	};

	$.fn[ "outer" + name] = function( size, margin ) {
		if ( typeof size !== "number" ) {
			return orig[ "outer" + name ].call( this, size );
		}

		return this.each(function() {
			$( this).css( type, reduce( this, size, true, margin ) + "px" );
		});
	};
});

function visible( element ) {
	return !$( element ).parents().andSelf().filter(function() {
		return $.curCSS( this, "visibility" ) === "hidden" ||
			$.expr.filters.hidden( this );
	}).length;
}

$.extend( $.expr[ ":" ], {
	data: function( elem, i, match ) {
		return !!$.data( elem, match[ 3 ] );
	},

	focusable: function( element ) {
		var nodeName = element.nodeName.toLowerCase(),
			tabIndex = $.attr( element, "tabindex" );
		if ( "area" === nodeName ) {
			var map = element.parentNode,
				mapName = map.name,
				img;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = $( "img[usemap=#" + mapName + "]" )[0];
			return !!img && visible( img );
		}
		return ( /input|select|textarea|button|object/.test( nodeName )
			? !element.disabled
			: "a" == nodeName
				? element.href || !isNaN( tabIndex )
				: !isNaN( tabIndex ))
			&& visible( element );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" );
		return ( isNaN( tabIndex ) || tabIndex >= 0 ) && $( element ).is( ":focusable" );
	}
});

$(function() {
	var body = document.body,
		div = body.appendChild( div = document.createElement( "div" ) );

	$.extend( div.style, {
		minHeight: "100px",
		height: "auto",
		padding: 0,
		borderWidth: 0
	});

	$.support.minHeight = div.offsetHeight === 100;
	$.support.selectstart = "onselectstart" in div;

	body.removeChild( div ).style.display = "none";
});





$.extend( $.ui, {
	plugin: {
		add: function( module, option, set ) {
			var proto = $.ui[ module ].prototype;
			for ( var i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args ) {
			var set = instance.plugins[ name ];
			if ( !set || !instance.element[ 0 ].parentNode ) {
				return;
			}

			for ( var i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	},

	contains: function( a, b ) {
		return document.compareDocumentPosition ?
			a.compareDocumentPosition( b ) & 16 :
			a !== b && a.contains( b );
	},

	hasScroll: function( el, a ) {

		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	isOverAxis: function( x, reference, size ) {
		return ( x > reference ) && ( x < ( reference + size ) );
	},
	isOver: function( y, x, top, left, height, width ) {
		return $.ui.isOverAxis( y, top, height ) && $.ui.isOverAxis( x, left, width );
	}
});

})( jQuery );
  }
  if(!$.ui || !$.ui.widget || $.ui.version !='1.8.6'){
/*!
 * jQuery UI Widget 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function( $, undefined ) {

if ( $.cleanData ) {
	var _cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			$( elem ).triggerHandler( "remove" );
		}
		_cleanData( elems );
	};
} else {
	var _remove = $.fn.remove;
	$.fn.remove = function( selector, keepData ) {
		return this.each(function() {
			if ( !keepData ) {
				if ( !selector || $.filter( selector, [ this ] ).length ) {
					$( "*", this ).add( [ this ] ).each(function() {
						$( this ).triggerHandler( "remove" );
					});
				}
			}
			return _remove.call( $(this), selector, keepData );
		});
	};
}

$.widget = function( name, base, prototype ) {
	var namespace = name.split( "." )[ 0 ],
		fullName;
	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	$.expr[ ":" ][ fullName ] = function( elem ) {
		return !!$.data( elem, name );
	};

	$[ namespace ] = $[ namespace ] || {};
	$[ namespace ][ name ] = function( options, element ) {
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};

	var basePrototype = new base();
	basePrototype.options = $.extend( true, {}, basePrototype.options );
	$[ namespace ][ name ].prototype = $.extend( true, basePrototype, {
		namespace: namespace,
		widgetName: name,
		widgetEventPrefix: $[ namespace ][ name ].prototype.widgetEventPrefix || name,
		widgetBaseClass: fullName
	}, prototype );

	$.widget.bridge( name, $[ namespace ][ name ] );
};

$.widget.bridge = function( name, object ) {
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		options = !isMethodCall && args.length ?
			$.extend.apply( null, [ true, options ].concat(args) ) :
			options;

		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, name ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, name );
				if ( instance ) {
					instance.option( options || {} )._init();
				} else {
					$.data( this, name, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( options, element ) {
	if ( arguments.length ) {
		this._createWidget( options, element );
	}
};

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	options: {
		disabled: false
	},
	_createWidget: function( options, element ) {
		$.data( element, this.widgetName, this );
		this.element = $( element );
		this.options = $.extend( true, {},
			this.options,
			this._getCreateOptions(),
			options );

		var self = this;
		this.element.bind( "remove." + this.widgetName, function() {
			self.destroy();
		});

		this._create();
		this._trigger( "create" );
		this._init();
	},
	_getCreateOptions: function() {
		return $.metadata && $.metadata.get( this.element[0] )[ this.widgetName ];
	},
	_create: function() {},
	_init: function() {},

	destroy: function() {
		this.element
			.unbind( "." + this.widgetName )
			.removeData( this.widgetName );
		this.widget()
			.unbind( "." + this.widgetName )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetBaseClass + "-disabled " +
				"ui-state-disabled" );
	},

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key;

		if ( arguments.length === 0 ) {
			return $.extend( {}, this.options );
		}

		if  (typeof key === "string" ) {
			if ( value === undefined ) {
				return this.options[ key ];
			}
			options = {};
			options[ key ] = value;
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var self = this;
		$.each( options, function( key, value ) {
			self._setOption( key, value );
		});

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				[ value ? "addClass" : "removeClass"](
					this.widgetBaseClass + "-disabled" + " " +
					"ui-state-disabled" )
				.attr( "aria-disabled", value );
		}

		return this;
	},

	enable: function() {
		return this._setOption( "disabled", false );
	},
	disable: function() {
		return this._setOption( "disabled", true );
	},

	_trigger: function( type, event, data ) {
		var callback = this.options[ type ];

		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		data = data || {};

		if ( event.originalEvent ) {
			for ( var i = $.event.props.length, prop; i; ) {
				prop = $.event.props[ --i ];
				event[ prop ] = event.originalEvent[ prop ];
			}
		}

		this.element.trigger( event, data );

		return !( $.isFunction(callback) &&
			callback.call( this.element[0], event, data ) === false ||
			event.isDefaultPrevented() );
	}
};

})( jQuery );
  }
  if(!$.ui || !$.ui.mouse || $.ui.version !='1.8.6'){
/*!
 * jQuery UI Mouse 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.mouse", {
	options: {
		cancel: ':input,option',
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var self = this;

		this.element
			.bind('mousedown.'+this.widgetName, function(event) {
				return self._mouseDown(event);
			})
			.bind('click.'+this.widgetName, function(event) {
				if(self._preventClickEvent) {
					self._preventClickEvent = false;
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	_mouseDestroy: function() {
		this.element.unbind('.'+this.widgetName);
	},

	_mouseDown: function(event) {
		event.originalEvent = event.originalEvent || {};
		if (event.originalEvent.mouseHandled) { return; }

		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var self = this,
			btnIsLeft = (event.which == 1),
			elIsCancel = (typeof this.options.cancel == "string" ? $(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				self.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		this._mouseMoveDelegate = function(event) {
			return self._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return self._mouseUp(event);
		};
		$(document)
			.bind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.bind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		event.preventDefault();
		event.originalEvent.mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		if ($.browser.msie && !(document.documentMode >= 9) && !event.button) {
			return this._mouseUp(event);
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		$(document)
			.unbind('mousemove.'+this.widgetName, this._mouseMoveDelegate)
			.unbind('mouseup.'+this.widgetName, this._mouseUpDelegate);

		if (this._mouseStarted) {
			this._mouseStarted = false;
			this._preventClickEvent = (event.target == this._mouseDownEvent.target);
			this._mouseStop(event);
		}

		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(event) {
		return this.mouseDelayMet;
	},

	_mouseStart: function(event) {},
	_mouseDrag: function(event) {},
	_mouseStop: function(event) {},
	_mouseCapture: function(event) { return true; }
});

})(jQuery);
  }
  if(!$.ui || !$.ui.position || $.ui.version !='1.8.6'){
/*
 * jQuery UI Position 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function( $, undefined ) {

$.ui = $.ui || {};

var horizontalPositions = /left|center|right/,
	verticalPositions = /top|center|bottom/,
	center = "center",
	_position = $.fn.position,
	_offset = $.fn.offset;

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	options = $.extend( {}, options );

	var target = $( options.of ),
		targetElem = target[0],
		collision = ( options.collision || "flip" ).split( " " ),
		offset = options.offset ? options.offset.split( " " ) : [ 0, 0 ],
		targetWidth,
		targetHeight,
		basePosition;

	if ( targetElem.nodeType === 9 ) {
		targetWidth = target.width();
		targetHeight = target.height();
		basePosition = { top: 0, left: 0 };
	} else if ( targetElem.setTimeout ) {
		targetWidth = target.width();
		targetHeight = target.height();
		basePosition = { top: target.scrollTop(), left: target.scrollLeft() };
	} else if ( targetElem.preventDefault ) {
		options.at = "left top";
		targetWidth = targetHeight = 0;
		basePosition = { top: options.of.pageY, left: options.of.pageX };
	} else {
		targetWidth = target.outerWidth();
		targetHeight = target.outerHeight();
		basePosition = target.offset();
	}

	$.each( [ "my", "at" ], function() {
		var pos = ( options[this] || "" ).split( " " );
		if ( pos.length === 1) {
			pos = horizontalPositions.test( pos[0] ) ?
				pos.concat( [center] ) :
				verticalPositions.test( pos[0] ) ?
					[ center ].concat( pos ) :
					[ center, center ];
		}
		pos[ 0 ] = horizontalPositions.test( pos[0] ) ? pos[ 0 ] : center;
		pos[ 1 ] = verticalPositions.test( pos[1] ) ? pos[ 1 ] : center;
		options[ this ] = pos;
	});

	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	offset[ 0 ] = parseInt( offset[0], 10 ) || 0;
	if ( offset.length === 1 ) {
		offset[ 1 ] = offset[ 0 ];
	}
	offset[ 1 ] = parseInt( offset[1], 10 ) || 0;

	if ( options.at[0] === "right" ) {
		basePosition.left += targetWidth;
	} else if (options.at[0] === center ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[1] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[1] === center ) {
		basePosition.top += targetHeight / 2;
	}

	basePosition.left += offset[ 0 ];
	basePosition.top += offset[ 1 ];

	return this.each(function() {
		var elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseInt( $.curCSS( this, "marginLeft", true ) ) || 0,
			marginTop = parseInt( $.curCSS( this, "marginTop", true ) ) || 0,
			collisionWidth = elemWidth + marginLeft +
				parseInt( $.curCSS( this, "marginRight", true ) ) || 0,
			collisionHeight = elemHeight + marginTop +
				parseInt( $.curCSS( this, "marginBottom", true ) ) || 0,
			position = $.extend( {}, basePosition ),
			collisionPosition;

		if ( options.my[0] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[0] === center ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[1] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[1] === center ) {
			position.top -= elemHeight / 2;
		}

		position.left = parseInt( position.left );
		position.top = parseInt( position.top );

		collisionPosition = {
			left: position.left - marginLeft,
			top: position.top - marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[i] ] ) {
				$.ui.position[ collision[i] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: offset,
					my: options.my,
					at: options.at
				});
			}
		});

		if ( $.fn.bgiframe ) {
			elem.bgiframe();
		}
		elem.offset( $.extend( position, { using: options.using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var win = $( window ),
				over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft();
			position.left = over > 0 ? position.left - over : Math.max( position.left - data.collisionPosition.left, position.left );
		},
		top: function( position, data ) {
			var win = $( window ),
				over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop();
			position.top = over > 0 ? position.top - over : Math.max( position.top - data.collisionPosition.top, position.top );
		}
	},

	flip: {
		left: function( position, data ) {
			if ( data.at[0] === center ) {
				return;
			}
			var win = $( window ),
				over = data.collisionPosition.left + data.collisionWidth - win.width() - win.scrollLeft(),
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					-data.targetWidth,
				offset = -2 * data.offset[ 0 ];
			position.left += data.collisionPosition.left < 0 ?
				myOffset + atOffset + offset :
				over > 0 ?
					myOffset + atOffset + offset :
					0;
		},
		top: function( position, data ) {
			if ( data.at[1] === center ) {
				return;
			}
			var win = $( window ),
				over = data.collisionPosition.top + data.collisionHeight - win.height() - win.scrollTop(),
				myOffset = data.my[ 1 ] === "top" ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					-data.targetHeight,
				offset = -2 * data.offset[ 1 ];
			position.top += data.collisionPosition.top < 0 ?
				myOffset + atOffset + offset :
				over > 0 ?
					myOffset + atOffset + offset :
					0;
		}
	}
};

if ( !$.offset.setOffset ) {
	$.offset.setOffset = function( elem, options ) {
		if ( /static/.test( $.curCSS( elem, "position" ) ) ) {
			elem.style.position = "relative";
		}
		var curElem   = $( elem ),
			curOffset = curElem.offset(),
			curTop    = parseInt( $.curCSS( elem, "top",  true ), 10 ) || 0,
			curLeft   = parseInt( $.curCSS( elem, "left", true ), 10)  || 0,
			props     = {
				top:  (options.top  - curOffset.top)  + curTop,
				left: (options.left - curOffset.left) + curLeft
			};

		if ( 'using' in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	};

	$.fn.offset = function( options ) {
		var elem = this[ 0 ];
		if ( !elem || !elem.ownerDocument ) { return null; }
		if ( options ) {
			return this.each(function() {
				$.offset.setOffset( this, options );
			});
		}
		return _offset.call( this );
	};
}

}( jQuery ));
  }
  if(!$.ui || !$.ui.draggable || $.ui.version !='1.8.6'){
/*
 * jQuery UI Draggable 1.8.6
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function( $, undefined ) {

$.widget("ui.draggable", $.ui.mouse, {
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false
	},
	_create: function() {

		if (this.options.helper == 'original' && !(/^(?:r|a|f)/).test(this.element.css("position")))
			this.element[0].style.position = 'relative';

		(this.options.addClasses && this.element.addClass("ui-draggable"));
		(this.options.disabled && this.element.addClass("ui-draggable-disabled"));

		this._mouseInit();

	},

	destroy: function() {
		if(!this.element.data('draggable')) return;
		this.element
			.removeData("draggable")
			.unbind(".draggable")
			.removeClass("ui-draggable"
				+ " ui-draggable-dragging"
				+ " ui-draggable-disabled");
		this._mouseDestroy();

		return this;
	},

	_mouseCapture: function(event) {

		var o = this.options;

		if (this.helper || o.disabled || $(event.target).is('.ui-resizable-handle'))
			return false;

		this.handle = this._getHandle(event);
		if (!this.handle)
			return false;

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		this.helper = this._createHelper(event);

		this._cacheHelperProportions();

		if($.ui.ddmanager)
			$.ui.ddmanager.current = this;

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		this._cacheMargins();

		this.cssPosition = this.helper.css("position");
		this.scrollParent = this.helper.scrollParent();

		this.offset = this.positionAbs = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		this.originalPosition = this.position = this._generatePosition(event);
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		if(o.containment)
			this._setContainment();

		if(this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		this._cacheHelperProportions();

		if ($.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(this, event);

		this.helper.addClass("ui-draggable-dragging");
		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position
		return true;
	},

	_mouseDrag: function(event, noPropagation) {

		this.position = this._generatePosition(event);
		this.positionAbs = this._convertPositionTo("absolute");

		if (!noPropagation) {
			var ui = this._uiHash();
			if(this._trigger('drag', event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
		if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';
		if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

		return false;
	},

	_mouseStop: function(event) {

		var dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour)
			dropped = $.ui.ddmanager.drop(this, event);

		if(this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if(!this.element[0] || !this.element[0].parentNode)
			return false;

		if((this.options.revert == "invalid" && !dropped) || (this.options.revert == "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			var self = this;
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if(self._trigger("stop", event) !== false) {
					self._clear();
				}
			});
		} else {
			if(this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	cancel: function() {

		if(this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}

		return this;

	},

	_getHandle: function(event) {

		var handle = !this.options.handle || !$(this.options.handle, this.element).length ? true : false;
		$(this.options.handle, this.element)
			.find("*")
			.andSelf()
			.each(function() {
				if(this == event.target) handle = true;
			});

		return handle;

	},

	_createHelper: function(event) {

		var o = this.options;
		var helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event])) : (o.helper == 'clone' ? this.element.clone() : this.element);

		if(!helper.parents('body').length)
			helper.appendTo((o.appendTo == 'parent' ? this.element[0].parentNode : o.appendTo));

		if(helper[0] != this.element[0] && !(/(fixed|absolute)/).test(helper.css("position")))
			helper.css("position", "absolute");

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj == 'string') {
			obj = obj.split(' ');
		}
		if ($.isArray(obj)) {
			obj = {left: +obj[0], top: +obj[1] || 0};
		}
		if ('left' in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ('right' in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ('top' in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ('bottom' in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_getParentOffset: function() {

		this.offsetParent = this.helper.offsetParent();
		var po = this.offsetParent.offset();

		if(this.cssPosition == 'absolute' && this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if((this.offsetParent[0] == document.body) //This needs to be actually done for all browsers, since pageX/pageY includes this information
		|| (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == 'html' && $.browser.msie)) //Ugly IE fix
			po = { top: 0, left: 0 };

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"),10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"),10) || 0)
		};

	},

	_getRelativeOffset: function() {

		if(this.cssPosition == "relative") {
			var p = this.element.position();
			return {
				top: p.top - (parseInt(this.helper.css("top"),10) || 0) + this.scrollParent.scrollTop(),
				left: p.left - (parseInt(this.helper.css("left"),10) || 0) + this.scrollParent.scrollLeft()
			};
		} else {
			return { top: 0, left: 0 };
		}

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"),10) || 0),
			top: (parseInt(this.element.css("marginTop"),10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var o = this.options;
		if(o.containment == 'parent') o.containment = this.helper[0].parentNode;
		if(o.containment == 'document' || o.containment == 'window') this.containment = [
			0 - this.offset.relative.left - this.offset.parent.left,
			0 - this.offset.relative.top - this.offset.parent.top,
			$(o.containment == 'document' ? document : window).width() - this.helperProportions.width - this.margins.left,
			($(o.containment == 'document' ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top
		];

		if(!(/^(document|window|parent)$/).test(o.containment) && o.containment.constructor != Array) {
			var ce = $(o.containment)[0]; if(!ce) return;
			var co = $(o.containment).offset();
			var over = ($(ce).css("overflow") != 'hidden');

			this.containment = [
				co.left + (parseInt($(ce).css("borderLeftWidth"),10) || 0) + (parseInt($(ce).css("paddingLeft"),10) || 0) - this.margins.left,
				co.top + (parseInt($(ce).css("borderTopWidth"),10) || 0) + (parseInt($(ce).css("paddingTop"),10) || 0) - this.margins.top,
				co.left+(over ? Math.max(ce.scrollWidth,ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"),10) || 0) - (parseInt($(ce).css("paddingRight"),10) || 0) - this.helperProportions.width - this.margins.left,
				co.top+(over ? Math.max(ce.scrollHeight,ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"),10) || 0) - (parseInt($(ce).css("paddingBottom"),10) || 0) - this.helperProportions.height - this.margins.top
			];
		} else if(o.containment.constructor == Array) {
			this.containment = o.containment;
		}

	},

	_convertPositionTo: function(d, pos) {

		if(!pos) pos = this.position;
		var mod = d == "absolute" ? 1 : -1;
		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);

		return {
			top: (
				pos.top																	// The absolute mouse position
				+ this.offset.relative.top * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.top * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod)
			),
			left: (
				pos.left																// The absolute mouse position
				+ this.offset.relative.left * mod										// Only for relative positioned nodes: Relative offset from element to offset parent
				+ this.offset.parent.left * mod											// The offsetParent's offset without borders (offset + border)
				- ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ) * mod)
			)
		};

	},

	_generatePosition: function(event) {

		var o = this.options, scroll = this.cssPosition == 'absolute' && !(this.scrollParent[0] != document && $.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
		var pageX = event.pageX;
		var pageY = event.pageY;

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		if(this.originalPosition) { //If we are not dragging yet, we won't check for options

			if(this.containment) {
				if(event.pageX - this.offset.click.left < this.containment[0]) pageX = this.containment[0] + this.offset.click.left;
				if(event.pageY - this.offset.click.top < this.containment[1]) pageY = this.containment[1] + this.offset.click.top;
				if(event.pageX - this.offset.click.left > this.containment[2]) pageX = this.containment[2] + this.offset.click.left;
				if(event.pageY - this.offset.click.top > this.containment[3]) pageY = this.containment[3] + this.offset.click.top;
			}

			if(o.grid) {
				var top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
				pageY = this.containment ? (!(top - this.offset.click.top < this.containment[1] || top - this.offset.click.top > this.containment[3]) ? top : (!(top - this.offset.click.top < this.containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				var left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
				pageX = this.containment ? (!(left - this.offset.click.left < this.containment[0] || left - this.offset.click.left > this.containment[2]) ? left : (!(left - this.offset.click.left < this.containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

		}

		return {
			top: (
				pageY																// The absolute mouse position
				- this.offset.click.top													// Click offset (relative to the element)
				- this.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.top												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
			),
			left: (
				pageX																// The absolute mouse position
				- this.offset.click.left												// Click offset (relative to the element)
				- this.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
				- this.offset.parent.left												// The offsetParent's offset without borders (offset + border)
				+ ($.browser.safari && $.browser.version < 526 && this.cssPosition == 'fixed' ? 0 : ( this.cssPosition == 'fixed' ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if(this.helper[0] != this.element[0] && !this.cancelHelperRemoval) this.helper.remove();
		this.helper = null;
		this.cancelHelperRemoval = false;
	},


	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call(this, type, [event, ui]);
		if(type == "drag") this.positionAbs = this._convertPositionTo("absolute"); //The absolute position has to be recalculated after plugins
		return $.Widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function(event) {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.extend($.ui.draggable, {
	version: "1.8.6"
});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $.data(this, 'sortable');
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable._refreshItems();	//Do a one-time refresh at start to refresh the containerCache
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function(event, ui) {

		var inst = $(this).data("draggable"),
			uiSortable = $.extend({}, ui, { item: inst.element });

		$.each(inst.sortables, function() {
			if(this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				if(this.shouldRevert) this.instance.options.revert = true;

				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				if(inst.options.helper == 'original')
					this.instance.currentItem.css({ top: 'auto', left: 'auto' });

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), self = this;

		var checkPos = function(o) {
			var dyClick = this.offset.click.top, dxClick = this.offset.click.left;
			var helperTop = this.positionAbs.top, helperLeft = this.positionAbs.left;
			var itemHeight = o.height, itemWidth = o.width;
			var itemTop = o.top, itemLeft = o.left;

			return $.ui.isOver(helperTop + dyClick, helperLeft + dxClick, itemTop, itemLeft, itemHeight, itemWidth);
		};

		$.each(inst.sortables, function(i) {

			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;

			if(this.instance._intersectsWith(this.instance.containerCache)) {

				if(!this.instance.isOver) {

					this.instance.isOver = 1;
					this.instance.currentItem = $(self).clone().appendTo(this.instance.element).data("sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				if(this.instance.currentItem) this.instance._mouseDrag(event);

			} else {

				if(this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;

					this.instance.options.revert = false;

					this.instance._trigger('out', event, this.instance._uiHash(this.instance));

					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					this.instance.currentItem.remove();
					if(this.instance.placeholder) this.instance.placeholder.remove();

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			};

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function(event, ui) {
		var t = $('body'), o = $(this).data('draggable').options;
		if (t.css("cursor")) o._cursor = t.css("cursor");
		t.css("cursor", o.cursor);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if (o._cursor) $('body').css("cursor", o._cursor);
	}
});

$.ui.plugin.add("draggable", "iframeFix", {
	start: function(event, ui) {
		var o = $(this).data('draggable').options;
		$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
			$('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>')
			.css({
				width: this.offsetWidth+"px", height: this.offsetHeight+"px",
				position: "absolute", opacity: "0.001", zIndex: 1000
			})
			.css($(this).offset())
			.appendTo("body");
		});
	},
	stop: function(event, ui) {
		$("div.ui-draggable-iframeFix").each(function() { this.parentNode.removeChild(this); }); //Remove frame helpers
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data('draggable').options;
		if(t.css("opacity")) o._opacity = t.css("opacity");
		t.css('opacity', o.opacity);
	},
	stop: function(event, ui) {
		var o = $(this).data('draggable').options;
		if(o._opacity) $(ui.helper).css('opacity', o._opacity);
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function(event, ui) {
		var i = $(this).data("draggable");
		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') i.overflowOffset = i.scrollParent.offset();
	},
	drag: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options, scrolled = false;

		if(i.scrollParent[0] != document && i.scrollParent[0].tagName != 'HTML') {

			if(!o.axis || o.axis != 'x') {
				if((i.overflowOffset.top + i.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed;
				else if(event.pageY - i.overflowOffset.top < o.scrollSensitivity)
					i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed;
			}

			if(!o.axis || o.axis != 'y') {
				if((i.overflowOffset.left + i.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed;
				else if(event.pageX - i.overflowOffset.left < o.scrollSensitivity)
					i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed;
			}

		} else {

			if(!o.axis || o.axis != 'x') {
				if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
			}

			if(!o.axis || o.axis != 'y') {
				if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
			}

		}

		if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
			$.ui.ddmanager.prepareOffsets(i, event);

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function(event, ui) {

		var i = $(this).data("draggable"), o = i.options;
		i.snapElements = [];

		$(o.snap.constructor != String ? ( o.snap.items || ':data(draggable)' ) : o.snap).each(function() {
			var $t = $(this); var $o = $t.offset();
			if(this != i.element[0]) i.snapElements.push({
				item: this,
				width: $t.outerWidth(), height: $t.outerHeight(),
				top: $o.top, left: $o.left
			});
		});

	},
	drag: function(event, ui) {

		var inst = $(this).data("draggable"), o = inst.options;
		var d = o.snapTolerance;

		var x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (var i = inst.snapElements.length - 1; i >= 0; i--){

			var l = inst.snapElements[i].left, r = l + inst.snapElements[i].width,
				t = inst.snapElements[i].top, b = t + inst.snapElements[i].height;

			if(!((l-d < x1 && x1 < r+d && t-d < y1 && y1 < b+d) || (l-d < x1 && x1 < r+d && t-d < y2 && y2 < b+d) || (l-d < x2 && x2 < r+d && t-d < y1 && y1 < b+d) || (l-d < x2 && x2 < r+d && t-d < y2 && y2 < b+d))) {
				if(inst.snapElements[i].snapping) (inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				inst.snapElements[i].snapping = false;
				continue;
			}

			if(o.snapMode != 'inner') {
				var ts = Math.abs(t - y2) <= d;
				var bs = Math.abs(b - y1) <= d;
				var ls = Math.abs(l - x2) <= d;
				var rs = Math.abs(r - x1) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
			}

			var first = (ts || bs || ls || rs);

			if(o.snapMode != 'outer') {
				var ts = Math.abs(t - y1) <= d;
				var bs = Math.abs(b - y2) <= d;
				var ls = Math.abs(l - x1) <= d;
				var rs = Math.abs(r - x2) <= d;
				if(ts) ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				if(bs) ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				if(ls) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				if(rs) ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
			}

			if(!inst.snapElements[i].snapping && (ts || bs || ls || rs || first))
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		};

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function(event, ui) {

		var o = $(this).data("draggable").options;

		var group = $.makeArray($(o.stack)).sort(function(a,b) {
			return (parseInt($(a).css("zIndex"),10) || 0) - (parseInt($(b).css("zIndex"),10) || 0);
		});
		if (!group.length) { return; }

		var min = parseInt(group[0].style.zIndex) || 0;
		$(group).each(function(i) {
			this.style.zIndex = min + i;
		});

		this[0].style.zIndex = min + group.length;

	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function(event, ui) {
		var t = $(ui.helper), o = $(this).data("draggable").options;
		if(t.css("zIndex")) o._zIndex = t.css("zIndex");
		t.css('zIndex', o.zIndex);
	},
	stop: function(event, ui) {
		var o = $(this).data("draggable").options;
		if(o._zIndex) $(ui.helper).css('zIndex', o._zIndex);
	}
});

})(jQuery);
  }
$.fn.ninjaButtonCreate = function(customOptions){
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    icon:null,
    onDeselect:function(){},
    onSelect:function(){},
    radius:$.ninjaRadius,
    size:null,
    state:null,
    title:null
  }, customOptions);
  return this.each(function(i, button){
    $(button).data({options:options});
    $(button).addClass('ninjaPlastic').ninjaRadius({radius:options.radius});
    if(options.size){
      $button.css({fontSize:options.size});
    }
    if($(button).is('input')){
      if(options.title){
        $(button).val(options.title);
      }
    }
    else{
      if(options.title){
        $(button).text(options.title);
      }
      if(options.icon){
        if(options.title){
          $(button).prepend('&#160;');
        }
        $(button).prepend('<span/>');
        $('span', button).ninjaIconCreate(options.icon).css({height:$(button).height(), position:'relative', top:'-2px'});
      }
    }
    if(options.state == 'disabled'){
      $(button).ninjaButtonDisable();
    }
    else{
      $(button).ninjaButtonEnable();
    }
  });
};

$.fn.ninjaButtonDeselect = function(event){
  return this.each(function(i, button){
    var options = $(button).data().options;
    $(button).removeClass('ninjaSelected');
    if($(button).attr('type') == 'submit'){
      $(button).css(options.colors.foregroundSubmit);
    }
    else{
      $(button).css(options.colors.foreground);
    }
    $('.ninjaIcon', button).ninjaIconLightness();
    options.onDeselect.call(button, event);
  });
};

$.fn.ninjaButtonDisable = function(){
  return this.each(function(i, button){
    var options = $(button).data().options;
    $(button).animate({opacity:0.5}).removeClass('ninjaEnabled').css(options.colors.foregroundDisabled);
    if($(button).is('input')){
      $(button).attr('disabled', 'disabled');
    }
    $(button).unbind('click');
  });
};

$.fn.ninjaButtonEnable = function(){
  return this.each(function(i, button){
    var options = $(button).data().options;
    $(button).animate({opacity:1}).addClass('ninjaEnabled');
    if($(button).is('input')){
      $(button).removeAttr('disabled');
    }
    if(options.state == 'selected' || $(button).hasClass('ninjaSelected')){
      $(button).addClass('ninjaSelected').css(options.colors.foregroundSelected);
    }
    else if($(button).is('input') && $(button).attr('type') == 'submit'){
      $(button).css(options.colors.foregroundSubmit);
    }
    else{
      $(button).css(options.colors.foreground);
    }
    $('.ninjaIcon', button).ninjaIconLightness();
    $(button).click(function(event){
      if($(button).hasClass('ninjaSelected')){
        $(button).ninjaButtonDeselect(event);
      }
      else{
        $(button).ninjaButtonSelect(event);
      }
    });
  });
};

$.fn.ninjaButtonSelect = function(event){
  return this.each(function(i, button){
    var options = $(button).data().options;
    $(button).addClass('ninjaSelected').css(options.colors.foregroundSelected);
    $('.ninjaIcon', button).ninjaIconLightness();
    options.onSelect.call(button, event);
  });
};
$.ninjaColors = {
  background:{
    backgroundColor:'#fff',
    borderColor:'#ccc',
    color:'#333'
  },
  foreground:{
    backgroundColor:'#ccc',
    borderColor:'#999',
    color:'#000'
  },
  foregroundDisabled:{
    backgroundColor:'#ccc',
    borderColor:'#999',
    color:'#000'
  },
  foregroundEnabled:{
    backgroundColor:'#999',
    borderColor:'#666',
    color:'#000'
  },
  foregroundSelected:{
    backgroundColor:'#c00',
    borderColor:'#900',
    color:'#fff'
  },
  foregroundSubmit:{
    backgroundColor:'#39c',
    borderColor:'#069',
    color:'#fff'
  },
  rating:{
    group:'#39c',
    single:'#c00',
    unselected:'#999'
  }
};

$.ninjaColorsGet = function(customColors){
  return $.extend({}, $.ninjaColors, customColors);
};

$.ninjaColorsSet = function(customColors){
  $.extend($.ninjaColors, customColors);
};

$.fn.ninjaLightness = function(){
  var color = this.css('background-color');
  if(color != undefined && color !== '' && color != 'transparent' && color != 'rgba(0, 0, 0, 0)'){
    function lightness(colorRGB){
      return (299*colorRGB[0] + 587*colorRGB[1] + 114*colorRGB[2])/1000;
    }
    var result;
    if(result = (/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/).exec(color)){
      return lightness([result[1], result[2], result[3]]); // rgb(#,#,#)
    }
    else if(result = (/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/).exec(color)){
      return lightness([parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55]); // rgb(%,%,%)
    }
    else if(result = (/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/).exec(color)){
      return lightness([parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16)]); // #a0b1c2
    }
    else if(result = (/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/).exec(color)){
      return lightness([parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16)]); // #fff
    }
    else{
      var colors = {
        aqua:[0,255,255],
        azure:[240,255,255],
        beige:[245,245,220],
        black:[0,0,0],
        blue:[0,0,255],
        brown:[165,42,42],
        cyan:[0,255,255],
        darkblue:[0,0,139],
        darkcyan:[0,139,139],
        darkgrey:[169,169,169],
        darkgreen:[0,100,0],
        darkkhaki:[189,183,107],
        darkmagenta:[139,0,139],
        darkolivegreen:[85,107,47],
        darkorange:[255,140,0],
        darkorchid:[153,50,204],
        darkred:[139,0,0],
        darksalmon:[233,150,122],
        darkviolet:[148,0,211],
        fuchsia:[255,0,255],
        gold:[255,215,0],
        green:[0,128,0],
        indigo:[75,0,130],
        khaki:[240,230,140],
        lightblue:[173,216,230],
        lightcyan:[224,255,255],
        lightgreen:[144,238,144],
        lightgrey:[211,211,211],
        lightpink:[255,182,193],
        lightyellow:[255,255,224],
        lime:[0,255,0],
        magenta:[255,0,255],
        maroon:[128,0,0],
        navy:[0,0,128],
        olive:[128,128,0],
        orange:[255,165,0],
        pink:[255,192,203],
        purple:[128,0,128],
        violet:[128,0,128],
        red:[255,0,0],
        silver:[192,192,192],
        white:[255,255,255],
        yellow:[255,255,0],
        transparent:[255,255,255]
      };
      return lightness(colors[jQuery.trim(color).toLowerCase()]); // named color
    }
  }
  else{
    var parent = this.parent();
    if(typeof(parent) == 'array' && parent.length() > 0){
      parent.ninjaLightness();
    }
    else{
      return 255;
    }
  }
};
$.fn.ninjaDrawersCreate = function(customOptions){
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    onClose:function(){},
    onOpen:function(){},
    radius:$.ninjaRadius,
    selected:null
  }, customOptions);
  this.each(function(i, drawer){
    $(drawer).data({options:options});
    $(drawer).hide().addClass('ninjaPaper').css(options.colors.background).before('<div/>');
    var handle = $(drawer).prev('div').addClass('ninjaPlastic ninjaEnabled').css(options.colors.foreground).text($(drawer).attr('title')).prepend('<span/>&#160;');
    $('span', handle).ninjaIconCreate('right').position({
      at:'left center',
      of:handle,
      offset:$(handle).css('padding-left') + ' 0',
      my:'left center'
    });
    $(handle).click(function() {
      if($(handle).hasClass('ninjaSelected')) {
        $(drawer).ninjaDrawersClose();
      }
      else {
        $(drawer).ninjaDrawersOpen();
      }
    });
  });
  this.first().prev('div.ninjaPlastic').ninjaRadius({corners:'top', radius:options.radius});
  this.last().css({borderBottomStyle:'solid'}).ninjaRadius({corners:'bottom', radius:options.radius}).prev('div.ninjaPlastic').ninjaRadius({corners:'bottom', radius:options.radius}).addClass('ninjaLast');
  if(options.selected != null){
    $(options.selected).ninjaDrawersOpen();
  }
  return this;
};

$.fn.ninjaDrawersClose = function(){
  return this.each(function(i, drawer){
    var options = $(drawer).data().options;
    options.onClose.call(drawer);
    var handle = $(drawer).prev('div.ninjaPlastic');
    var icon = $('span.ninjaIcon', handle);
    $(drawer).slideUp(function(){
      $(handle).removeClass('ninjaSelected').css(options.colors.foreground);
      $(icon).addClass('ninjaIcon-right').removeClass('ninjaIcon-down');
      if($(handle).hasClass('ninjaLast')){
        $(handle).ninjaRadius({corners:'bottom', radius:options.radius});
      }
    });
  });
};

$.fn.ninjaDrawersOpen = function(){
  return this.each(function(i, drawer) {
    var options = $(drawer).data().options;
    options.onOpen.call(drawer);
    var handle = $(drawer).prev('div.ninjaPlastic');
    var icon = $('span.ninjaIcon', handle);
    $(handle).addClass('ninjaSelected').css(options.colors.foregroundSelected);
    $(icon).addClass('ninjaIcon-down').removeClass('ninjaIcon-right');
    $(drawer).slideDown();
    if($(handle).hasClass('ninjaLast')){
      $(handle).ninjaRadius({radius:'0'});
    }
  });
};
$.fn.ninjaFilmstripCreate = function(customOptions) {
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    frameHeight:100,
    frameWidth:100,
    icon:null,
    onBack:function(){},
    onForward:function(){},
    radius:$.ninjaRadius,
    seconds:0,
    show:3,
    title:null
  }, customOptions);
  var reel = this.each(function (i, frame) {
    $(frame).addClass('ninjaFilmstripFrame').css({borderColor:options.colors.background.borderColor, height:options.frameHeight, width:options.frameWidth});
  }).wrapAll('<span class="ninjaFilmstripReel"/>').parent();
  var view = $(reel).wrap('<span class="ninjaFilmstripView"/>').parent().css(options.colors.background);
  var filmstrip = $(view).wrap('<div class="ninjaFilmstrip"/>').parent();
  var bar = $(filmstrip).prepend('<div class="ninjaPlastic ninjaFilmstripBar"/>').find('.ninjaFilmstripBar').css(options.colors.foreground).ninjaRadius({corners:'top', radius:options.radius});
  if(options.title){
    $(bar).text(options.title);
  }
  if(options.icon){
    if(options.title){
      $(bar).prepend('&#160;');
    }
    $(bar).prepend('<span class="ninjaFilmstripIcon"/>');
    $('.ninjaFilmstripIcon', bar).ninjaIconCreate(options.icon).css({height:$(bar).height(), position:'relative', top:'-2px'});
  }
  var back = $(bar).prepend('<span class="ninjaFilmstripBack"/>').find('.ninjaFilmstripBack').ninjaButtonCreate({icon:'left'}).ninjaRadius({corners:'topLeft', radius:options.radius});
  var forward = $(bar).append('<span class="ninjaFilmstripForward"/>').find('.ninjaFilmstripForward').ninjaButtonCreate({icon:'right'}).ninjaRadius({corners:'topRight', radius:options.radius});
  frameOuterHeight = options.frameHeight + 10;
  frameOuterWidth = options.frameWidth + 11;
  $(reel).height(frameOuterHeight + 'px');
  $(view).height(frameOuterHeight + 'px').width((frameOuterWidth * options.show) - 1 + 'px');
  var pages = Math.ceil(this.length / options.show);
  var currentPage = 1;
  $(bar).width((frameOuterWidth * options.show) - 1 + 'px');
  $(back).click(function(){
    if(currentPage == 1){
      $(reel).animate({left: '-=' + (frameOuterWidth * options.show * (pages -1))});
      currentPage = pages;
    }
    else {
      $(reel).animate({left: '+=' + (frameOuterWidth * options.show)});
      --currentPage;
    }
    options.onBack.call();
    $(back).ninjaButtonDeselect();
  });
  $(forward).click(function(){
    if(currentPage == pages){
      $(reel).animate({left:0});
      currentPage = 1;
    }
    else{
      $(reel).animate({left: '-=' + (frameOuterWidth * options.show)});
      ++currentPage;
    }
    options.onForward.call();
    $(forward).ninjaButtonDeselect();
  });
  if(options.seconds > 0) {
    var milliseconds = options.seconds * 1000;
    var page = 0;
    (function advance() {
      setTimeout(function() {
        if (page++ < pages) {
          $(forward).click();
          advance();
        }
      }, milliseconds);
    })();
  }
  return this;
};
$.fn.ninjaFoldersCreate = function(customOptions) {
  var origin = this;
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    direction:'horizontal',
    onChange:function(){},
    radius:$.ninjaRadius,
    selected:$(origin)[0]
  }, customOptions);
  var folders, tabs;
  if(options.direction == 'horizontal'){
    folders = this.wrapAll('<div class="ninjaFolders"/>').parent();
    tabs = $(folders).prepend('<div class="ninjaFoldersTabs"/>').children('.ninjaFoldersTabs');
  }
  else{
    var foldersColumn = this.wrapAll('<td class="ninjaFoldersColumn"/>').parent();
    tabs = $(foldersColumn).wrapAll('<table cellpadding="0" class="ninjaFolders"><tbody><tr/></tbody></table>').parent().prepend('<td><div class="ninjaFoldersTabs"/></td>').find('.ninjaFoldersTabs');
    folders = $(foldersColumn).closest('.ninjaFolders');
  }
  $(folders).data({options:options});
  this.each(function(i, folder){
    $(folder).addClass('ninjaPaper').css(options.colors.background);
    if(options.direction == 'horizontal'){
      $(tabs).append('<span class="ninjaPlastic ninjaEnabled">' + $(folder).attr('title') + '</span>');
    }
    else{
      $(tabs).append('<div class="ninjaPlastic ninjaEnabled">' + $(folder).attr('title') + '</div>');
    }
  });
  $('.ninjaPlastic:first-child', tabs).addClass('ninjaFoldersFirst').ninjaRadius({corners:'topLeft', radius:options.radius});
  if(options.direction == 'horizontal'){
    $('.ninjaPlastic:last-child', tabs).ninjaRadius({corners:'topRight', radius:options.radius});
  }
  else{
    $('.ninjaPlastic:last-child', tabs).ninjaRadius({corners:'bottomLeft', radius:options.radius});
  }
  $('.ninjaPlastic', tabs).each(function(i, tab) {
    $(tab).click(function() {
      $(origin).ninjaFoldersToggle({init:false, selected:$(origin)[i]});
    });
  });
  $(document).ready(function(){
    $('.ninjaPaper', folders).each(function(i, folder){
      $(folder).css('min-height', $(tabs).height());
    }).ninjaFoldersToggle();
  });
  return this;
};

$.fn.ninjaFoldersToggle = function(customOptions){
  var folders = this.parent().closest('.ninjaFolders');
  var options = $.extend($(folders).data().options, customOptions);
  if(options.init === false){
    options.onChange.call($(options.selected));
  }
  var position;
  this.each(function(i, folder) {
    if($(folder).attr('id') == $(options.selected).attr('id')){
      $(folder).show();
      position = i;
    }
    else{
      $(folder).hide();
    }
  });
  $('.ninjaPlastic', folders).each(function(i, tab) {
    if(position == i){
      $(tab).addClass('ninjaSelected').css(options.colors.foregroundSelected);
    }
    else{
      $(tab).removeClass('ninjaSelected').css(options.colors.foreground);
    }
  });
  return this;
};
$.fn.ninjaIconAnimate = function(customOptions){
  var options = $.extend({
    frames:0,
    frameCurrent:1,
    speed:100
  }, customOptions);
  return this.each(function(i, icon){
    function scroll(){
      if(options.frameCurrent == options.frames){
        options.frameCurrent = 0;
      }
      $(icon).css('backgroundPosition', (options.frameCurrent * -16) + 'px center');
      options.frameCurrent ++;
    }
    setInterval(function(){
      scroll();
    }, options.speed);
  });
};

$.fn.ninjaIconCreate = function(name){
  if(!name){
    name = 'add';
  }
  return this.each(function(i, icon){
    $(icon).addClass('ninjaIcon' + ' ninjaIcon-' + name.toLowerCase()).ninjaIconLightness();
  });
};

$.fn.ninjaIconLightness = function(){
  return this.each(function(i, icon){
    if($(icon).parent().ninjaLightness() < 125){
      $(icon).addClass('ninjaIconWhite').removeClass('ninjaIconBlack');
    }
    else{
      $(icon).addClass('ninjaIconBlack').removeClass('ninjaIconWhite');
    }
  });
};
$.fn.ninjaMenuCreate = function(customOptions) {
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    icon:null,
    onSelect:function(){},
    radius:$.ninjaRadius,
    title:null,
    values:[]
  }, customOptions);
  return this.each(function(i, menu) {
    $(menu).addClass('ninjaMenu').append('<div class="ninjaMenuButton"/><div class="ninjaMenuChoices"/>');
    var choices = $('.ninjaMenuChoices', menu);
    $(options.values).each(function(i, value) {
      $(choices).append('<div class="ninjaPlastic ninjaEnabled ninjaMenuChoice">' + value + '</span>');
    });
    $('.ninjaMenuChoice', choices).each(function(i, choice){
      $(choice).css(options.colors.foreground).mouseover(function(){
        $(choice).css(options.colors.foregroundSelected);
      }).mouseleave(function(){
        $(choice).css(options.colors.foreground);
      }).click(function(){
        options.onSelect.call($(choice));
        $(button).ninjaButtonDeselect({onDeselect:$(choices).slideUp()});
      });
    });
    $('.ninjaMenuChoice:first-child', choices).ninjaRadius({corners:'top', radius:options.radius});
    $('.ninjaMenuChoice:last-child', choices).ninjaRadius({corners:'bottom', radius:options.radius});
    var button = $('.ninjaMenuButton', menu).ninjaButtonCreate({
      icon:options.icon,
      onDeselect:function(){
        $(choices).slideUp();
      },
      onSelect:function(){
        $(choices).mouseleave(function() {
          $(button).ninjaButtonDeselect({onDeselect:$(choices).slideUp()});
        }).slideDown();
        $(document).keyup(function(event) {
          if (event.keyCode == 27) { // esc key
            $(button).ninjaButtonDeselect({onDeselect:$(choices).slideUp()});
            $(document).unbind('keyup');
          }
        });
      },
      title:options.title
    }).append('&#160;<span class="ninjaMenuIcon"/>');
    $('.ninjaMenuIcon', button).ninjaIconCreate('down').css({height:$(button).height(), position:'relative', top:'-2px'});
    $(choices).ninjaRadius({radius:options.radius}).css({top:$(button).outerHeight()});
  });
};
$.ninjaMessageOpen = function(customOptions){
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    content:'',
    icon:null,
    onClose:function(){},
    onOpen:function(){},
    radius:$.ninjaRadius,
    seconds:0,
    title:null
  }, customOptions);
  var message = $(document.body).append('<div class="ninjaMessage"/>').find('.ninjaMessage').css({opacity:0.75}).append('<div class="ninjaPlastic"/><div class="ninjaPaper"/><div class="ninjaMessageReflection"/>');
  var timer = null;
  if(options.seconds > 0){
    var milliseconds = options.seconds * 1000;
    timer = setTimeout(function(){
      $(message).ninjaMessageClose();
    }, milliseconds);
  }
  $(message).data({options:options});
  var handle = $('.ninjaPlastic', message).css(options.colors.foreground);
  if(options.title){
    $(handle).text(options.title);
  }
  if(options.icon){
    if(options.title){
      $(handle).prepend('&#160;');
    }
    $(handle).prepend('<span class="ninjaMessageIcon"/>');
    $('.ninjaMessageIcon', handle).ninjaIconCreate(options.icon).css({height:$(handle).height(), position:'relative', top:'-2px'});
  }
  $(handle).append('<span class="ninjaMessageClose"/>');
  $('.ninjaMessageClose', handle).ninjaButtonCreate({colors:options.colors, icon:'remove', onSelect:function(){
    $(message).ninjaMessageClose(timer);
  }}).ninjaRadius({radius:'0'});
  var content = $('.ninjaPaper', message).html(options.content).css(options.colors.foreground).ninjaRadius({corners:'bottom', radius:options.radius});
  options.onOpen.call(message);
  $('.ninjaMessageReflection').css(options.colors.foreground).ninjaRadius({radius:options.radius}).position({
    at:'left bottom',
    of:message,
    my:'left top'
  }).css({opacity:0.125});
  $(document).keyup(function(event){
    if (event.keyCode == 27) { // esc key
      $(message).ninjaMessageClose(timer);
      $(document).unbind('keyup');
    }
  });
  $(message).position({
    at:'top',
    collision:'fit none',
    of:window,
    my:'top'
  }).slideDown('slow');
};

$.fn.ninjaMessageClose = function(timer){
  return this.each(function(i, message){
    clearTimeout(timer);
    var options = $(message).data().options;
    $(message).slideUp('slow', function() {
      options.onClose.call();
      $(message).remove();
    });
  });
};
$.fn.ninjaNavigationCreate = function(customOptions) {
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    radius:$.ninjaRadius
  }, customOptions);
  return this.each(function(i, navigation){
    $(navigation).addClass('ninjaPlastic ninjaNavigation').css(options.colors.foreground).ninjaRadius({radius:options.radius});
  });
};
$.fn.ninjaPanelCreate = function(customOptions) {
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    icon:null,
    radius:$.ninjaRadius,
    title:null
  }, customOptions);
  return this.each(function(i, panel) {
    $(panel).addClass('ninjaPaper ninjaPanel').css(options.colors.background).ninjaRadius({radius:options.radius});
    if(options.icon || options.title){
      $(panel).prepend('<div class="ninjaPanelBar ninjaPlastic"/>');
      var bar = $('.ninjaPanelBar', panel).css(options.colors.foreground).ninjaRadius({corners:'top', radius:options.radius});
      if(options.title){
        $(bar).text(options.title);
      }
      if(options.icon){
        if(options.title){
          $(bar).prepend('&#160;');
        }
        $(bar).prepend('<span class="ninjaPanelIcon"/>');
        $('.ninjaPanelIcon', panel).ninjaIconCreate(options.icon).css({height:$(bar).height(), position:'relative', top:'-2px'});
      }
    }
  });
};
$.ninjaRadius = '0.5em';

$.fn.ninjaRadius = function(customOptions){
  var options = $.extend({
    corners:null,
    radius:$.ninjaRadius
  }, customOptions);
  var radii;
  if(options.corners == 'bottom'){
    radii = [0,0,options.radius,options.radius];
  }
  else if(options.corners == 'bottomLeft'){
    radii = [0,0,0,options.radius];
  }
  else if(options.corners == 'bottomRight'){
    radii = [0,0,options.radius,0];
  }
  else if(options.corners == 'left'){
    radii = [options.radius,0,0,options.radius];
  }
  else if(options.corners == 'right'){
    radii = [0,options.radius,options.radius,0];
  }
  else if(options.corners == 'top'){
    radii = [options.radius,options.radius,0,0];
  }
  else if(options.corners == 'topLeft'){
    radii = [options.radius,0,0,0];
  }
  else if(options.corners == 'topRight'){
    radii = [0,options.radius,0,0];
  }
  else{
    radii = [options.radius,options.radius,options.radius,options.radius];
  }
  return this.each(function(i, selector){
    if(document.body.style.borderRadius !== undefined){
      if(radii[0] == radii[1] && radii[0] == radii[2] && radii[0] == radii[3]){
        $(selector).css({
          'border-radius':radii[0]
        });
      }
      else{
        $(selector).css({
          'border-radius':radii[0] + ' ' + radii[1] + ' ' + radii[2] + ' ' + radii[3]
        });
      }
    }
    else if(document.body.style.WebkitBorderRadius !== undefined){
      $(selector).css({
        '-webkit-border-top-left-radius':radii[0],
        '-webkit-border-top-right-radius':radii[1],
        '-webkit-border-bottom-right-radius':radii[2],
        '-webkit-border-bottom-left-radius':radii[3]
      });
    }
    else if(document.body.style.MozBorderRadius !== undefined){
      $(selector).css({
        '-moz-border-radius-topleft':radii[0],
        '-moz-border-radius-topright':radii[1],
        '-moz-border-radius-bottomright':radii[2],
        '-moz-border-radius-bottomleft':radii[3]
      });
    }
    else if(document.body.style.KhtmlBorderRadius !== undefined){
      $(selector).css({
        '-khtml-border-top-left-radius':radii[0],
        '-khtml-border-top-right-radius':radii[1],
        '-khtml-border-bottom-right-radius':radii[2],
        '-khtml-border-bottom-left-radius':radii[3]
      });
    }
  });
};
$.fn.ninjaRatingCreate = function(customOptions) {
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    entity:'&#9733;',
    maximum:5,
    onChange:function(){},
    selectedGroup:0,
    selectedSingle:0
  }, customOptions);
  return this.each(function(i, rating){
    for(i=1; i <= options.maximum; i++){
      $(rating).append('<span class="ninjaRatingStar">' + options.entity + '</span>');
    }
    $(rating).addClass('ninjaRating').data({options:options}).ninjaRatingUpdate().mouseleave(function(){
      $(rating).ninjaRatingUpdate();
    });
    $('.ninjaRatingStar', rating).each(function(i, star){
      if(navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/)){
        $(star).css('font-size', '18px');
      }
      $(star).mouseenter(function(){
        $(rating).ninjaRatingUpdate({selectedSingle:i + 1});
      }).click(function(){
        $.extend($(rating).data().options, {selectedSingle:i + 1});
        $(rating).ninjaRatingUpdate();
        options.onChange.call({maximum:options.maximum, selected:options.selectedSingle});
      });
    });
  });
};

$.fn.ninjaRatingUpdate = function(customOptions) {
  return this.each(function(i, rating){
    var options = $.extend({}, $(rating).data().options, customOptions);
    $('.ninjaRatingStar', rating).each(function(i, star){
      if(options.selectedSingle > i){
        $(star).css({color:options.colors.rating.single});
      }
      else if(options.selectedGroup > i){
        $(star).css({color:options.colors.rating.group});
      }
      else{
        $(star).css({color:options.colors.rating.unselected});
      }
    });
  });
};
$.fn.ninjaSliderCreate = function(customOptions){
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    onStop:function(){},
    onUpdate:function(){},
    names:null,
    radius:$.ninjaRadius,
    selected:null,
    values:null,
    title:null,
    width:100
  }, customOptions);
  return this.each(function(i, slider){
    var id = $(slider).attr('id');
    if(options.title){
      $(slider).append('<div class="ninjaSliderTitle">' + options.title + '</div>');
    }
    $(slider).addClass('ninjaSlider').css(options.colors.background).ninjaRadius({radius:options.radius}).data({options:options});
    var selectedValue = options.selected || options.values[0];
    if(navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/)){
      $(slider).append('<select name="' + id + '"/>');
      var select = $('select', slider);
      $.each(options.values, function(i, value){
        $(select).append('<option value="' + value + '">' + (options.names[i] || value) + '</option>');
      });
      $(select).val(selectedValue).width(options.width + 'px').change(function(){
        var selected = $(':selected', select);
        options.onStop.call({selectedName:$(selected).text(), selectedValue:$(selected).attr('value')});
      });
    }
    else {
      var slots = options.values.length;
      var increment = Math.round(options.width / slots);
      var slot = $.inArray(selectedValue, options.values);
      var selectedName = options.names[slot] || selectedValue;
      $(slider).append('<input type="hidden"/><div class="ninjaSliderContainer"><div class="ninjaSliderTrack"><div class="ninjaSliderLevel"/></div><span class="ninjaPlastic ninjaEnabled ninjaSliderButton"/></div><div class="ninjaSliderText"/>');
      var button = $('.ninjaSliderButton', slider).css(options.colors.foreground).ninjaRadius({radius:'0.8em'});
      var buttonRadius = Math.round($(button).outerWidth() / 2);
      var trackWidth = increment * (slots - 1);
      var container = $('.ninjaSliderContainer', slider).width(trackWidth + (buttonRadius * 2) + 'px');
      var track = $('.ninjaSliderTrack', slider).width(trackWidth + 'px').position({
        at:'center center',
        collision:'none none',
        of:container,
        my:'center center'
      }).ninjaRadius({radius:'0.5em'}).css(options.colors.foreground);
      var text = $('.ninjaSliderText', slider).width(trackWidth + 'px').text(selectedName);
      var levelWidth = function(slot, increment){
        return slot * increment + 'px';
      };
      var level = $('.ninjaSliderLevel', track).ninjaRadius({radius:'0.35em'}).css(options.colors.foregroundSelected).width(levelWidth(slot, increment));
      var input = $('input', slider).attr('name', id);
      $(button).position({
        at:'left center',
        collision:'none none',
        of:container,
        offset:(slot * increment) + ' 0',
        my:'left center'
      }).draggable({
        addClasses:false,
        axis:'x',
        containment:container,
        drag:function() {
          slot = Math.round(($(button).position().left) / increment);
          selectedValue = options.values[slot];
          selectedName = options.names[slot] || selectedValue;
          $(level).width(levelWidth(slot, increment));
          $(text).text(selectedName);
        },
        distance:increment,
        grid:[increment, 0],
        scroll:false,
        stop:function() {
          $(input).val(selectedValue);
          options.onStop.call({selectedName:selectedName, selectedValue:selectedValue});
        }
      });
    }
  });
};

$.fn.ninjaSliderUpdate = function(customOptions){
  return this.each(function(i, slider){
    var options = $.extend($(slider).data().options, customOptions);
    var selectedValue = options.selected || options.values[0];
    var slots = options.values.length;
    var increment = Math.round(options.width / slots);
    var slot = $.inArray(selectedValue, options.values);
    var selectedName = options.names[slot] || selectedValue;
    options.onUpdate.call({selectedName:selectedName, selectedValue:selectedValue});
    if(navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/)){
      $('select', slider).val(selectedValue);
    }
    else {
      var container = $('.ninjaSliderContainer', slider);
      var button = $('.ninjaSliderButton', slider).position({
        at:'left center',
        collision:'none',
        of:container,
        offset:(slot * increment) + ' 0',
        my:'left'
      });
      $('.ninjaSliderLevel', slider).width(slot * increment + 'px');
      $('.ninjaSliderText', slider).text(selectedName);
    }
  });
};

$.fn.ninjaTabsCreate = function(customOptions){
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    id:null,
    onChange:function(){},
    radius:$.ninjaRadius,
    selected:this[0],
    side:null
  }, customOptions);
  var tabs = this.wrapAll('<span/>').parent().addClass('ninjaTabs').data({options:options});
  this.each(function(i, tab){
    $(tab).addClass('ninjaPlastic ninjaEnabled ninjaTab').click(function() {
      $(tabs).ninjaTabsToggle({init:false, selected:$(tab)});
    });
    if($(tab).attr('title')){
      $(tab).prepend('<span/>&#160;');
      $('span', tab).ninjaIconCreate($(tab).attr('title')).css({height:$(tab).height(), position:'relative', top:'-2px'});
    }
  });
  if(options.side == 'left'){
    $('.ninjaTab:first-child', tabs).ninjaRadius({corners:'left', radius:options.radius}).addClass('ninjaFirst');
  }
  else if(options.side == 'right'){
    $('.ninjaTab:last-child', tabs).ninjaRadius({corners:'right', radius:options.radius});
  }
  else{
    $('.ninjaTab:first-child', tabs).ninjaRadius({corners:'left', radius:options.radius}).addClass('ninjaFirst');
    $('.ninjaTab:last-child', tabs).ninjaRadius({corners:'right', radius:options.radius});
  }
  $('.ninjaTab:first-child', tabs).ninjaRadius({corners:'left', radius:options.radius}).addClass('ninjaFirst');
  $(tabs).ninjaTabsToggle();
  return this;
};

$.fn.ninjaTabsToggle = function(customOptions){
  return this.each(function(i, tabs){
    var options = $.extend($(tabs).data().options, customOptions);
    if(options.init === false){
      options.onChange.call($(options.selected));
    }
    options.onChange.call();
    $('.ninjaTab', tabs).each(function(i, tab){
      if($(options.selected).attr('id') == $(tab).attr('id')){
        $(tab).addClass('ninjaSelected').css(options.colors.foregroundSelected);
      }
      else{
        $(tab).removeClass('ninjaSelected').css(options.colors.foreground);
      }
      var icon = $('.ninjaIcon', tab);
      if($(tab).ninjaLightness() < 125){
        $(icon).addClass('ninjaIconWhite').removeClass('ninjaIconBlack');
      }
      else{
        $(icon).addClass('ninjaIconBlack').removeClass('ninjaIconWhite');
      }
    });
  });
};
$.ninjaWaitStart = function(customOptions){
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    id:null,
    onStop:function(){},
    radius:$.ninjaRadius,
    seconds:0,
    text:'Updating...'
  }, customOptions);
  $(document.body).append('<div class="ninjaWaitOverlay"/><div class="ninjaWaitFrame"/>');
  var overlay = $('.ninjaWaitOverlay').css({opacity:0});
  var frame = $('.ninjaWaitFrame').attr('id', options.id).css(options.colors.background).text(options.text).prepend('<span class="ninjaWaitIcon"/>&#160;').ninjaRadius({radius:options.radius}).append('<div class="ninjaWaitReflection"/>').data({options:options});
  $('.ninjaWaitReflection').css(options.colors.background).ninjaRadius({radius:options.radius}).position({
    at:'left bottom',
    of:frame,
    my:'left top'
  }).css({opacity:0.125});
  if($(frame).ninjaLightness() < 125){
    $(overlay).css({backgroundColor:'#fff'});
  }
  else{
    $(overlay).css({backgroundColor:'#000'});
  }
  var icon = $('.ninjaWaitIcon', frame);
  var offset;
  if($.browser.mozilla){
    offset = '0 ' + $(window).scrollTop();
  }
  else{
    offset = 0;
  }
  $(overlay).css({
    height:$(document.body).height(),
    width:$(window).width()
  }).animate({opacity:0.5}, function() {
    $(frame).position({
      at:'center',
      collision:'fit none',
      of:window,
      offset:offset,
      my:'center'
    }).fadeIn(function() {
      $(icon).ninjaIconAnimate({frames:12});
      if(options.seconds > 0) {
        var milliseconds = options.seconds * 1000;
        setTimeout(function() {
          $(frame).ninjaWaitStop();
        }, milliseconds);
      }
    });
  });
  return this;
};

$.fn.ninjaWaitStop = function(){
  return this.each(function(i, frame){
    var options = $(frame).data().options;
    var overlay = $(frame).prev('.ninjaWaitOverlay');
    $(frame).fadeOut(function() {
      $(overlay).fadeOut(function() {
        options.onStop.call();
        $(frame).remove();
        $(overlay).remove();
      });
    });
  });
};
$.ninjaWindowOpen = function(customOptions){
  var options = $.extend({
    colors:$.ninjaColorsGet(),
    icon:null,
    id:null,
    onClose:function(){},
    onOpen:function(){},
    radius:$.ninjaRadius,
    title:null,
    url:null,
    width:null
  }, customOptions);
  $(document.body).append('<div class="ninjaWindowOverlay"/><div class="ninjaWindowFrame"/>');
  var overlay = $('.ninjaWindowOverlay').css({opacity:0}).css(options.colors.background);
  var frame = $('.ninjaWindowFrame').attr('id', options.id).append('<div class="ninjaPlastic ninjaWindowHandle"/><div class="ninjaPaper ninjaWindowContent"/><div class="ninjaWindowReflection"/>').data({options:options});
  if(options.width){
    $(frame).css({minWidth:options.width});
  }
  var handle = $('.ninjaWindowHandle', frame).css(options.colors.foreground).ninjaRadius({corners:'top', radius:options.radius});
  if(options.title){
    $(handle).text(options.title);
  }
  if(options.icon){
    if(options.title){
      $(handle).prepend('&#160;');
    }
    $(handle).prepend('<span class="ninjaWindowIcon"/>');
    $('.ninjaWindowIcon', handle).ninjaIconCreate(options.icon).css({height:$(handle).height(), position:'relative', top:'-2px'});
  }
  $(handle).append('<span class="ninjaWindowClose"/>');
  $('.ninjaWindowClose', handle).ninjaButtonCreate({icon:'remove', onSelect:function(){
    $(frame).ninjaWindowClose();
  }}).ninjaRadius({corners:'topRight', radius:options.radius});
  var content = $('.ninjaWindowContent', frame).css(options.colors.background).ninjaRadius({corners:'bottom', radius:options.radius});
  if($(content).ninjaLightness() < 125){
    $(overlay).css({backgroundColor:'#fff'});
  }
  else{
    $(overlay).css({backgroundColor:'#000'});
  }
  $(document).keyup(function(event){
    if (event.keyCode == 27) { // esc key
      $(frame).ninjaWindowClose();
      $(document).unbind('keyup');
    }
  });
  $(frame).click(function(event){
    event.stopPropagation();
  }).draggable({
    containment:'document',
    cursor:'pointer',
    handle:$(handle)
  });
  $(content).load(options.url, function() {
    $(overlay).css({
      height:$(document).height(),
      width:$(window).width()
    }).animate({opacity:0.5}, function(){
      var frameWidth = $(frame).width();
      $(handle).innerWidth(frameWidth);
      $(content).innerWidth(frameWidth);
      var offset;
      if($.browser.mozilla){
        offset = $(window).scrollTop() + 20;
      }
      else{
        offset = 20;
      }
      $(frame).position({
        at:'center top',
        collision:'fit none',
        of:window,
        offset:'0 ' + offset,
        my:'center top'
      }).fadeIn(function(){
        options.onOpen.call(content);
      });
    });
    $('.ninjaWindowReflection').css(options.colors.background).ninjaRadius({radius:options.radius}).position({
      at:'left bottom',
      of:frame,
      my:'left top'
    }).css({opacity:0.125});
  });
  return frame;
};

$.fn.ninjaWindowClose = function(){
  return this.each(function(i, frame){
    var options = $(frame).data().options;
    var overlay = $(frame).prev('.ninjaWindowOverlay');
    $(frame).fadeOut(function() {
      $(overlay).fadeOut(function() {
        options.onClose.call();
        $(frame).remove();
        $(overlay).remove();
      });
    });
  });
};

$.fn.ninjaWindowRetitle = function(customOptions){
  return this.each(function(i, frame){
    var options = $.extend($(frame).data().options, {onRetitle:function(){}}, customOptions);
    $('.ninjaWindowHandle', frame).text(options.title);
    $('.ninjaWindowIcon', frame).attr({'class':''}).ninjaIconCreate(options.icon);
    options.onRetitle.call();
  });
};
})(jQuery);
