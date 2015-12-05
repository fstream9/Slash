function isValidColour(myColour)
{
    var valid = $('#test').css('color');
    
    $('#test').css('color', myColour);
    
    if( valid== $('#test').css('color'))
    {
    	return true;
    }
    else
    {
    	return false;
    }
}