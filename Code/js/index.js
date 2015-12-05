$( document ).ready( function( )
{
	var objectTypes = ["square", "rectangle", "circle"];

	function create( objectIndex )
	{
		console.log( "Create: " + objectTypes[objectIndex] );
	}

	function move()
	{
		console.log( "Move method called, duff man" );
	}

	var methods = ["create", "move"];
	var methodFunctions = [];
	methodFunctions[0] = function( objectIndex ) { create( objectIndex ); };
	methodFunctions[1] = function() { move( ); };

	$( "#RunCode" ).click( function( )
	{
		var code = $( "#CodeTextArea" ).val( ).trim( ).toLowerCase( );

		// code split by spaces
		var codeArray = code.split( " " );

		var methodIndex = -1;
		var objectIndex = -1;

		$.each( codeArray, function( cIndex, cVal )
		{
		  	$.each( methods, function( mIndex, mVal )
			{
				if ( cVal === mVal )
				{
					//console.log( "Valid method found" );
					//methodFunctions[methodIndex]( );
					methodIndex = mIndex;
				}
			} );

			$.each( objectTypes, function( oIndex, oVal )
			{
				if ( cVal === oVal )
				{
					objectIndex = oIndex;
				}
			} );
		} );

		if ( -1 !== methodIndex && -1 !== objectIndex )
		{
			methodFunctions[methodIndex]( objectIndex );
		}
	} );


} );