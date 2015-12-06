

$( document ).ready( function( )
{
	var transforms = ["colour", "position", "size", "draggable"];

	var transformMethods = [];
	transformMethods[0] = function( )
	{
		//return 
	};



	function parseTransformations( transformTypeArr, transformDataArr )
	{
		var parsedTransforms = [];

		parsedTransforms.colour = "white";
		parsedTransforms.positionX = 0;
		parsedTransforms.positionY = 0;
		parsedTransforms.sizeX = 50;
		parsedTransforms.sizeY = 50;
		parsedTransforms.draggable = false;

		for ( i = 0; i < transformTypeArr.length; i++ )
		{ 
		    console.log( transformTypeArr[i] + " :'' " + transformDataArr[i] );

		   	if ( transformTypeArr[i] == 0 )
		   	{
		   		parsedTransforms.colour = transformDataArr[i];
		   	}
		   	else if ( transformTypeArr[i] == 1 )
		   	{
		   		// code split by spaces
		   		if ( transformDataArr[i].charAt( 0 ) == '(' )
		   		{
		   			transformDataArr[i] = transformDataArr[i].substr(1);
		   		}

		   		if ( transformDataArr[i].charAt( transformDataArr[i].length - 1 ) == ')' )
		   		{
		   			transformDataArr[i] = transformDataArr[i].substr(0, transformDataArr[i].length - 1); 
		   		}

				var positionArray = transformDataArr[i].split( "," );
		   		parsedTransforms.positionX = positionArray[0];
				parsedTransforms.positionY = positionArray[1];
		   	}
		   	else if ( transformTypeArr[i] == 2 )
		   	{
		   		// code split by spaces
		   		if ( transformDataArr[i].charAt( 0 ) == '(' )
		   		{
		   			transformDataArr[i] = transformDataArr[i].substr(1);
		   		}

		   		if ( transformDataArr[i].charAt( transformDataArr[i].length - 1 ) == ')' )
		   		{
		   			transformDataArr[i] = transformDataArr[i].substr(0, transformDataArr[i].length - 1); 
		   		}

				var sizeArray = transformDataArr[i].split( "," );
		   		parsedTransforms.sizeX = sizeArray[0];
				parsedTransforms.sizeY = sizeArray[1];
		   	}
		   	else if ( transformTypeArr[i] == 3 )
		   	{
		   		parsedTransforms.draggable = true;
		   	}
		}

		return parsedTransforms;
	}


	var objectTypes = ["rectangle", "circle", "pentagon" ];

	var objectMethods = [];
	objectMethods[0] = function( transformTypeArr, transformDataArr )
	{
		var transforms = parseTransformations( transformTypeArr, transformDataArr );

		$( "canvas" ).drawRect(
		{
			fillStyle: transforms.colour,
		  	x: parseInt( transforms.positionX ), y: parseInt( transforms.positionY ),
		  	width: transforms.sizeX,
		  	height: transforms.sizeY,
		  	draggable: transforms.draggable,
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
	watsonFunctions[0] = function( object, transformTypeArr, transformDataArr )
	{
		var transforms = parseTransformations( transformTypeArr, transformDataArr );
		/****create image object here****/
		$('canvas').drawImage({
		  source: object,
		  x: transforms.positionX, y: transforms.positionY,
		  		  	draggable: transforms.draggable
		});
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
					transformationsPropertiesArr.push( codeArray[cIndex + 1] );
				}
				else if ( isValidColour( cVal ) == true )
				{
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
			  		console.log(data);
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