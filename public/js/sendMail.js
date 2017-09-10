function send() {

    document.getElementById('sendBtn').style.display = "none";

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    $.post("/sendMail",
    {
        name: name,
        email: email,
        message: message
    },
    function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        console.log('post AJAX res: ' + data);
        document.getElementById('wrap').innerHTML = data.mess;
    });
}
