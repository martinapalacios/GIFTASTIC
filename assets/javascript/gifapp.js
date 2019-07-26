//Javascript for GifTastic//

$(document).ready(function(){
    var topics = ['nasa', 'astros', 'bun-b', 'travis scott'];

    function buttonExpress(){
        $('#buttonsView').empty();
        //create buttons
        for ( var i=0; i < topics.length; i++) {
            var city = $('<button>');
            city.addClass('expression');
            city.attr('data-name', topics[i]);
            city.text(topics[i]);
            $('#buttonsView').append(city);
        }
    }    
    buttonExpress();
   
    //on button click
    $(document).on('click', '.expression', function() {
    var knowledge = $(this).html(); 
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + knowledge + "&api_key=zFNg2Ag4OwvtOKIuK8OTzclS5fsaGlkc&limit=20";
        
    $.ajax({
        url: queryURL, 
        method: 'GET'
    })
    .then(function(response) {
        var results = response.data;
        //empties the div before adding more gifs
        $('#gifView').empty();
        for ( var j=0; j < results.length; j++) {
            var imageDiv = $('<div>');
            var imageView = results[j].images.fixed_height.url;
            var still = results[j].images.fixed_height_still.url;
            var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
            expressImage.attr('data-state', 'still');
            $('#gifView').prepend(expressImage);
            expressImage.on('click', playGif);
        }
    });

    function playGif() { 
        var state = $(this).attr('data-state');
        if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
        }
        else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
        }
    }
    })
    
//add new button
$(document).on('click', '#addNewGif', function(){
    if ($('#search-Input').val().trim() == ''){
   }
   else {
    var knowledge = $('#search-Input').val().trim();
    topics.push(knowledge);
    $('#search-Input').val('');
    buttonExpress();
    return false;
    }
});
});