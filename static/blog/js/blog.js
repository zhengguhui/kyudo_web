var TagManager = new Object();
TagManager.readTags = function(d) {
	var tags = [];
	$(d).each(function() {
		var tag = $(this).attr('value');
		tags.push(tag);
	})
	return tags;
}
TagManager.loadTags = function(tags, func) {
	$.ajax({
		url: "../ajax/loadTags",
		data: {
			tags: JSON.stringify(tags)
		}
	}).done(function(data) {
		func(data);
	});
}
TagManager.markdown = function(content, func) {
	$.ajax({
		type: "POST",
		url: "../ajax/markdown",
		data: {
			csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").val(),
			content: content
		}
	}).done(function(data) {
		func(data);
	});
}
