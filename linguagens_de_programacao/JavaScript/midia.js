// Midias
let file_base64 = Response.file_base64; 
let filename = Response.filename; 
let mime_type = Response.mime_type; 

let media_type = mime_type.split('/')[0];

var uri_base64 = "data:"+mime_type+";base64,"+file_base64;
let html_element = '';

switch(media_type) {
    case 'image': 
        html_element = `
            <img src="${uri_base64}">
        `;
        break;

    case 'audio':
        html_element = `
            <audio controls>
                <source type="audio/mpeg" src="${uri_base64}"
            </audio>
        `;
        break;

    case 'video': 
        html_element = `
            <video controls>
                <source type="video/mp4" src="${uri_base64}"
            </video>
        `;
        break;
}

if (html_element) {
    document.getElementById("results").innerHTML = html_element;
}
else {
    var a = document.createElement("a");
    a.href = uri_base64; 
    a.download = filename;
    a.innerText = 'Baixar: ' + filename;

    var br = document.createElement("br");

    document.getElementById("results").appendChild(br);
    document.getElementById("results").appendChild(a);
}