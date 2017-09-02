
var name = document.getElementById('name');
var email = document.getElementById('email');
var message = document.getElementById('message');

$("#sendAJAX").click(function(){
    $.post("/test",
    {
        name: "Donald Duck",
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        console.log('post AJAX: ' + data);
    });
});