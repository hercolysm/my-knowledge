var req = new XMLHttpRequest();
req.open("POST", url, true);
req.setRequestHeader("Content-Type", "application/json");
req.onreadystatechange = function () {
    if (this.readyState === 4) {
        req.onreadystatechange = null;
        if (this.status === 200) {

            var result = JSON.parse(this.response);
        }
        else {
            alert("Ocorreu um erro no envio");
        }
    }
};
req.send(JSON.stringify(parameters));