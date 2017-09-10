function test(){
    document.getElementById('test').style.display = "none";

    $.post('/mongodb',{
//????????????????????????????????????????
    }, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        console.log('post AJAX: ' + data);
        var parse = JSON.parse(data);
        for(var i = 0; i < parse.length; i++){
            var node = document.createElement("LI");
            var textnode = document.createTextNode(parse[i].name + "\n " + parse[i].email);
            node.appendChild(textnode);
            document.getElementById("myList").appendChild(node);
        }
    });
}