$(document).ready(function () {
    $("#submit").click(function () {

        // alert("test")


        var url = window.location.href;
        var urls = url.substr(27);


        // console.log(urls)



        //Home page
        if (urls == 'index.html') {

            // alert("ind")

            var name = $("#name").val();
            var email = $("#email").val();
            var subject = $("#subject").val();
            var message = $("#message").val();
            //  var address = $("#address").val();
            var phone = $("#phone").val();

            if (name == '' || email == '' || subject == '' || phone == '') {
                alert("Fill all the Mandatory fields");
            }


            else {

                // Returns successful data submission message when the entered information is stored in database.
                $.post("database.php", {

                    urls1: urls, //this is to check where it came from
                    name1: name,
                    email1: email,
                    subject1: subject,
                    message1: message,
                    address1: address,
                    phone1: phone,
                }, function (data) {
                    alert(data);
                    $('#form')[0].reset(); // To reset form fields
                });
            }


        }

        //contact

        else if (urls == 'contact.html') {
            var name = $("#name").val();
            var email = $("#email").val();
            var subject = $("#subject").val();
            var message = $("#message").val();
            var address = $("#address").val();
            var phone = $("#phone").val();



            if (name == '' || email == '' || subject == '' || phone == '') {
                alert("Fill all the Mandatory fields");
            }


            else {

                $(this).attr('disabled', 'disabled'); //This function disable the submit  button 

                // Returns successful data submission message when the entered information is stored in database.
                $.post("database.php", {

                    urls1: urls, //this is to check where it came from
                    name1: name,
                    email1: email,
                    subject1: subject,
                    message1: message,
                    address1: address,
                    phone1: phone,



                }, function (data) {

                    var btn = document.getElementById("submit");
                    btn.disabled = false;
                    alert(data);
                    $('#form')[0].reset(); // To reset form fields
                });
            }

        }




    });
});