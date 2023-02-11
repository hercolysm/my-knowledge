// Desafio plano cartesiano

/**

O plano cartesiano é feito por uma quantidade indeterminada de pontos. Ele é composto por quatro quadrantes como mostra a imagem abaixo. Desenvolva um programa que, dada as coordenadas de entrada (x, y), verifique em qual quadrante está situado o ponto.

Definição e Exercícios de Plano Cartesiano - Toda Matéria

Caso uma das coordenadas seja NULA, o programa deve parar.

Entrada
As entradas serão 2 valores inteiros.

Saída
Para cada caso de teste mostre em qual quadrante do sistema cartesiano se encontra a coordenada lida, conforme o exemplo.
 
Exemplo de Entrada	Exemplo de Saída
2 2
3 -2
-8 -1
-7 1
0 2

primeiro
quarto
terceiro
segundo

**/

// Para ler e escrever dados em C#, utilizamos os seguintes métodos da classe Console: 
// - Console.ReadLine: lê UMA linha com dado(s) de Entrada (Inputs) do usuário;
// - Console.WriteLine: imprime um texto de Saída (Output) e pulando uma linha. 
// - .Split(' '): separa as entradas em um array.

using System; 

class Program {
    public static void Main()
    {
        int X, Y;

        while (true)
        {
            string[] s = Console.ReadLine().Split(' ');
            X = int.Parse(s[0]);
            Y = int.Parse(s[1]);

            //TODO: Crie as condições para satisfazer o 
            string quadrante = "";
            
            if (X > 0) {
              if (Y > 0) {
                quadrante = "primeiro";
              }
              else {
                quadrante = "quarto";
              }
            }
            else {
              if (Y > 0) {
                quadrante = "segundo";
              }
              else {
                quadrante = "terceiro";
              }
            }
            
            if (X == 0 || Y == 0) {
              break;
            }
            
            Console.WriteLine(quadrante);
        }    
    }
}