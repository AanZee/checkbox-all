/**
 * jquery.filter-list.js
 * ------------------------------------------------------
 * Author: Jeroen Ransijn
 * Company: Aan Zee
 * Version: 0.1.0
 * Usage: $('.checkbox-all').checkboxAll();
 */
;(function (root, $, undefined) {
	"use strict";

	var pluginName = "checkboxAll";
	var defaults = {};

	// The actual plugin constructor
	function Plugin( element, options ) {
		this.element = element;
		this.$element = $(this.element);

		// No options yet
		this.options = $.extend( {}, defaults, options);

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