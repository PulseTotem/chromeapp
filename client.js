window.onload = function() {

    var checkValue = function () {
        chrome.storage.local.get("pulseTotemName", function (obj) {
            if (obj.pulseTotemName) {
                document.getElementById("name").style.display = "block";
                document.getElementById("name").innerHTML = "Hello "+obj.pulseTotemName;
                document.getElementById("form").style.display = "none";
            }
        });
    }

    document.querySelector("#validateForm").onclick = function() {
        var name = document.querySelector("#form_name").value;
        chrome.storage.local.set({"pulseTotemName":name},function() {
            console.log("Registered name");
            checkValue();
        });
    }

    checkValue();

};