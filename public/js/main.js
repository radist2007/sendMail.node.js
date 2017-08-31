$(function() {

    $.ajax({
        type: 'POST',
        url: 'test',
        success: function() {
            console.log('osom');
        }
    });
});
