<script type="text/javascript">

//	#JQUERY

//	-conjunto de soluções javascript pronto
//	-jquery.min.js (é o arquivo otimizado)
//	-filosofia: "não misturar 'html' com 'script', pois ele deve ficar no head"

//	SELETORES SIMPLES
	$("*"); 			// seleciona todos os elementos
	$("#id");			// seleciona por id
	$(".classe");		// seleciona pela classe
	$("tag");			// seleciona por tag
	$("tag1, tag2");	// seleciona por tags

//	SELETORES HIERÁQUICOS
	$("tag1 tag2");		// seleciona tags2 descedentes de tag1
	$("tag1 > tag2");	// seleciona tag2 filha de tag1
	$("tag1 + tag2");	// seleciona o primeiro irmao da tag1
	$("tag1 ~ tag2");	// seleciona todos os irmãos da tag1

//	SELETORES de FILTRO
	$("tr:first");		// seleciona a primeira 'tr'
	$("tr:last")		// seleciona a ultima 'tr'
	$("tr:not(tr:last)");// seleciona tr's, com excessão da última
	$("tr:even");		// seleciona ocorrências pares
	$("tr:odd");		// seleciona ocorrências ímpares
	$("tr:eq(3)");		// seleciona terceira 'tr'
	$("tr:gt(3)");		// seleciona da quarta 'tr' adiante
	$("tr:lt(3)");		// seleciona primeira e segunda
	$(":animated");		// seleciona elementos que estão em progresso de animação
	$(":header");		// seleciona todos elemento q são headers, ex: h1, h2, h3...

//	SELETORES de FILTRO AVANÇADOS
	$(":nth-child(even)");	// seleciona ocorrências pares
	$(":nth-child(odd)");	// seleciona ocorrências ímpares
	$(":nth-child(3)");		// seleciona terceira ocorrência
	$(":nth-child(2n)");	// seleciona ocorrências pares
	$(":nth-child(2n+1)");	// seleciona ocorrências ímpares
	$(":nth-child(3n)");	// seleciona de 3 em 3 (0,3,6..)
	$(":nth-child(3n+1)");	// seleciona de 3 em 3 (1,4,7..)

//	SELETORES de CONTEÚDO
	$("td:parent");		// seleciona pai do elemento (tr)
	$("td:contains(txt)");// seleciona 'td' com esse txt
	$("td:empty");		// seleciona 'td' vazias
	$("td:has(p)");		// seleciona 'td' q tenha um 'p' dentro

// SELETORES de ATRIBUTOS
	$("a[name=nome]");	// seleciona 'a' de name=nome
	$("a[name!=nome]");	// seleciona 'a' de name!=nome
	$("a[href*=min]");	// seleciona 'a' de tenham href='..min..'
	$("a[href$=js]");	// seleciona 'a' q href terminam em '..js'
	$("a[href^=nome]");	// seleciona 'a' q href comece em 'nome..'

// SELETORES de FORMULÁRIOS
	$(":input");		// seleciona todos inputs
	$(":text");			// seleciona inputs type=text
	// :password :radio :checkbox :submit :reset :file :image :button :hidden
	$(":enable");		// seleciona inputs habilitados
	$(":disabled");		// seleciona inputs desabilitados
	$(":checked");		// seleciona inputs checked
	$(":selected");		// seleciona inputs selected

// SELETORES de BUSCA
	.find();			// busca descendentes de um elemento
	.siblings();		// busca os irmãos de um elemento
	.children();		// busca os filhos de um elemento
	.parents();			// busca o pai de um elemento

// MANIPULAÇÃO de ATRIBUTOS
	.attr("attr"); 			// retorna atributo
	.attr("attr", "val"); 	// altera atributo
	.attr({					// altera varios atributos
		src: "img/fot.png",
		title: "newTitle"
	});
	.removeAttr("attr"); 	// remove atributo
	.addClass("classe"); 	// adiciona classe
	.removeClass(); 		// remove classe
	.toggleClass("classe");	// add ou remove classe
	.hasClass("classe"); 	// verifica se classe existi

// MANIPULAÇÃO de ATRIBUTOS
	.html();				// retorna conteúdo html do elemento
	.html("<h1>texto</h1>");// muda conteúdo html do elemento
	.text("texto");			// muda texto do elemento
	.val();					// retorna value
	.replaceWith("<p>txt</p>");// substitui elemento

// MANIPULAÇÃO DOM
	.append();			// add dentro, na ultima posição
	.prepend();			// add dentro, na primeira posição
	.after();			// add fora, após o elemento
	.before();			// add fora, antes do elemento
	.wrap();			// envolve com outro elemento
	.unwrap();			// remove elemento envolvente
	.clone();			// faz uma copia do elemento
	.remove();			// remove o elemento
	.empty();			// esvazia o elemento

// MANIPULÇÃO CSS
	.css("prop");		// retorna valor da propriedade
	.css("prop","valor");// atribui valor a propriedade
	.css({				// atribui varios valores
		width: "1px",
		height:"1px"
	});
	.width();			// retorna width
	.height();			// retorna height
	.innerWidth();		// retorna width+padding
	.outerWidth();		// retorna width+padding+borda
	.innerWidth(true);	// retorna width+padding+borda+margin
	.position().top();	// retorna posição do elemento
	.offset().left();	// retorna posição do elemento

// EVENTOS

// EVENTOS de MOUSE
	.click();			// qnd click
	.dblclick();		// qnd duplo click
	.mouseover();		// qnd passar mouse por cima
	.mouseout();		// qnd tirar mouse de cima
	.mousedown();		// qnd mouse esta sendo precionado
	.mouseup();			// qnd mouse for solto
	.mousemove();		// qnd mouse esta movimentando

// EVENTOS de TECLADO 
	.keyup();			// qnd digitando
	.keypress();		// qnd pressionando uma tecla
	.keydown();			// retorna teclas digitada
	.focus();			// qnd focado
	.blur();			// qnd peder foco
	.submit();			// qnd submetido
	.change();			// qnd alteraod
	.select();			// qnd selecionado um texto

// EVENTOS AVANÇADOS
	.bind();			// associa eventos a um elemento
	.unbind();			// desassocia eventos de um elemento
	.trigger();			// aciona um evento de um elemento
	.delegate();		// associa eventos a um grupo de elementos
	.undelegate();		// (criados antes ou depois do carregamento)
	.serialize();		// cria uma string no padrão url

// EFEITOS
	.hide();			// esconde um elemento
	.show();			// mostra um elemento
	.toggle();			// alternador mostra/esconde
	.fadeOut();			// deixa transparente e esconde
	.fadeIn();			// tira transparencia e mostra
	.fadeTo(,);			// deixa com transparencia definida
	.fadeToggle();		// alternador mostra/esconde (com tranparencia)
	.slideUp();			// esconde de baixo p/ cima
	.slideDown();		// mostra de cima p/ baixo
	.slideToggle();		// alternador mostra/esconde

// OUTRAS FUNÇÕES JQUERY
	.delay();			// aplica um atraso
	.ready();			// qnd elemento for carregado
	.each();			// executa p/ cada elemento
	.next();			// seleciona elemento seguinte
	.substr(inicio,fim);// corta uma string
	.load();			// carrega url dentro de um elemento

// EXEMPLOS
	$(document).ready(function(){
		$(":button").click(function(){
			// criam uma img
			var img = $("<img/>",{
				src: 'img/foto.png',
				title: 'titulo',
				click: function(){
					alert("teste");
				}
			})
		});
		// add img no body
		$("body").append(img);

		// cria tr
		var tr = $("<ul/>").append($(<"li/">).append("txt"));
	});

</script>

// FUNÇÕES DE ARRAY
var data_mysql = "2017-10-02";
var data = data_mysql.split('-').reverse().join('/');
