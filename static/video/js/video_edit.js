
function addFile(){
	console.log($("#file_path").val());
	$('#selectedFile').append('<input type="button" class="file btn btn-default" onclick="deleteThis(this)" value="' + $("#file_path").val() + '"/>');
	$("#file_path").val("");
}

function readFiles(d){
	var files = [];
	$(d).each(function() {
		var path = $(this).attr('value');
		files.push(path);
	})
	return files;
}

function preview(){
	TagManager.markdown($('#video_content').val(), function(content) {
		$("#preview_div").empty();
		$("#preview_div").append(content);
		$('#previewDialogTrigger').click();
	});
}

function submit() {
	$.ajax({
		url: ".." + window.location.pathname,
		type: "POST",
		data: {
			csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
			date: $('#video_date').val(),
			title: $('#video_title').val(),
			content: $('#video_content').val(),
			level: $('#video_level').val(),
			files: JSON.stringify(readFiles('#selectedFile .file'))
		}
	}).done(function(data) {
		alert(data);
		window.location.href = ".." + window.location.pathname;
	});
}

function deleteThis(self) {
	self.remove();
}
