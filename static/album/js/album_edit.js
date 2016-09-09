
function addFile(){
	console.log($("#file_path").val());
	files = $("#file_path").val().split('|')
	for(var i=0;i<files.length;i++){
		f = files[i];
		$('#selectedFile').append('<input type="button" class="file btn btn-default" onclick="deleteThis(this)" value="' + f + '"/>');
	}
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
	TagManager.markdown($('#album_content').val(), function(content) {
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
			date: $('#album_date').val(),
			title: $('#album_title').val(),
			content: $('#album_content').val(),
			level: $('#album_level').val(),
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
