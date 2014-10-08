// jquery.checkbox-all.js
// ------------------------------------------------------
// Author: Jeroen Ransijn
// Company: Aan Zee
// Usage:
// $('.checkbox-all').checkboxAll();
// Description:
// - [x] All
// - [ ] Checkbox A
// - [ ] Checkbox B
// - [ ] Checkbox C
// Within a group of checkboxes where one is "All"
// - Check "off" the All checkbox and all other are checked "on"
// - Check "on" the All checkbox while other checkboxes are on and they will check "off"
// - Check all A,B,C "off" while All is "off" too and All will check "on"
;(function (root, $, undefined) {
	"use strict";

	var pluginName = "checkboxAll";
	var defaults = {};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.$element = $(this.element);

		this.options = $.extend( {}, defaults, options) ;

		this._defaults = defaults;
		this._name = pluginName;

		return this.init();
	}

	Plugin.prototype = {

		init: function () {
			this.attrName = this.$element.attr('name');

			this.$group = $('[name="' + this.attrName + '"]')
				.on('change', this._onChange.bind(this) )
				.not( this.$element );

			return this;
		},

		_onChange: function (e, isSilent) {
			var $currentTarget = $(e.currentTarget);
			var isACheckboxChecked;

			if ( ( ! isSilent) && e.currentTarget == this.element) {

				this.$group
					.prop('checked', ! $currentTarget.prop('checked'))
					.trigger('change', [true])
					.trigger('checkall', [this.$element, this]);

			} else if ( ! isSilent) {

				isACheckboxChecked = this.$group.filter(function (){
					return $(this).prop('checked');
				}).get().length > 0;

				this.$element.prop('checked', ! isACheckboxChecked).trigger('change', [true]);

			}

			return this;
		}
	};
	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if ( ! $.data(this, "plugin-" + pluginName)) {
				$.data(this, "plugin-" + pluginName,
					new Plugin( this, options ));
				}
		});
	};

})(window, jQuery);