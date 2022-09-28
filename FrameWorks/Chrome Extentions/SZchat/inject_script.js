let itens = document.getElementsByTagName("body");

Array.from(itens).forEach(function(item) {
    var get_selection = function() {
        
        let inject_btn = document.getElementById("inject_btn");
        if (inject_btn) {
            inject_btn.remove();
        }

        let selection = null;
        if (window.getSelection) {
            selection = window.getSelection().toString();
            /*
            let testDiv = window.getSelection();
            console.log(testDiv);

            if (testDiv.anchorNode.offsetTop) {
                var top = testDiv.anchorNode.offsetTop;
                var left = testDiv.anchorNode.offsetLeft;
            } else if (testDiv.anchorNode.parentNode.offsetTop) {
                var top = testDiv.anchorNode.parentNode.offsetTop;
                var left = testDiv.anchorNode.parentNode.offsetLeft;
            } else {
                var top = 0;
                var left = 0;
            }

            console.log(top, left);
            */
        } else if (document.selection) {
            selection = document.selection.createRange().text;
            console.log("document.selection");
        }

        if (selection) {

            let div = document.createElement("div");
            div.setAttribute("id", "inject_btn");
            //div.setAttribute("style", "position: absolute; top: "+top+"px; left: "+left+"px; z-index: 2000;");
            div.setAttribute("style", "position: fixed; top: 15px; right: 30px; z-index: 2000;");
            let a = document.createElement("a");
            a.innerText = "Buscar atendimentos no SZchat";
            a.setAttribute("style", "color: #fff; background: red;");
            div.appendChild(a);
            item.appendChild(div);

            console.log('selection: ', selection);
            chrome.storage.sync.set({ selection });
        } else {
            console.log('vazio');
        }
    };
    item.addEventListener("mouseup", get_selection);
    item.addEventListener("keyup", get_selection);

    
});
