window.onload = function() {

    document.querySelector("#changeTag").onclick = function () {
        document.querySelector('#div-tag').style.display = "block";
        document.querySelector('#webview').style.display = "none";
    };

    document.querySelector('#form-tag').onsubmit = function(e)
    {
        e.preventDefault();
        var tag = document.querySelector("#tag").value;
        chrome.storage.local.set({"pulseTotemTag":tag},function() {
            goToURL();
        });
    };

    document.querySelector('body').onmousemove = function () {
        document.querySelector('#changeTag').style.display = 'inline-block';
        timeoutChangeTag();
    };

    checkValue();
    resize();
    window.onresize = resize();
};

var ontimeout = false;
var timeoutChangeTag = function () {
    var changeTag = document.querySelector('#changeTag');
    if (changeTag.style.display != 'none' && !ontimeout) {
        setTimeout(function () {
            changeTag.style.display = "none";
            ontimeout = false;
        }, 5000);
        ontimeout = true;
    }
};

var checkValue = function () {
    chrome.storage.local.get("pulseTotemTag", function (obj) {
        if (obj.pulseTotemTag) {
            document.querySelector("#tag").value = obj.pulseTotemTag;
            goToURL();
        }
    });
};

var goToURL = function () {
    var tag = document.querySelector("#tag").value;
    var pulseTotemClient = "https://client.pulsetotem.fr/?hash="+tag;
    webview.src = pulseTotemClient;
    document.querySelector('#div-tag').style.display = "none";
    document.querySelector('#webview').style.display = "block";
    timeoutChangeTag();
};

var resize = function()
{
    var webview = document.querySelector('#webview');
    webview.style.width = document.documentElement.clientWidth + 'px';
    webview.style.height = document.documentElement.clientHeight + 'px';
};