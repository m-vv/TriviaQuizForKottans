/**
 * Created by pramvvlocal on 19.01.2017.
 */

function newQuestion() {
    $.getJSON('http://jservice.io/api/random', function(data) {
        $("#questionID").html(data[0].id);
        $("#totalQuestions").html( Number($("#totalQuestions").text())+1);
        $("#category").html(data[0].category.title);
        $("#question").html(data[0].question);
        var answerText = data[0].answer;
        var answerArr = answerText.split('').sort(compareRandom);
        $("#hiddenAnswer").html(answerText);
        for (var i = 0; i<answerArr.length; i++) {
            $("#letters").append("<button type='button' class='btn btn-warning'>"+answerArr[i]+"</button>");
        }
    });
}

$(document).ready(function() {
      newQuestion();
    $("#buttonSkip").click( function(){
        newQuestion();
        $("#tryAns").html('');
        $("#letters").html('');
    });
    /*http://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements
     Event handlers are bound only to the currently selected elements; they must exist on the page at the time your code makes the call to .on().
     f new HTML is being injected into the page, it is preferable to use delegated events to attach an event handler, as described next.
     Delegated events have the advantage that they can process events from descendant elements that are added to the document at a later time. For example, if the table exists, but the rows are added dynamically using code, the following will handle it
    * */
    $("#letters").on('click','button',function() {
        $("#tryAns").append("<button type='button' class='btn btn-info'>"+$(this).text()+"</button>");
        $(this).remove();
    });

    $("#tryAns").on('click','button',function() {
        $("#letters").append("<button type='button' class='btn btn-danger'>"+$(this).text()+"</button>");
        $(this).remove();
    });
});
//for random shifting of a array
function compareRandom(a, b) {
    'use strict';
    return Math.random() - 0.5;
}

