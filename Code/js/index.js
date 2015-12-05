$( document ).ready( function( )
{
	var transforms = ["colour", "position"];

	var transformMethods = [];
	transformMethods[0] = function( )
	{
		//return 
	};






	var objectTypes = ["square", "circle", "triangle", "pentagon" ];

	var objectMethods = [];
	objectMethods[0] = function( )
	{
		$( "canvas" ).drawRect(
		{
			fillStyle: 'red',
		  	x: 100, y: 100,
		  	width: 200,
		  	height: 200,
		  	fromCenter: false
		} );
	};

	objectMethods[1] = function( )
	{
		// Draw a circle
		$( "canvas" ).drawArc(
		{
		  	draggable: true,
		  	fillStyle: "green",
		  	x: 100, y: 100,
		  	radius: 50,
		  	fromCenter: false
		});
	};

	objectMethods[3] = function( )
	{
		// Draw a polygon
		$( "canvas" ).drawPolygon(
		{
		  fillStyle: '#589',
		  strokeStyle: '#000',
		  x: 100, y: 100,
		  radius: 50,
		  sides: 5
		} );
	};






	var methods = ["create", "move"];
	var methodFunctions = [];
	methodFunctions[0] = function( objectIndex )
	{
		objectMethods[objectIndex]( );
		//console.log( "Create: " + objectTypes[objectIndex] );
	};








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