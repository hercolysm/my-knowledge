<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<title>Drag e Drop elementos</title>
	<link rel="shortcut icon" href="nome_icone.ico">
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Drag e Drop permite tomar um elemento arrastavel pela pagina">
	<script src="assets/js/jquery-3.1.1.min.js"></script>
	<script src="assets/js/jquery-ui.min.js"></script>
</head>
<body style="margin: 0px;">
<style type="text/css">
	#container_fixed {
		position: fixed;
	    top: 50px;
	    left: 0px;
	    width: 100%;
	    height: calc(100% - 100px);
	    display: flex;
	}
    .cartao_oportunidade {
        /*background: #CCC8C8;*/
        background: #fff;
        margin-bottom: 2px;
        width: 100%;
        height: 50px !important;
        text-align: center;
        border-radius: 4px !important;
        cursor:move;
        background-color: #f7c9c9 !important;
        position: relative;
    }
    
    .cartao_oportunidade_top_left {
    	position: absolute;
    	top: 0px;
    	left: 4px;
    }
    .cartao_oportunidade_botton_left {
    	position: absolute;
    	bottom: 0px;
    	left: 4px;
    }
    .cartao_oportunidade_top_right {
    	position: absolute;
    	top: 0px;
    	right: 2px;
    }
    .cartao_oportunidade_botton_right {
    	position: absolute;
    	bottom: 0px;
    	right: 2px;
    }
.assunto_oportunidade {
	font-size: 12px;
	font-family: "Verdana";
}
.empresa_oportunidade {
	font-size: 12px;
}
.acoes_oportunidade {
	font-size: 10px;
}
.valor_oportunidade {
	font-size: 10px;
}
    .lista_oportunidades {
        width: calc(100% - 4px) !important;
        padding: 2px;
        list-style: none;
    }
    @media (max-width: 768px){
        .check_grupo_discagem{
            display: none;
        }
    }
	/*li.ui-selecting,
	li.ui-selected{
		background: #1171a3 !important;
		color:#fff;
	}*/

/* Scroll */
.div_rolagem:first-child {
	margin-left: 3px;
    border-left: 1px solid #ccc;
}

/* container das listas */
.div_rolagem {
	float: left;
    width: calc(20% - 1px);
    margin-bottom: 15px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-left: 0px solid #ccc;
    border-right: 0px solid #ccc;
    overflow-x: hidden;
    overflow-y: scroll;
    /*background-color: #e5e5e5;*/
    background-color: #f7f7f7;
}
.div_rolagem::-webkit-scrollbar {width: 1px;height: 0px;}
.div_rolagem::-webkit-scrollbar-button:end:increment  {display: none;}
.div_rolagem::-webkit-scrollbar-button:start:decrement {display: none;}
.div_rolagem::-webkit-scrollbar-track-piece {background-color: rgba(146, 152, 158, 0.34);-webkit-border-radius: 5px;}
.div_rolagem::-webkit-scrollbar-thumb:vertical {background-color: rgb(169, 165, 168) ;-webkit-border-radius: 5px;}
.div_rolagem::-webkit-scrollbar-thumb:horizontal {background-color: rgb(169, 165, 168) ;-webkit-border-radius: 5px;}
.div_rolagem::-moz-scrollbar {width: 1px;height: 0px;}
.div_rolagem::-moz-scrollbar-button:end:increment  {display: none;}
.div_rolagem::-moz-scrollbar-button:start:decrement {display: none;}
.div_rolagem::-moz-scrollbar-track-piece {background-color: rgba(146, 152, 158, 0.34);-webkit-border-radius: 5px;}
.div_rolagem::-moz-scrollbar-thumb:vertical {background-color: rgb(169, 165, 168) ;-webkit-border-radius: 5px;}
.div_rolagem::-moz-scrollbar-thumb:horizontal {background-color: rgb(169, 165, 168) ;-webkit-border-radius: 5px;}

</style>
<script type="text/javascript">
    $(document).ready(function () {

        $(".lista_oportunidades").sortable({
            connectWith: '.lista_oportunidades',
            stop: function (event, ui, draggable) {
               var elemento = $(ui)[0].item;
            }
        });

        $(".lista_oportunidades").selectable({
            stop: function() {
                var parent = $(this);
            }
        });
    });
</script>

<br>
<br>
<br>
<br>
<div id="container_fixed">
    <div class="div_rolagem">
        <ul class="lista_oportunidades">
        	<?php for($i=0; $i < 30; $i++): ?>
                <li class="cartao_oportunidade">
                    <div class="cartao_oportunidade_top_left">
                    	<span class="assunto_oportunidade">Assunto da oportunidade</span>
                    </div>
                    <div class="cartao_oportunidade_botton_left">
                    	<span class="empresa_oportunidade">Nome fantasia da empresa</span>
                    </div>
                    <div class="cartao_oportunidade_top_right">
                    	<span class="acoes_oportunidade">Ações</span>
                    </div>
                    <div class="cartao_oportunidade_botton_right">
                    	<span class="valor_oportunidade">R$ <?= number_format(rand(0, 5000), 2, ',', '.') ?></span>
                    </div>
                </li>
        	<?php endfor ?>
        </ul>
    </div>
    <div class="div_rolagem">
        <ul class="lista_oportunidades">
        	<?php for($i=0; $i < 10; $i++): ?>
                <li>
                    <i class="fa fa-code-fork"></i> teste <?=$i?>
                    <input type="hidden" name="none" value="teste">
                </li>
        	<?php endfor ?>
        </ul>
    </div>
    <div class="div_rolagem">
        <ul class="lista_oportunidades">
        	<?php for($i=0; $i < 10; $i++): ?>
                <li>
                    <i class="fa fa-code-fork"></i> teste <?=$i?>
                    <input type="hidden" name="none" value="teste">
                </li>
        	<?php endfor ?>
        </ul>
    </div>
    <div class="div_rolagem">
        <ul class="lista_oportunidades">
        	<?php for($i=0; $i < 10; $i++): ?>
                <li>
                    <i class="fa fa-code-fork"></i> teste <?=$i?>
                    <input type="hidden" name="none" value="teste">
                </li>
        	<?php endfor ?>
        </ul>
    </div>
    <div class="div_rolagem">
        <ul class="lista_oportunidades">
        	<?php for($i=0; $i < 10; $i++): ?>
                <li>
                    <i class="fa fa-code-fork"></i> teste <?=$i?>
                    <input type="hidden" name="none" value="teste">
                </li>
        	<?php endfor ?>
        </ul>
    </div>

</div>
</body>
</html>