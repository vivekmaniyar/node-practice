$(document).ready(function() {
    $('#login').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/user',
            data: {
                username: username,
                password: password
            },
            success: function(data) {
                if (data == 'success') {
                    alert('Login Successful');
                    window.location.href = 'http://localhost:3000/';
                }
            },
            error: function(err) {
                $('#error').empty();
                $.each(err.responseJSON.errors, function(index, value) {
                    $('#error').append('<p>' + value.msg + '</p>');
                });
            }
        });
    });
});