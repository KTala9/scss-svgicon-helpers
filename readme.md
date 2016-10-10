# SCSS Svgicon Helpers

A set of SCSS mixins to help with easy use of svg background images as icons in stylesheets. Requires the postcss-svgicon plugin.

## Getting Started
Just import the `icon-helpers.scss` file into your project.

## Documentation

The icon mixins allow for simple and readable addition of icons via scss code.

Icons can be referred to by name, and are automatically injected into the stylesheet in an optimally efficient matter, using the Svgicon Postcss task.

### Dependencies

* The [postcss-svgicon](https://www.npmjs.com/package/postcss-svgicon) plugin

## Mixins

### `icon(options_with_defaults)`

* Adds an icon in a before psuedo element, as minified svg code in a data uri.
* Sets sensible defaults for size, position, base color, etc.
* Extends a core set of styles which all these icons require.

### `icon-state(options)`

* Same as `icon`, but sets no defaults, and only results in css related to the specified options.
* Use this to add states to an icon already defined with `icon`.

### `icon-hide`

* Hides an icon


## Options

The mixins `icon` and `icon-state` take the following parameters:

* `$icon`: The name of the icon, as provided by the postcss-svgicon plugin
* `$size`: The x y size
  - e.g. 20px
  - or 5em 2em
* `$color`: A space-separated list of colors: base, hover/focus, and active.
* `$position`: The x y position
  - e.g. center center
  - or 0 100%
* `$selector`: Use this for simpler syntax when the icon is nested deep within the hover parent. See above examples.


## Examples

### A simple static icon

If you just need a simple icon without hover states:

```scss
.parent {
	@include icon(
		$icon: tick,
		$color: black
	);
}
```

### An icon with simple interaction states

If you need hover states, and `.parent` is the hover target:

```scss
.parent {
	@include icon(
		$icon: tick,
		$color: black green purple
	);
}
```

### An icon with complex interaction states

If you need hover states, but `.parent` is within the hover target:

```scss
.a {
	@include icon(
		$icon: plus,
        $color: black orange,
        $selector: '.parent'
	);
	
	.parent {
		// Other styles
	}
}

```

This could also be achieved like so, but the above allows for brevity and legibility.

```scss
.a {
	.parant {
		// NOTE: 'icon' adds boilerplate needed by a new icon.
		@include icon(
			$icon: plus,
			$color: black
		);
	}
	
	&:hover,
	&:focus {
		.parent {
			// NOTE: 'icon-state' adds just the required styles with no boilerplate
			@include icon-state(
				$icon: minus,
				$color: black
			);
		}
	}
}
```

### Customization

Further any custom properties for the before element can be passed in a block after the mixin.

```scss
.parant {
	@include icon(
		$icon: cross,
		$color: tomato,
		$position: 5px 11px
	) {
		transform: scale(0.5);
		transform-origin: 5px 11px;
	};

	&:hover,
	&:focus {
		@include icon-state(
			$icon: tick,
			$color: skyblue
		) {
			transform: scale(1);
		}
	}
}
```
