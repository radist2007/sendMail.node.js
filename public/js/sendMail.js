function send() {

    // document.getElementById('sendBtn').style.display = "none";
    var fadeBtn = document.getElementById('sendBtn');
        fade(fadeBtn);

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
        alert("Data: " + data + "\nStatus: " + status);
        console.log('post AJAX res: ' + data);
        document.getElementById('wrap').innerHTML = data.mess;
    });
}

function fade(elem, t) {
    var fps = 50;
    var time = t || 500;
    var steps = time / fps;
    var op = 1;
    var dO = op / steps;

    var timer = setInterval(function(){
        op -= dO;
        elem.style.opacity = op;
        steps--;

        if(steps === 0) {
            clearInterval(timer);
        }
    },(1000 / fps));
}