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