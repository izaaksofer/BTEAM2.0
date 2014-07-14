    $.ajax({
        url: "http://obscure-ridge-8042.herokuapp.com/",
        dataType: "json",

        success: function(data) {
          $.each(data.statuses, function () {
            $( "#tweets" ).append('<div style="float:left">' 
                                  + '<img src="' + this['img'] + '" style="max-height:200px;padding:10px">' 
                                  + '</div>');
          });
       }});