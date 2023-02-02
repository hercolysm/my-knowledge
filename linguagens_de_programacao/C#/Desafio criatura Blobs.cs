// Desafio criatura Blobs

/**

No planeta Alpha vive a criatura Blobs, que come precisamente 1/2 de seu suprimento de comida disponível todos os dias. Escreva um algoritmo que leia a capacidade inicial de suprimento de comida, e calcule quantos dias passarão antes que Blobs coma todo esse suprimento até restar um quilo ou menos.

Entrada
A primeira linha de entrada contem um único inteiro N (1 ≤ N ≤ 1000), indicando o número de casos de teste. As N linhas seguintes contém um valor de ponto flutuante C (1 ≤ C ≤ 1000) correspondente à quantidade de comida disponível para Blobs.

Saída
Para cada caso de teste, imprima uma linha contendo o número de dias que Blobs irá demorar para comer todo seu suprimento de comida, seguido da palavra "dias".

Exemplo de Entrada	Exemplo de Saída
3
40.0
200.0
300.0

6 dias
8 dias
9 dias

**/

// Para ler e escrever dados em C#, utilizamos os seguintes métodos da classe Console: 
// - Console.ReadLine: lê UMA linha com dado(s) de Entrada (Inputs) do usuário;
// - Console.WriteLine: imprime um texto de Saída (Output) e pulando uma linha.  

using System;

public class Program
{
	public static void Main(){
    int entry = int.Parse(Console.ReadLine());

    //TODO: Crie as condições necessárias para satisfazer o problema;
    //DICA: Utilize um for (int i = 0; i < quantidadeDeEntrada; i++) para verificar e passar por cada entrada
    for (int i = 0; i < entry; i++) {
      decimal food = decimal.Parse(Console.ReadLine());

      int days = 0;
      
      while (food > 1) {
        days++;
        food = food / 2;
      }

      Console.WriteLine(days + " dias");
    }
	}
}