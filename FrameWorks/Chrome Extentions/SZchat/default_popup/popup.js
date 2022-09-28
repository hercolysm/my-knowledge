let access_control_allow_origin = [
    ".sz.chat",
    ".dynamics.com",
];

async function prepare_popup() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    let allow = false;

    access_control_allow_origin.forEach(function(val, index) {
        var reg = new RegExp(val, "ig");

        if (reg.test(tab.url) && allow == false) {
            allow = true;
        }        
    });

    if (!allow) {
        document.getElementById("aviso-site-nao-suportado").classList.remove("hide");
    } else {
        chrome.storage.sync.get("agent_token", ({ agent_token }) => {
            if (!agent_token) {
                document.getElementById("container-login").classList.remove("hide");
                document.getElementById("div-login").classList.remove("hide");
            } else {
                document.getElementById("container-atendimentos").classList.remove("hide");
            }
        });
    }
}

prepare_popup();

let form_login = document.getElementById("form-login");

form_login.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //let url = "https://fortics.sz.chat/api/v4/auth/login";
    let url = "https://qa.sz.chat/api/v4/auth/login";
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email.trim() == "" || password.trim() == "") {
        document.getElementById("password").value = null;
        document.getElementById("login-erro").classList.remove("hide");
        document.getElementById("login-erro").innerText = "Usuário e/ou senha não conferem";
        return;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        
        if (this.readyState == 4) {
            switch (this.status) {
                case 200:
                    let response = JSON.parse(this.responseText);
                    let agent_token = response.token;
                    let agent_name = response.user.name;
                    chrome.storage.sync.set({ agent_token });
                    chrome.storage.sync.set({ agent_name });
        
                    document.getElementById("container-login").classList.add("hide");
                    document.getElementById("div-login").classList.add("hide");
                    document.getElementById("login-erro").classList.add("hide");
                    document.getElementById("container-atendimentos").classList.remove("hide");
                    document.getElementById("telephone").innerHTML = "";
                    document.getElementById("attendances-list").innerHTML = "";
                    break;

                case 401:
                    document.getElementById("password").value = null;
                    document.getElementById("login-erro").classList.remove("hide");
                    document.getElementById("login-erro").innerText = "Usuário e/ou senha não conferem";
                    break;

                default: 
                    document.getElementById("login-erro").classList.remove("hide");
                    document.getElementById("login-erro").innerText = "Serviço indisponível";
                    
            }
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("email="+email+"&password="+password+"");
    return;
});

let btn_logout = document.getElementById("btn-logout");

btn_logout.addEventListener("click", async () => {

    //let url = "https://fortics.sz.chat/api/v4/auth/logout";
    let url = "https://qa.sz.chat/api/v4/auth/logout";
    
    chrome.storage.sync.get("agent_token", ({ agent_token }) => {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                chrome.storage.sync.set({ agent_token: null });
                chrome.storage.sync.set({ agent_name: null });

                document.getElementById("container-atendimentos").classList.add("hide");
                document.getElementById("container-login").classList.remove("hide");
                document.getElementById("div-login").classList.remove("hide");
                document.getElementById("password").value = "";
            }
        };
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Authorization', 'Bearer ' + agent_token);
        xhttp.send();
    });
    return;
});

let input_email = document.getElementById("email");

input_email.addEventListener("keyup", () => {
    document.getElementById("login-erro").classList.add("hide");
});

let input_password = document.getElementById("password");

input_password.addEventListener("keyup", () => {
    document.getElementById("login-erro").classList.add("hide");
});

async function execute_script_in_page() {

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            console.log("Clicou no btn");
        }
    });
}

execute_script_in_page();

let btn_search_attendances = document.getElementById("btn-search-attendances");

btn_search_attendances.addEventListener("click", () => {
    let attendances_list = document.getElementById("attendances-list");
    attendances_list.innerHTML = "";

    let telephone = document.getElementById("telephone").value;
    let initial_date = "2022-08-03";
    let end_date = "2022-08-03";
    
    let url = "https://qa.sz.chat/api/v4/attendances/historic/interval";
    url += "?initial_date="+initial_date;
    url += "&end_date="+end_date;
    url += "&platform_id="+telephone;
    
    chrome.storage.sync.get("agent_token", ({ agent_token }) => {
    
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            
            if (this.readyState == 4) {
                switch (this.status) {
                    case 200:
                        let response = JSON.parse(this.responseText);
                        let data = response.data;
                        data.forEach(function(item, index, arr) {
                            let session_id = item._id;
                            let created_at = item.createdAt;
                            let finished_at = item.finishedAt;
        
                            let textnode = document.createTextNode(created_at);
                            let li = document.createElement("li");
                            
                            li.addEventListener("click", function() {
                                let url = "https://qa.sz.chat/api/v4/attendances/historic/messages";
                                
                                xhttp.onreadystatechange = function() {
                                    
                                    if (this.readyState == 4) {
                                        switch (this.status) {
                                            case 200:
                                                let response = JSON.parse(this.responseText);
                                                let original = response.original;
                                                original.forEach(function(item2, index2, arr2) {
                                                    let message = item2.message ? item2.message : item2.filename;
                                                    let textnode2 = document.createTextNode(message);
                                                    let li2 = document.createElement("li");
                                                    li2.appendChild(textnode2);
                                                    attendances_list.appendChild(li2); 
                                                });

                                            case 401:
                                                alert("401-2");
                                                break;
                            
                                            default: 
                                                alert(this.responseText);
                                        }
                                    }
                                };
                                xhttp.open("POST", url, true);
                                xhttp.setRequestHeader('Authorization', 'Bearer ' + agent_token);
                                xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                                xhttp.send("session_id="+session_id+"&created_at="+created_at+"&finished_at="+finished_at);
                            });

                            li.appendChild(textnode);
                            attendances_list.appendChild(li);
                        });
                        break;

                    case 401:
                        //alert("401");
                        break;

                    default: 
                        alert(this.responseText);
                }
            }
        };
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Authorization', 'Bearer ' + agent_token);
        xhttp.send();
    });
});
