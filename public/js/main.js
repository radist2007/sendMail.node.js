function send() {

    document.getElementById('sendBtn').style.display = "none";

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    alert(name + " " + email + " " + message);

    $.post("/sendMail",
    {
        name: name,
        email: email,
        message: message
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        console.log('post AJAX: ' + data);
        var parse = JSON.parse(data);
        document.getElementById('wrap').innerHTML = parse.errMess;
        // document.getElementById('wrap').innerHTML = data;
    });
}
