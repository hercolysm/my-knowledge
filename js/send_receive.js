$(document).ready(function(){
	$(document).on('click',".send_receive",function(){
			var target = $(this).attr('data-target');
			
			// Verifica target
			switch(target){
			
				// Caso seja enviar
				case 'next':
					_next($(this));
				break;
				// Caso seja enviar todos
				case 'n_next':
					_nNext($(this));
				break;
				// Caso seja retornar
				case 'return':
					_return($(this));
				break;
				// Retornar todos
				case 'n_return':
					_nReturn($(this));
				break;
			
			}
			// Seleciona todos os permitidos
			selects();
			
		});
                
                
           
		
		// Clicado para enviar ou voltar ramal
		$(document).on('dblclick',".super_send_receive select.send option, .super_send_receive select.receive option",function(){
			// ID
			var id = $(this).parent().attr('data-link');
			// Caso tenha optiongroup
			if(id==undefined)
				id = $(this).parent().parent().attr('data-link')
				
			
			// Se for enviar
			if(id=="send")
				_next($(this));
			// Se for retornar
			else if(id=="receive")
				_return($(this));
			
				
			// Selecionar todos permitidos
			selects();
		})
		
		// Seleciona todos os campos que estão em 
		selects()
		
		
		$("*[data-toggle='tooltip']").tooltip();
		
		
		// Envia para permitidos
		function _next(valor){
			// Os ramais selecionados
			var mSend =valor.closest(".super_send_receive").find("select.send option:selected");
			// Para o campo de ramais permitdos
			var mRece = valor.closest(".super_send_receive").find("select.receive")
			// Envia um por um
			mSend.each(function(){
				// Seleciona atual
				var t = $(this);
				// Pega o value
				var value = t.val();
				// Pega o conteudo
				var texto = t.text();
				
				// Option group
				var data_id = t.attr('data-id');
				
				// Cria um HTML
				var html = '<option value="'+value+'" selected data-id="'+data_id+'">'+texto+'</option>';
				// Remove do atual
				t.remove();
				// Adiciona nos permitidos
				mRece.prepend(html);
			
			})
			
		}
		
		// Enviar todos para permitos
		function _nNext(valor){
			// Campo de permitidos
			var mRece = valor.closest(".super_send_receive").find("select.receive");
			// Le todos os ramis para enviar
			valor.closest(".super_send_receive").find("select.send option").each(function(){
				// Atual
				var t = $(this);
				// Valor
				var value = t.val();
				// Conteudo
				var texto = t.text();
				// Option group
				var data_id = t.attr('data-id');
				// Cria option
				var html = '<option value="'+value+'" selected data-id="'+data_id+'">'+texto+'</option>';
				// Remove do campo de ramais
				t.remove();
				// Adiciona nos permitidos
				mRece.prepend(html);
			})
		}
		
		// Retorna para ramais
		function _return(valor){
			// Os ramais libereados selecionados
			var mSend =valor.closest(".super_send_receive").find("option:selected");
			// Ramais 
			var mRece = valor.closest(".super_send_receive").find("select.send")
			// Lê todos os ramais permitos selecionados
			mSend.each(function(){
				// Atual
				var t = $(this);
				// Valor
				var value = t.val();
				// Conteudo
				var texto = t.text();
				// Option group
				var data_id = t.attr('data-id');
				
				// Cria option
				var html = '<option value="'+value+'" selected data-id="'+data_id+'">'+texto+'</option>';
				
				
				// Remove do atual
				t.remove();				
				// Adiciona nos ramais
				if(data_id==undefined || data_id=="undefined"){
					// Adiciona nos ramais
					mRece.prepend(html);
				}else{
					mRece.find("optgroup[data-id='"+data_id+"']").prepend(html);
				}
			
			})
			
		}

		// Retorna todos para ramais
		function _nReturn(valor){
			
			// Ramais 
			var mRece = valor.closest(".super_send_receive").find("select.send");
			// Lê um por um que permitem
			valor.closest(".super_send_receive").find("select.receive option").each(function(){
				// Atual
				var t = $(this);
				// Valor
				var value = t.val();
				// Conteudo
				var texto = t.text();
				// Optiongroup
				var data_id = t.attr('data-id');
				// Cria option
				var html = '<option value="'+value+'" selected data-id="'+data_id+'">'+texto+'</option>';
				
				// Remove dos liberados
				t.remove();
				
				if(data_id==undefined || data_id=="undefined"){
					// Adiciona nos ramais
					mRece.prepend(html);
				}else{
					mRece.find("optgroup[data-id='"+data_id+"']").prepend(html);
				}
			})
		}
		
		// seleciona todos permitidos
		function selects(){
			
			// Campo de ramais permitidos
			var mSend =$(".super_send_receive select.receive option");
			
			// Lê cada um
			mSend.each(function(){
				// Deixa marcado como selecionado
				$(this).prop('selected',true);
			})
		}
		
});
