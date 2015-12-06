

$( document ).ready( function( )
{
	var transforms = ["colour", "position"];

	var transformMethods = [];
	transformMethods[0] = function( )
	{
		//return 
	};


	console.log( isValidColour( "black" ) );

	function parseTransformations( transformTypeArr, transformDataArr )
	{
		console.log( transformTypeArr + " :::::: " + transformDataArr );
	}


	var objectTypes = ["square", "circle", "pentagon" ];

	var objectMethods = [];
	objectMethods[0] = function( transformTypeArr, transformDataArr )
	{
		parseTransformations( transformTypeArr, transformDataArr )

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

	objectMethods[2] = function( )
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
	methodFunctions[0] = function( objectIndex, transformType, transformData )
	{
		transformType = transformType || -1;
		transformData = transformData || -1;

		if ( -1 !== transformType && -1 !== transformData )
		{
			objectMethods[objectIndex]( transformType, transformData );
		}
		else
		{
			objectMethods[objectIndex]( );
		}
		//console.log( "Create: " + objectTypes[objectIndex] );
	};

	var watsonFunctions = [];
	watsonFunctions[0] = function( object, transformType, transformData )
	{
		$.ajax({
			url: 'http://api.bing.net/json.aspx?',
			dataType: "jsonp",
			data: {
				rsz: 1,
				start: 0,
				q: object,
				key: "AIzaSyB_CfhJxVaFQfx-dcoOl8T162B5MG2F-po"
			},
			success: function(response) {
				console.log(response);
				if (response.responseData === null) {
					console.log("No pictures found!");
				} else {
						/****create image object here****/
						$('canvas').drawImage({
						  source: response.responseData.results[0].unescapedUrl,
						  x: 150, y: 150
						});
				}
			}
		});
		//console.log( "Create: " + objectTypes[objectIndex] );
	};

	





	$( "#RunCode" ).click( function( )
	{
		var code = $( "#CodeTextArea" ).val( ).trim( ).toLowerCase( );

		// code split by spaces
		var codeArray = code.split( " " );

		var methodIndex = -1;
		var objectIndex = -1;

		var transformationsIndexArr = [];
		var transformationsPropertiesArr = [];

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

			$.each( transforms, function( tIndex, tVal )
			{
				if ( cVal === tVal )
				{
					transformationsIndexArr.push( tIndex );


				}
				else if ( isValidColour( cVal ) == true )
				{
					transformationsIndexArr.push( 0 );
					transformationsPropertiesArr.push( cVal );
					transformationsIndexArr.push( 0 );
					transformationsPropertiesArr.push( cVal );
				}
			} );

			

			//console.log( transformationsIndexArr );
		} );

		if ( -1 !== methodIndex && -1 !== objectIndex )
		{
			methodFunctions[methodIndex]( objectIndex, transformationsIndexArr, transformationsPropertiesArr );
		} else if (-1 !== methodIndex && -1 == objectIndex){
			$.ajax({
			      url: 'Watson/example.php',
			      type: 'post',
			      data: {code: code},
			      dataType: "text",
			      success: function(data) {
			  
			        watsonFunctions[methodIndex]( data, transformationsIndexArr, transformationsPropertiesArr );
			        
			      },
			      error: function(xhr, desc, err) {
			        console.log(xhr);
			        console.log("Details: " + desc + "\nError:" + err);
			      }
			    });

			}
		
	} );


} );