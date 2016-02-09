$(document).ready(function() {
    crossdataIndex = 0;
    $('#crossForm')
        
        // Add button click handler
        .on('click', '.addButton', function() {
            crossdataIndex++;
            var $template = $('#crossdataTemplate'),
                $clone    = $template
                                .clone()
                                .removeClass('hide')
                                .removeAttr('id')
                                .attr('data-crossdata-index', crossdataIndex)
                                .insertBefore($template);

            // Update the name attributes
            $clone
                .find('[name="key"]').attr('name', 'key[' + crossdataIndex + ']').end()
                .find('[name="value"]').attr('name', 'value[' + crossdataIndex + ']').end()

        })

        // Remove button click handler
        .on('click', '.removeButton', function() {
            var $row  = $(this).parents('.form-group'),
                index = $row.attr('data-crossdata-index');

            $row.remove();
        });
});
    
function postUrl(){
	var urlMethod =  $( "#urlMethod option:selected" ).text();
	var url = urlMethod+'://'+$('#crossForm input[name="url"]').val();
	var submitMethhod = $( "#submitMethod option:selected" ).text();
	
	console.log(submitMethhod);
	var postData = "";
		var length = $('#crossForm input[name^="key"]').length
    	$('#crossForm input[name^="key"]').each(function(index) {
    		formVal = $('#crossForm input[name="value['+index+']"').val();
    		if(typeof formVal !== 'undefined'){
	    		postData += $(this).val()+'='+formVal;
	    		if (index !== length - 2) {
			        postData +="&";
			    } 
    		}
		});
    	console.log(postData);
        $.ajax({
    		method: submitMethhod,
            url: url,
            data:postData ,
            xhrFields: {
            withCredentials: true
            },
            crossDomain: true
           }).done(function(data) {
           		$('#output.hidden').css('visibility','visible').hide().fadeIn().removeClass('hidden');
                    $('#json').JSONView(data);
      	})
      	.fail(function() {
      		alert( "error" );
      	});
}
