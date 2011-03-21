// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function(){
	$(function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 0,
			max: 2000000,
			values: [ 350000, 1500000 ],
			step:125000,
			slide: function( event, ui ) {
				$( "#amount" ).html( "€" + ui.values[ 0 ] + " - €" + ui.values[ 1 ] );
			}
		});
		$( "#amount" ).html( "$" + $( "#slider-range" ).slider( "values", 0 ) +
			" - $" + $( "#slider-range" ).slider( "values", 1 ) );
	});
		$("form button, a.search").button({
		            icons: {
		               primary: "ui-icon-search"
		            }
		});
		$("a.contact").button({
		            icons: {
		                primary: "ui-icon-mail-closed"
		            }
		});
		$("a.plus").button({
			icons:{
				primary:"ui-icon-plus"
			}
		});
		$("a.calculator").button({
			icons:{
				primary:"ui-icon-calculator"
			}
		});
		
	
});