$( "#osom" ).click(function() {
    $.ajax({
        type: 'POST',
        url: 'test',
        success: function() {
            console.log('osom');
        }
    })
});

$( "#test" ).click(function() {
    $.ajax({
        type: 'POST',
        url: 'test',
        success: function() {
            console.log('test clicked');
        }
    });
});

// $( "#home" ).click(function() {
//     $.ajax({
//         type: 'POST',
//         url: 'home',
//         success: function() {
//             console.log('home');
//         }
//     });
// });

// $( "#sendMail" ).click(function() {
//     $.ajax({
//         type: 'POST',
//         url: 'sendMail',
//         success: function() {
//             console.log('sendMail');
//         }
//     });
// });

// $( "#about" ).click(function() {
//     $.ajax({
//         type: 'POST',
//         url: 'about',
//         success: function() {
//             console.log('about');
//         }
//     });
// });
