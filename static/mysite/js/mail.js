function send_mail()  {
	$.ajax({
		url: "../ajax/sendMail",
		type: "POST",
		data: {
			csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
			content: $('#contact').val() + '\n' + $('#content').val()
		}
	}).done(function(data) {
		alert(data);
		window.location.href = "../";
	});
}