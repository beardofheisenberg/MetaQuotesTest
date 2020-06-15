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

            var resultContainer = this.parentElement.querySelector('div.result');
            resultContainer.innerHTML = '';

            ajax(url,
                function (result) {
                    var parsed = JSON.parse(result);

                    var header = document.createElement('h4');
                    header.innerHTML = `Results:`;
                    resultContainer.appendChild(header);
                    makeTree(resultContainer, parsed);
                },
                function (result) {
                    alert(`Server passed a error code ${result}`);
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
                onError(this.status);
            }
        }
    });

    requester.open('get', url, true);
    requester.send();
}

function capitalize(value) {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function makeTree(container, data) {
    console.log(data);

    var list = document.createElement('ul');
    container.appendChild(list);

    for (var item in data) {
        console.log(item);
        console.log(data[item]);

        if (data[item] === null)
            continue;

        var listItem = document.createElement('li');
        var name = Array.isArray(data) ? `Item ${parseInt(item) + 1}` : capitalize(item);

        if (Array.isArray(data[item]))
            makeTree(createNodeWrapper(name, listItem), data[item]);
        else if (typeof data[item] === 'object')
            makeTree(createNodeWrapper(name, listItem), data[item]);
        else {
            listItem.innerHTML = `<div class='result-item-wrapper'>
               <div class='item-name'>${name}</div>
               <div class='item-value'>${data[item]}</div>
            <div>`;
        }

        list.appendChild(listItem);
    }
}

function createNodeWrapper(item, container) {
    var nodeWrapper = document.createElement('div');
    nodeWrapper.className = 'node-wrapper';

    var nodeHead = document.createElement('div');
    nodeHead.classList.add('node-head');
    nodeHead.innerHTML = `<label>${item}</label>`;

    nodeHead.addEventListener('click', function () {
        var relatedContent = this.parentElement.querySelector('.node-content');

        if (this.classList.contains('active')) {
            this.classList.remove('active');
            relatedContent.classList.remove('active');
        } else {
            this.classList.add('active');
            relatedContent.classList.add('active');
        }
    });

    var nodeContent = document.createElement('div');
    nodeContent.className = 'node-content';

    nodeWrapper.appendChild(nodeHead);
    nodeWrapper.appendChild(nodeContent);
    container.appendChild(nodeWrapper);

    return nodeContent;
}

