function test(){
    var fadeBtn = document.getElementById('showDb');
    fade(fadeBtn, 500, function(){
        this.style.display = "none";
        // document.getElementById('showDb').style.display = "none";
    });

    $.post('/mongodb', function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        console.log('post AJAX respons: ' + data);
        var parse = JSON.parse(data);
        for(var i = 0; i < parse.length; i++){
            var node = document.createElement("div");
            node.className = "border";
            node.innerHTML = "<div>" + parse[i].name + "</div><div>" + parse[i].email + "</div><div>" + parse[i].message + "</div>";
            document.getElementById("myList").appendChild(node);
        }
    });
}

function fade(elem, t, f) {
    var fps = 50;
    var time = t || 500;
    var steps = time / fps;
    var op = 1;
    var dO = op / steps;

    var callback = f || function() {};

    var timer = setInterval(function(){
        op -= dO;
        elem.style.opacity = op;
        steps--;

        if(steps === 0) {
            clearInterval(timer);
            callback.call(elem);
        }
    },(1000 / fps));
}