$(document).ready(function () {
  $("#form").on("submit", function (e) {
    e.preventDefault();

    var contactPerson = $("#contactPerson").val().trim();
    var phone = $("#phone").val().trim();

    if (!contactPerson || !phone) {
      alert("Please fill Contact Person and Phone Number.");
      return;
    }

    var urls = window.location.pathname.split("/").pop() || "index.html";
    var formData = new FormData();

    formData.append("urls1", urls);
    formData.append("companyName1", $("#companyName").val() || "");
    formData.append("contactPerson1", contactPerson);
    formData.append("phone1", phone);
    formData.append("email1", $("#email").val() || "");
    formData.append("subject1", $("#subject").val() || "");
    formData.append("address1", $("#address").val() || "");
    formData.append("state1", $("#state").val() || "");
    formData.append("city1", $("#city").val() || "");
    formData.append("message1", $("#message").val() || "");

    var fileInput = document.getElementById("projectFile");
    if (fileInput && fileInput.files[0]) {
      formData.append("projectFile", fileInput.files[0]);
    }

    var $submit = $("#submit");
    $submit.prop("disabled", true);

    $.ajax({
      url: "database.php",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (data) {
        alert(data);
        $("#form")[0].reset();

        if (document.getElementById("state") && document.getElementById("state").tomselect) {
          document.getElementById("state").tomselect.clear();
        }
        if (document.getElementById("city") && document.getElementById("city").tomselect) {
          document.getElementById("city").tomselect.clear();
        }

        $submit.prop("disabled", false);
      },
      error: function () {
        alert("Something went wrong. Please try again or call us directly.");
        $submit.prop("disabled", false);
      },
    });
  });
});
