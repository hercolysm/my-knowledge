<!DOCTYPE html>
<html lang="pt-br">
	<head>
		<meta charset="utf-8">
		<title>Upload de arquivos</title>
	</head>
	<body>
		<h1>Carregar a foto</h1>
		<form method="POST" action="upload_imagem.php" enctype="multipart/form-data">
			<label for="arquivo">Imagem: </label><br>
			<input name="arquivo" type="file"><br><br>
			<input type="submit" value="Enviar">
		</form>
		<?php 
			if (!empty($_FILES)) {

				$arquivo = $_FILES['arquivo']['name'];
				
				// Pasta onde o arquivo vai ser salvo
				$_UP['pasta'] = 'imagens/';
				
				// Tamanho máximo do arquivo em Bytes
				$_UP['tamanho'] = 1024*1024*100; //5mb
				
				// Array com a extensões permitidas
				$_UP['extensoes'] = array('png', 'jpg', 'jpeg', 'gif');
				
				// Renomeiar
				$_UP['renomeia'] = false;
				
				// Array com os tipos de erros de upload do PHP
				$_UP['erros'][0] = 'Não houve erro';
				$_UP['erros'][1] = 'O arquivo no upload é maior que o limite do PHP';
				$_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especificado no HTML';
				$_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente';
				$_UP['erros'][4] = 'Não foi feito o upload do arquivo';
				
				// Verifica se houve algum erro com o upload. Sem sim, exibe a mensagem do erro
				if ($_FILES['arquivo']['error'] != 0) {
					die("Não foi possivel fazer o upload, erro: <br />". $_UP['erros'][$_FILES['arquivo']['error']]);
					exit; //Para a execução do script
				}
				
				// Faz a verificação da extensao do arquivo
				@$extensao = strtolower(end(explode('.', $arquivo)));
				if (array_search($extensao, $_UP['extensoes']) === false) {
					echo "<p>A imagem não foi cadastrada extesão inválida.</p>";
				}
				
				// Faz a verificação do tamanho do arquivo
				else if ($_UP['tamanho'] < $_FILES['arquivo']['size']) {
					echo "<p>Arquivo muito grande.</p>";
				}
				
				// O arquivo passou em todas as verificações, hora de tentar move-lo para a pasta foto
				else{
					// Primeiro verifica se deve trocar o nome do arquivo
					if ($_UP['renomeia'] == true) {
						// Cria um nome baseado no UNIX TIMESTAMP atual e com extensão .jpg
						$nome_final = time().'.jpg';
					}else{
						// Mantem o nome original do arquivo
						$nome_final = $_FILES['arquivo']['name'];
					}
					// Verificar se é possivel mover o arquivo para a pasta escolhida
					if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $_UP['pasta']. $nome_final)) {
						// Upload efetuado com sucesso, exibe a mensagem
						echo "<p>Imagem cadastrada com Sucesso.</p>";
					}else{
						// Upload não efetuado com sucesso, exibe a mensagem
						echo "<p>Imagem não foi cadastrada com Sucesso.</p>";
					}
				}
			}		
		?>
	</body>
</html>
