$("#roomName").focus();
$("form").submit(false);

function goToRoom(){
  console.log("goToRoom");  
  var roomName = $.trim($("#roomName").val());
  console.log(roomName);  
  if(roomName.length <= 0 ) return;
  $("#roomContainer").fadeOut('slow');
  window.location =  "/" + roomName;
}

$('#submitButton').click( goToRoom );

$('#roomName').keypress(function(e){
  if (e.keyCode === 13) goToRoom();
});

verticalCenter = function() {
    var mtop = (window.innerHeight - $("#insideContainer").outerHeight()) / 2;
    $("#insideContainer").css({ "margin-top": mtop + "px" });
};

window.onresize = verticalCenter;

// start execution
verticalCenter();
$.smartbanner(); // don't know why, cannot put this in documentready
$(function () {
   
    if (document.location.search) {
        var queries = {};
        $.each(document.location.search.substr(1).split('&'), function(c, q) {
            var i = q.split('=');
            queries[i[0].toString()] = i[1].toString();
        });

        console.log(queries);
        if (queries.contactId) {
            $("#contactid").val(queries.contactId);
            localStorage.setItem('contactid', queries.contactId);
        }
    }
});


