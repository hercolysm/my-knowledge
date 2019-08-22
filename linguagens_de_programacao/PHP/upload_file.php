<?php
/**
* Importacao
* @author Hercolys Moraes <hercolys@fortics.com.br>
* @access index.php?go=importacao
*/
class Importacao_Controller extends Lb_Controllers{

	public function init(){
		$this->no_layout();
	}

	public function index(){
		exit();
	}

	public function jogadores(){
		define(COLUNAS, 8);
	}

	public function importar_arquivo(){

		$destino = "/var/www/html/jogo_na_praia/uploads/";

		$nome_original = $_FILES["file"]["name"]; // nome original

		$arquivo_temporario = $_FILES["file"]["tmp_name"]; // caminho/arquivo temporario

		$is_upload = is_uploaded_file($arquivo_temporario); // verifica se arquivo foi enviado por POST HTTP

		$size = $_FILES["file"]["size"]; // tamanho em bytes

		$is_upload_move = move_uploaded_file($arquivo_temporario, $destino.basename($nome_original));
		if($is_upload_move !== false):
			print "Movido com sucesso!";
		else:
			print "Error ao mover arquivo!";
			//print_r(error_get_last());
		endif;

		// abre arquivo
		$file = fopen($arquivo_temporario, "r") or die ("Unable to open file!");
		// enquanto nao chegar no fim do arquivo
		while (!feof($file)):
			$linha = fgets($file);
			//print $linha."\n";
		endwhile;
		// fecha arquivo
		fclose($file);

		//
		if (file_exists($_FILES['file']['tmp_name'])):
			$file = file($_FILES['file']['tmp_name']);
			if (is_array($file)): 
				foreach ($file as $acesso): 
					// verifica se acesso ja existi na lista
					if (in_array(trim($acesso), $acessos_inseridos)): 
						continue;
					else: 
						$PDO->query("INSERT INTO lis_acessos_parametrizar(token,id_empresa,acesso) VALUES('$preToken','$id_empresa','$acesso')");
						array_push($acessos_inseridos, $acesso);
					endif;
				endforeach;
			endif;
		endif;
		exit();
	}
}
?>