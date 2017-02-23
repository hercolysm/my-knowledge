<?php
	require_once "controller/conexao.php";

	/**
	* recebe uma conexao, uma sql e o total de linhas(opcional)
	* retorna uma lista e sua paginacao
	**/
	function listar($_pdo,$sql,$linhas_por_pagina=2) {
		// recebe pagina atual do get
		$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
		// recebe qnt de linhas do get
		$linhas_por_pagina = isset($_GET['linhas_por_pagina']) ? (int)$_GET['linhas_por_pagina'] : $linhas_por_pagina;
		// conta o total de linhas da sql
		$total = $_pdo->query($sql)->rowCount();
		// conta o total de paginas possíveis
		$total_paginas  = ceil($total / $linhas_por_pagina);
		// calcula LIMIT
		$posicao = ($pagina-1)*$linhas_por_pagina;
		// prepara lista para a pagina atual
		$lista = $_pdo->query($sql." LIMIT ".$posicao.",".$linhas_por_pagina."")->fetchAll(PDO::FETCH_ASSOC);
		// se houver mais de uma pagina para exibir ira montar o HTML da paginacao
		$html = "";
		if ($total_paginas>1 && $pagina<=$total_paginas) :
		$html .= "<nav aria-label='navegação das paginas'>
					<ul class='pagination'>";
			if ($pagina>1):
				$html .= "<li>
							<a href='?pagina=1' aria-label='Primeira'>
								<span aria-hidden='true'>Primeira</span>
							</a>
						</li>";
				if ($pagina>2):
					$html .= "<li>
								<a href='?pagina=".($pagina-1)."'>
									<span aria-hidden='true'>Anterior (".($pagina-1).")</span>
								</a>
							</li>";
				endif;
			endif;
		$html .= "<li class='active'>
					<a>
						Página
						<select name='paginas' style='color:#337ab7;'>";
			for ($pg=1; $pg <= $total_paginas ; $pg++):
				if ($pagina==$pg){$selected="selected";}else{$selected="";}
				$html .= "<option value='?pagina=".$pg."' ".$selected.">".$pg."</option>";
			endfor;
		$html .= 		"</select>
					</a>
				</li>";
		if($pagina<$total_paginas):
			if($pagina<$total_paginas-1):
				$html .= "<li>
							<a href='?pagina=".($pagina+1)."' aria-label='Próximo'>
		 						<span aria-hidden='true'>Próxima (".($pagina+1).")</span>
							</a>
						</li>";
			endif;
			$html .= "<li>
						<a href='?pagina=".$total_paginas."' aria-label='Última'>
	 						<span aria-hidden='true'>Última (".$total_paginas.")</span>
						</a>
					</li>";
			endif;
			$html .= "</ul>
				</nav>
				<script type='text/javascript'>
					// ao selecionar uma option envia a pagina escolhida via get
					$('select[name=paginas]').change(function() {
						var pagina = $('option:selected').val();
						setTimeout(\"window.location='\"+pagina+\"'\",0);
					});
				</script>";
		endif;

		// retorna lista e html da paginacao
		return ["lista"=>$lista,
				"paginacao"=>$html];
	}

	$sql = "SELECT * FROM jogadores";
	$lista = listar($_pdo,$sql);

	
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<title>Paginação</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="js/jquery-3.1.1.min.js"></script>
</head>
<body>
	<div class="container"><!-- container -->
		<table class="table">
			<thead>
				<th>Jogador</th>
				<th>Posição</th>
				<th>Pé</th>
			</thead>
			<tbody>
			<?php foreach($lista["lista"] as $jogador):
					print "	<tr>
								<td>".$jogador['nome']."</td>
								<td>".$jogador['posicao']."</td>
								<td>".$jogador['pe']."</td>
							</tr>";
				endforeach; ?>
			</tbody>
		</table>
		<?=$lista["paginacao"]?>
		
	</div><!-- fim container -->
</body>
</html>