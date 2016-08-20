function addTag(value) {
	var tags = TagManager.readTags('#selectedTag .tag');
	if ($.inArray(value, tags) < 0) {
		$('#selectedTag').append('<input type="button" class="tag btn btn-default" onclick="deleteThis(this)" value="' + value + '"/>');
	}
	$('#tagDialogTrigger').click();
};

function loadTag() {
	TagManager.loadTags(TagManager.readTags('#selectedTag .tag'), function(data) {
		var tagList = JSON.parse(data);
		$("#tagList").empty();
		for (x in tagList) {
			var tag = tagList[x];
			$("#tagList").append(' <li class="list-group-item" onclick="addTag($(this).html())" id="' + tag + '">' + tag + '</li>');
		}
		$('#tagDialogTrigger').click();
	});
};

function preview(){
	TagManager.markdown($('#blog_content').val(), function(content) {
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
			date: $('#blog_date').val(),
			title: $('#blog_title').val(),
			content: $('#blog_content').val(),
			level: $('#blog_level').val(),
			tags: JSON.stringify(TagManager.readTags('#selectedTag .tag'))
		}
	}).done(function(data) {
		alert(data);
		window.location.href = ".." + window.location.pathname;
	});
}

function deleteThis(self) {
	self.remove();
}
