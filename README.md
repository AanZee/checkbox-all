# jquery.input-stepper.js
> Create a checkbox to toggle a whole group withe ase [Check it out on JSFiddle](http://jsfiddle.net/jeroen_ransijn/px38g556/)

## Features
- Check "off" the All checkbox and all other are checked "on"
- Check "on" the All checkbox while other checkboxes are on and they will check "off"
- Check all A,B,C "off" while All is "off" too and All will check "on"
- A change event is always triggered for plugin who depend on this

## Install
Download and include the javascript file.
```html
<script src="jquery.checkbox-all.js"></script>
```

## Basic usage
Check out `index.html` for all examples.

```html
<label><input type="checkbox" name="group-1" class="checkbox-all" checked> All</label>
<label><input type="checkbox" name="group-1"> Checkbox A</label>
<label><input type="checkbox" name="group-1"> Checkbox B</label>
<label><input type="checkbox" name="group-1"> Checkbox C</label>
```

Will look similar to this:
- [x] All
- [ ] Checkbox A
- [ ] Checkbox B
- [ ] Checkbox C

Call the plugin on the desired selector

```javascript
$(function () {
	// Document ready
	$('.checkbox-all').checkboxAll();
});
```

## Advanced
When the all checkbox is checked, an extra event on this checkbox is triggered "checkall", with the checkbox `{jqElement}` as second argument and the plugin `{object}` as third argument.

```javascript
$(function () {
	// Document ready
	$('.checkbox-all').checkboxAll()
		.on('checkall', function (e, $checkbox, plugin) {
			console.log('checkall is called, value is: ', $checkbox.prop('checked'));
		});
});
```

## Authors
This plugin is released by Aan Zee and is mainly developed by [Jeroen Ransijn](https://github.com/jeroenransijn)
