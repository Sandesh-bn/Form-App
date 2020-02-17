$(document).ready(function() {
        let passWordToolTipString = '1 lowercase & 1 uppercase\n1 number (0-9)\n1 Special Character (!@#$%^&*).\nAtleast 8 Characters';

        $('#password').tooltip({'trigger':'focus', 'title': passWordToolTipString, 'placement': 'right'});
        let isValidEmail = false;
        let isValidPassword = false;
        let fullName = '';
        let userEmail = '';
        let userPassword = '';
        let passwordMatch = false;
        $('#email').blur(function() {
            var email = $('#email').val();
            if (IsEmail(email) == false) {
                $('#sign-up').attr('disabled', true);
                $('#popover-email').removeClass('hide');
                isValidEmail = false;
            } else {
                $('#popover-email').addClass('hide');
                isValidEmail = true;
                userEmail = email;
                if (isValidPassword && isValidEmail && passwordMatch)
                    $('#sign-up').attr('disabled', false);
            }
        });
        $('#password').keyup(function() {
            var password = $('#password').val();

            if (checkStrength(password) == false) {
                $('#sign-up').attr('disabled', true);
                isValidPassword = false;
            }
            else {
                isValidPassword = true;
                userPassword = password
                if (isValidPassword && isValidEmail && passwordMatch)
                    $('#sign-up').attr('disabled', false);
            }
        });

        $('#full-name').keyup(function() {
            fullName = $('#full-name').val();
        });

        $('#confirm-password').blur(function() {
            if ($('#password').val() !== $('#confirm-password').val()) {
                $('#popover-cpassword').removeClass('hide');
                $('#sign-up').attr('disabled', true);
                isValidPassword = false;
                passwordMatch = false;
            } else {
                $('#popover-cpassword').addClass('hide');
                isValidPassword = true;
                passwordMatch = true;
                if ( isValidPassword && isValidEmail && passwordMatch)
                    $('#sign-up').attr('disabled', false);
            }
        });
        
        $('#sign-up').hover(function() {
            if ($('#sign-up').prop('disabled')) {
                $('#sign-up').popover({
                    html: true,
                    trigger: 'hover',
                    placement: 'below',
                    offset: 20,
                    content: function() {
                        return $('#sign-up-popover').html();
                    }
                });
            }
        });

        $('#sign-up').click(function() {
            let url = 'https://private-anon-7e0296bb3b-udacityfrontendtest.apiary-mock.com/signup'
            let userObject = {
                'fullName': fullName,
                'email': userEmail,
                'password': userPassword,
                'password_verify': userPassword
            }
            console.log(userObject)
            $(".submit").addClass("loading");
            setTimeout(function() {
              $(".submit").addClass("hide-loading");
              $(".done").addClass("finish");
            }, 3000);

            axios.post(url, userObject)
            .then(function (response) {
                console.log('success')
                console.log(response);
                setTimeout(function() {
                  $(".submit").removeClass("loading");
                  $(".submit").removeClass("hide-loading");
                  $(".done").removeClass("finish");
                  $(".failed").removeClass("finish");
                }, 5000);
            })
            .catch(function (error) {
                console.log('err')
                console.log(error);
                
            });
        })

        

        function IsEmail(email) {
            return /\S+@\S+\.\S+/.test(email)
        }

        function checkStrength(password) {
            var strength = 0;


            //If password contains both lower and uppercase characters, increase strength value.
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                strength += 1;
                $('.low-upper-case').addClass('text-success');
                $('.low-upper-case i').removeClass('fa-file-text').addClass('fa-check');
                $('#popover-password-top').addClass('hide');


            } else {
                $('.low-upper-case').removeClass('text-success');
                $('.low-upper-case i').addClass('fa-file-text').removeClass('fa-check');
                $('#popover-password-top').removeClass('hide');
            }

            //If it has numbers and characters, increase strength value.
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                strength += 1;
                $('.one-number').addClass('text-success');
                $('.one-number i').removeClass('fa-file-text').addClass('fa-check');
                $('#popover-password-top').addClass('hide');

            } else {
                $('.one-number').removeClass('text-success');
                $('.one-number i').addClass('fa-file-text').removeClass('fa-check');
                $('#popover-password-top').removeClass('hide');
            }

            //If it has one special character, increase strength value.
            if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength += 1;
                $('.one-special-char').addClass('text-success');
                $('.one-special-char i').removeClass('fa-file-text').addClass('fa-check');
                $('#popover-password-top').addClass('hide');

            } else {
                $('.one-special-char').removeClass('text-success');
                $('.one-special-char i').addClass('fa-file-text').removeClass('fa-check');
                $('#popover-password-top').removeClass('hide');
            }

            if (password.length > 7) {
                strength += 1;
                $('.eight-character').addClass('text-success');
                $('.eight-character i').removeClass('fa-file-text').addClass('fa-check');
                $('#popover-password-top').addClass('hide');

            } else {
                $('.eight-character').removeClass('text-success');
                $('.eight-character i').addClass('fa-file-text').removeClass('fa-check');
                $('#popover-password-top').removeClass('hide');
            }


            if (strength < 2) {
                $('#result').removeClass()
                $('#password-strength').removeClass('progress-bar-success progress-bar-warning')
                $('#password-strength').addClass('progress-bar-danger');

                $('#result').addClass('text-danger').text('Week');
                $('#password-strength').css('width', '10%');
            } else if (strength == 2) {
                $('#result').addClass('good');
                $('#password-strength').removeClass('progress-bar-danger progress-bar-success');
                $('#password-strength').addClass('progress-bar-warning');
                $('#result').addClass('text-warning').text('Medium')
                $('#password-strength').css('width', '60%');
                return 'Medium'
            } else if (strength == 4) {
                $('#result').removeClass()
                $('#result').addClass('strong');
                $('#password-strength').removeClass('progress-bar-warning progress-bar-danger');
                $('#password-strength').addClass('progress-bar-success');
                $('#result').addClass('text-success').text('Strong');
                $('#password-strength').css('width', '100%');

                return 'Strong'
            }

        }

    });



