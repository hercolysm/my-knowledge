<?php class Administrador_Controller extends Lb_Controllers{

	public function detalhesPorCampanha(){
		if ($this->_GET("id_campanha")) {
			$id_campanha = $this->_GET("id_campanha");

			$consulta = $this->_pdo->query("SELECT count(id_empresa) AS total FROM lis_empresa_campanha WHERE id_campanha='$id_campanha'")->fetch(PDO::FETCH_ASSOC);
			$total = $consulta['total'];

			$this->paginacao = self::paginacao($total);

			$this->LisEmpresasCampanhas = new LisEmpresaCampanha_Base();
			$this->lista_empresas = $this->LisEmpresasCampanhas->fetch("id_campanha=$id_campanha ".$this->paginacao['limit']);
			$this->lista_cnpj;
		}
		$this->no_layout();
	}

	public static function paginacao($total,$linhas_por_pagina = 30,$paginas_por_bloco = 10){

		$lb_controller = new Lb_Controllers();

        // Total de paginas possíveis
		$total_paginas  = ceil($total / $linhas_por_pagina);
        // Total de blocos possíveis
		$total_blocos = ceil($total_paginas / $paginas_por_bloco);
        // Página atual
		$pagina = $lb_controller->_GET("lispg") ? $lb_controller->_GET("lispg") : 1;



		list($inicio,$fim) = self::paginacao_range($pagina,$paginas_por_bloco);
		$pagination = null;

		$pagination.= '<ul class="pagination">';
		$pagination.= '<li>';
		$_GET['lispg'] = 1;
		$pagination.='<a href="'.$lb_controller->url($_GET).'">Primeira</a>';
		$pagination.= '</li>';
		if($pagina!=1):

			if($inicio != 1):
				$pagination.= '<li>';
				$_GET['lispg'] = $inicio -1;
				$pagination.= '<a href="'.$lb_controller->url($_GET).'"><i class="fa fa-angle-double-left"></i></a>';
				$pagination.= '</li>';  
			endif;

			$pagination.= '<li>';
			$_GET['lispg'] = $pagina-1;
			$pagination.= '<a href="'.$lb_controller->url($_GET).'"><i class="fa fa-angle-left"></i></a>';
			$pagination.= '</li>';  

		endif;


		for($i=$inicio;$i<=$fim;$i++){
			$active = $pagina == $i  ? 'active' : null;
			if($i <= $total_paginas){
				$pagination.= '<li class="'.$active.'">';
				$_GET['lispg'] = $i;
				$pagination.= '<a href="'.$lb_controller->url($_GET).'">'.$i.'</a>';
				$pagination.= '</li>';  
			}else{
				$fim = $i - 1;
				break;
			}
		}


		if($pagina!=$total_paginas):
			$pagination.= '<li>';
			$_GET['lispg'] = $pagina+1;
			$pagination.= '<a href="'.$lb_controller->url($_GET).'"><i class="fa fa-angle-right"></i></a>';
			$pagination.= '</li>';

			if($fim != $total_paginas){
				$pagination.= '<li>';
				$_GET['lispg'] = $i;
				$pagination.= '<a href="'.$lb_controller->url($_GET).'"><i class="fa fa-angle-double-right"></i></a>';
				$pagination.= '</li>';
			}

			$pagination.= '<li>';
			$_GET['lispg'] = $total_paginas;
			$pagination.='<a href="'.$lb_controller->url($_GET).'">Última</a>';
			$pagination.= '</li>';

		endif;

		$pagination.= '</ul>';


		$inicio_limit = "LIMIT ".( ($pagina * $linhas_por_pagina) - $linhas_por_pagina).",".$linhas_por_pagina;

		return [
		"limit"=>$inicio_limit,
		"html"=>$pagination
		];
	}

	private static function paginacao_range($pagina,$paginas_por_bloco = 10){
		if($pagina <= $paginas_por_bloco){
			return [1,$paginas_por_bloco];
		}
		else{
			for($i= $pagina-1;$i>=$paginas_por_bloco;$i--){
				if($i % $paginas_por_bloco == 0){
					$inicio = $i+1;
					break;
				}
			}
			$i = $pagina +1;
			while(true){
				if($i % $paginas_por_bloco == 0){
					$fim = $i;
					break;
				}
				$i++;
			}
			return [$inicio,$fim];
		}
	}

} ?>