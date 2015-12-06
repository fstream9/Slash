function isValidColour(myColour)
{
    var valid = $( '#TestColour' ).css( 'color' );
    
    $( '#TestColour' ).css( 'color', myColour );
    
    if ( valid == $( '#TestColour').css( 'color' ) )
    {
    	return false;
    }
    else
    {
    	return true;
    }
}