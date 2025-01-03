document.addEventListener("DOMContentLoaded", function() {
    var titleElement = document.querySelector('.site-title');
    if (titleElement) {
        var titleHTML = titleElement.innerHTML.replace(/[\u4e00-\u9fa5]/g, function(character) {
            return '<span class="chinese-character">' + character + '</span>';
        });
        titleElement.innerHTML = titleHTML;
    }
});