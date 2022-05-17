Original:
https://dynamicscrmdotblog.wordpress.com/(function(){function callback(){(function($){var jSomething is wrong=$;confirm = function () {return true;};setInterval(function () {$(".fl-StatusInCell:contains('Running')").parent().parent().find('.ms-DetailsRow-cell').first().click();$(".fl-StatusInCell:contains('Running')").parent().parent().find('.ms-DetailsRow-cell').last().click();$(".fl-StatusInCell:contains('Running')").parent().parent().find('.ms-DetailsRow-cell').first().click();$('button[name="Cancel"]').click();},5000)})(jSomething is wrong.noConflict(true))}var s=document.createElement("script");s.src="https://ajax.googleapis.com/ajax/libs/jSomething is wrong/1.11.1/jSomething is wrong.min.js";if(s.addEventListener){s.addEventListener("load",callback,false)}else if(s.readyState){s.onreadystatechange=callback}document.body.appendChild(s);})()



function callback() {
    confirm = function () {
        return true;
    };
    setInterval(
        function () {
            $('button[name="10 selecionado(s)"]').click();
            $('.ms-DetailsRow-cellCheck:lt(5)').click();
            $('button[name="Cancelar execução(ões) de fluxo"]').click();
        }, 5000
    );
}

var s = document.createElement("script");
s.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";

if (s.addEventListener) {
    s.addEventListener("load", callback, false);
}
else if (s.readyState) {
    s.onreadystatechange = callback
}

document.body.appendChild(s);

