<?php
    /**
    * recebe uma conexao, uma sql e o total de linhas(opcional)
    * retorna uma lista e sua paginacao
    **/
    public function listar($_pdo, $sql, $linhas_por_pagina = 3) {
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
        unset($_GET["pagina"]);
        $url = $this->url($_GET);
        $html .= "<center aria-label='navegação das paginas'>
                    <ul class='pagination'>";
            if ($pagina>1):
                $html .= "<li>
                            <a href='".$url."pagina=1' aria-label='Primeira'>
                                <span aria-hidden='true'>Primeira</span>
                            </a>
                        </li>";
                if ($pagina>2):
                    $html .= "<li>
                                <a href='".$url."pagina=".($pagina-1)."'>
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
                $html .= "<option value='pagina=".$pg."' ".$selected.">".$pg."</option>";
            endfor;
        $html .=        "</select>
                    </a>
                </li>";
        if($pagina<$total_paginas):
            if($pagina<$total_paginas-1):
                $html .= "<li>
                            <a href='".$url."pagina=".($pagina+1)."' aria-label='Próximo'>
                                <span aria-hidden='true'>Próxima (".($pagina+1).")</span>
                            </a>
                        </li>";
            endif;
            $html .= "<li>
                        <a href='".$url."pagina=".$total_paginas."' aria-label='Última'>
                            <span aria-hidden='true'>Última (".$total_paginas.")</span>
                        </a>
                    </li>";
            endif;
            $html .= "</ul>
                </center>
                <script type='text/javascript'>
                    // ao selecionar uma option envia a pagina escolhida via get
                    $('select[name=paginas]').change(function() {
                        var pagina = $('option:selected').val();
                        setTimeout(\"window.location='".$url."\"+pagina+\"'\",0);
                    });
                </script>";
        endif;

        // retorna lista e html da paginacao
        return ["lista"=>$lista,
                "paginacao"=>$html];
    }

    $sql = "SELECT * FROM carro";
	$this->lista = $this->listar($this->_pdo,$sql);
?>

	<table class="table table-hover">
			<thead>
				<tr>
					<th>id_carro</th>
					<th>Nome</th>
					<th>Marca</th>
					<th>Modelo</th>
					<th>Valor</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			<?php	if ($this->lista != null) {
						foreach ($this->lista["lista"] as $row) {
						echo "<tr>",
								"<td>".$row['id_carro']."</td>",
								"<td>".$row['nome']."</td>",
								"<td>".$row['marca']."</td>",
								"<td>".$row['modelo']."</td>",
								"<td>".number_format($row['valor'],2,',','.')."</td>",
								"<td><a href='".$this->url(array("action"=>"cadastrar","id_carro"=>$row['id_carro']))."'><span class='glyphicon glyphicon-pencil'></span> editar</a></td>",
								"<td><a href='".$this->url(array("action"=>"deletar","id_carro"=>$row['id_carro']))."'onclick='return confirm(\"Deseja realmente excluir esse registro?\\n\\nid: ".$row['id_carro']."\\nnome: ".$row['nome']."\\n\\nEscolha CANCELAR ou OK\")'><span class='glyphicon glyphicon-trash'></span> excluir</a></td>",
							 "</tr>";
						}
					} else {
						echo "<tr><td>Nenhum registro foi encontrado</td></tr>";
					}
				?>
			</tbody>
		</table>
		<?=$this->lista["paginacao"]?>
?>