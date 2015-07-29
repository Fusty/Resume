//Author:  Alex Sterling
//2015-07-28
//Recursive JSON based resume builder
//Inspired by jsonresume.org but I never checked their source, checking their source as of 2015/07/28 22:25:00
var fustyResume = {};
fustyResume.currentTemplate = "default";
fustyResume.fromFile = true;

$(document).ready(function(){
  loadTemplate(fustyResume.currentTemplate);
});

function loadTemplate(template){
  fustyResume.currentTemplate = template;
  //Load up template
  $.get('template-'+template, function(data){
    var jsonField = $('#json-field').val();
    $('body').html(data);

    //Draw the template selection (not entire template, that happened already!)
    drawTemplateSelection();
    $('#json-field').val(jsonField);

    //Load up JSON
    if(fustyResume.fromFile){
      getResumeJSON();
    }else{
      getResumeField();
    }
  });
}

function getResumeJSON(){
	$.getJSON("resume.json", function(data){
    //Fill the JSON field with this
    $('#json-field').val(JSON.stringify(data, null, 4));
		//Go populate page
		fillResume("", data);	
  });
}

function getResumeField(){
  if(typeof $('#json-field').val() == 'undefined'){
    loadTemplate(fustyResume.currentTemplate);
  }else{
    data = JSON.parse($('#json-field').val());
    fillResume("", data);
  }
}

function makeFromField(){
  fromFile = false;
}

function drawTemplateSelection(){
  //Array of available templates
  //TODO: Get this from a json file/object instead
  var templates = {
    "default" : "Default",
    "dark" : "Darkened"
  }
  var content = '<h4>Select a Template (I didn\'t build this just for one look!)</h4>';

  //Build the content
  $.each(templates, function(shortName, name){
    content += '<span class="label label-success label-resume" onclick="loadTemplate(\''+shortName+'.html\', true)">'+name+'</span>';
  });

  content += "<br/><br/><h4>Oh, and feel free to modify the underlying data too!  (Reverts on page reload or reset)</h4>"+
    "&nbsp;<a class=\"btn btn-success\" onclick=\"clickFromField();\">Load JSON from textarea</a>&nbsp;<a class=\"btn btn-danger bottom-margin\" onclick=\"clickResetFromField();\">Reset</a>"+
    "<br/><br/><textarea id=\"json-field\" class=\"form-control \" rows=\"100\"></textarea>"+
    "<br/>&nbsp;<a class=\"btn btn-success\" onclick=\"clickFromField();\">Load JSON from textarea</a>&nbsp;<a class=\"btn btn-danger\" onclick=\"clickResetFromField();\">Reset</a>"+
    "<br/>";

  //Place content on page
  $('.template-selection').html(content);
}

//Recursive resume filling!
function fillResume(index, data){
  //If it's an object dive in, if not try and .text() it's value into it's index-id pair
	if(typeof data == 'object'){
		//If it's an array we'll see if we need to iterate it's container
		if(data instanceof Array){
			$.each(data, function(i,v){
				//If the template exists, fill it!
				if($('#'+index.substring(1)+"-template")[0]){
					//Clear .holding-ground
					$('.holding-ground').html('');

					//Find template, clone it into .holding-ground
					$('#'+index.substring(1)+"-template").clone().appendTo($('.holding-ground'));

					//Hide the template now that we're populating it
					$('#'+index.substring(1)+"-template").hide();

					//Stringify the contents
					var html = $('.holding-ground').html();

					//Do replaces on what needs replaced
					//Change index.substring(1)-template to index.substring(1)-i-container
					var find = new RegExp(index.substring(1)+'-template', 'g');
					html = html.replace(find, index.substring(1)+'-'+i+'-container');

					//Change index.substring(1)-n-subindex.substring(1) to index.substring(1)-i-subindex.substring(1)
					var find = new RegExp(index.substring(1)+'-n', 'g');
					html = html.replace(find, index.substring(1)+'-'+i);

					//Stick the html back in after the template
					$('#'+index.substring(1)+"-template").parent().append(html);
					$('#'+index.substring(1)+'-'+i+'-container').show();
				}
			});
		}
		$.each(data, function(i, v){
			fillResume(index+"-"+i,v);
		});
	}else{
		fillSingleField(index, data);
	}
}

function fillSingleField(index, value){
	//Handle images, hrefs etc.
  //TODO perhaps turn this into an object (unless we've hit abstraction stagnation)
	if(index == 'basics-picture'){
		$('#'+index.substring(1)).attr('src',value);
	}else if(index.match(/-work-[0-9]*-website/)){
		$('#'+index.substring(1).replace('website', 'company')).attr('href', value);
	}else if(index.match(/-publications-[0-9]*-website/)){
		$('#'+index.substring(1).replace('website', 'name')).attr('href', value);
	}else if(index.match(/-basics-profiles-[0-9]*-url/)){
    $('#'+index.substring(1).replace('url', 'network')).attr('href', value);
  }else if(index.match(/-basics-profiles-[0-9]*-network/)){ 
    $('#'+index.substring(1)).addClass('fa-'+value).addClass('link-'+value);
  }else if(index.match(/-basics-picture/)){
    $('#'+index.substring(1)).attr('src', value).text('');
  }else if(index.match(/-basics-email/)){
    $('#'+index.substring(1)).attr('href', 'mailto:'+value).text(value);
  }else{
		$('#'+index.substring(1)).text(value);
	}
}

function clickFromField(){
  window.scrollTo(0,0);
  getResumeField();
  fustyResume.fromFile = false;
}

function clickResetFromField(){
  window.scrollTo(0,0);
  getResumeJSON();
  fustyResume.fromFile = true;
}

