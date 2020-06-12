document.addEventListener('DOMContentLoaded', function () {

    //add event handlers for menu items
    [].forEach.call(document.querySelectorAll('.container ul li'), function (element) {
        element.addEventListener('click', function () {
            //switch menu item
            var allChildItems = this.parentElement.getElementsByTagName('li');

            for (var i = 0; i < allChildItems.length; i++)
                allChildItems[i].classList.remove('active');

            this.classList.add('active');

            //switch content
            var relatedElementId = this.getAttribute('data-related-content');
            var relatedElement = document.getElementById(relatedElementId);
            var allChildContentItems = relatedElement.parentElement.getElementsByTagName('div');

            for (var i = 0; i < allChildContentItems.length; i++)
                allChildContentItems[i].classList.remove('active');

            relatedElement.classList.add('active');
        })
    });

    //add event handlers for forms
    Array.prototype.forEach.call(document.getElementsByTagName('form'), function (element) {
        element.addEventListener('submit', function (e) {
            e.preventDefault();

            var paramName = this.getAttribute('data-param-name');
            var paramValue = this.getElementsByTagName('input')[0].value;
            var url = `${this.getAttribute('action')}?${paramName}=${paramValue}`;

            ajax(url,
                function (result) {
                    alert(result);
                },
                function (result) {
                    alert(result);
                });
        });
    });
});

function ajax(url, onSuccess, onError) {
    var requester = new XMLHttpRequest();

    requester.addEventListener('readystatechange', function () {
        if (this.readyState == 4) {
            var result = this.responseText;

            if (this.status == 200) {
                onSuccess(result);
            } else {
                onError(result);
            }
        }
    });

    requester.open('get', url, true);
    requester.send();
}
