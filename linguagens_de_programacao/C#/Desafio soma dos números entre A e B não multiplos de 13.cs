// Desafio soma dos números entre A e B não multiplos de 13

/**

Escreva um algoritmo que leia 2 valores inteiros A e B calcule a soma dos números que não são múltiplos de 13 entre A e B, incluindo ambos.

Entrada
O arquivo de entrada contém 2 valores inteiros quaisquer, não necessariamente em ordem crescente.

Saída
Imprima a soma de todos os valores não divisíveis por 13 entre os dois valores lidos na entrada, inclusive ambos se for o caso.

Exemplo
Exemplo de entrada 	Exemplo de saída 
  100
  200

13954

**/

// Para ler e escrever dados em C#, utilizamos os seguintes métodos da classe Console: 
// - Console.ReadLine: lê UMA linha com dado(s) de Entrada (Inputs) do usuário;
// - Console.WriteLine: imprime um texto de Saída (Output) e pulando uma linha. 

using System; 

class Program {
    public static void Main(){
        int soma = 0;
        int n1 = int.Parse(Console.ReadLine());
        int n2 = int.Parse(Console.ReadLine());
        
        //TODO: Crie as condições necessárias para solucionar o problema;
        int resultado = 0;
        
        do {
          
          if ((n1 % 13) != 0) {
            resultado += n1;
          }
          
          if (n1 < n2) {
            n1++;
          } 
          else if (n1 > n2) {
            n1--;
          }
          
        } while (n1 != n2);
        
        if ((n2 % 13) != 0) {
          resultado += n2;
        }
        
        Console.WriteLine(resultado);
    }
}