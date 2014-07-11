
//IZAAKS'S BASTARDISATION
 $(document).ready(function() {
    var list={"1":"uk-news","2":"football","3":"travel"};
    $.each(list, function(key, value) {
      $.ajax({
        url: "http://content.guardianapis.com/search?section=" + value + "&show-fields=trailText",
        dataType: "jsonp",

        success: function(data) {
          $.each(data.response.results, function (i) {
            $( "#" + value ).append('<li><a href="' + this['webUrl'] + '">' + this['webTitle'] + '</a></li>');
            $( "#" + value ).append("<p>" + this['fields'].trailText + "</p>");
            if ( i === 4 ) {
            return false;}
          });
        }});
    });
    
    $.ajax({
        url: "http://obscure-ridge-8042.herokuapp.com/",
        dataType: "json",

        success: function(data) {
          $.each(data.stuff, function () {
            $( "#tweets" ).append('<div class="stuff1"><a target="_blank" href="klematis_big.htm"><img src="' + this['img'] + '" alt="Klematis" width="300" height="250"></a><div class="desc">' + this['name'] +  '</div></div>');
          });
       }});
    
  });


  $("#no-java").hide();