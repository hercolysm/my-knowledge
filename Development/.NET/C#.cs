/* Types */
string String = "Texto";
decimal Decimal = 1.99M;
double Double = 1.99;
float Float = 1.99F;
bool Bool = true || false;
short Short = 9999;
int Int = 999999999;
long Long = 999999999999999999; 
DateTime Datetime = new DateTime();

string String1, String2 = "";
int Int1, Int2 = 0;

/* Undefined types */
var StringVar = "";
var DecimalVar = 1.5M;
var DoubleVar = 1.5;
var FloatVar = 1.5F;
var BooleanVar = true || false;
var DateTimeVar = new DateTime();
var ObjectVar = new object();

var AnonymousType = new { StringProp = "", IntProp = 123 , DoubleProp = 12.5 };
Console.WriteLine(AnonymousType.StringProp);
Console.WriteLine(AnonymousType.IntProp);
Console.WriteLine(AnonymousType.DoubleProp);

dynamic DynamicVar = "";
DynamicVar = 1.5M;
DynamicVar = 1.5;
DynamicVar = 1.5F;
DynamicVar = true || false;
DynamicVar = new DateTime();
DynamicVar = new object();
Console.WriteLine($"{DynamicVar.GetType()}");

// Especial types
bool Bool1 = false; //true,false 
bool? Bool2 = null; //true,false,null 

if (Bool2.HasValue) // Bool2 != null
{
    if (Bool2.Value)
    {
        // true
    }
    else {
        // false
    }
}
else {
    // null
}

// Implicit Cast (int => double)
int a = 1;
double b = a;

// Implicit Cast (int => long)
int int1 = int.MaxValue;
long long1 = int1;

// Cast To String 
string string1 = 1.ToString();
string string2 = 2.5M.ToString();

int number;
number = int.Parse("1"); // 1
number = int.Parse(null); // erro
number = int.Parse("texto"); // erro

number = Convert.ToInt32("1"); // 1
number = Convert.ToInt32(null); // 0
number = Convert.ToInt32("texto"); // erro

int.TryParse("1", out int newInt); // 1
int.TryParse(null, out int newInt); // 0
int.TryParse("texto", out int newInt); // 0

/* Assignment operators */
int number = 1;
Console.WriteLine(number); // 1
Console.WriteLine(number++); // 1
Console.WriteLine(++number); // 3
Console.WriteLine(number--); // 3
Console.WriteLine(--number); // 1
Console.WriteLine(number += 1); // 1+1=2
Console.WriteLine(number =+ 1); // =1

// Arithmetic Operators
int soma = 2 + 1; // 3
int subtracao = 2 - 1; // 1
int multiplicacao = 2 * 1; // 2
int divisao = 2 / 1; // 2
int modulo = 2 % 1; // 0

// Order of operators 
/*
    1° ()
    2° expoente
    3° / e *  
    4º + e - 
*/
double c = 4 / 2 + 2; // 4

double d = 4 / (2 + 2); // 1

/* Logic operator */

// AND
if (true & true) {}
if (true && true) {} // recommended

// OR
if (true | true) {}
if (true || true) {} // recommended

// NOT 
if (!true) {}

// EQUAL
if (true == true) {} 

// DIFERENTE
if (true != true) {}

/* Conditional operators */
if (false) 
{

}
else if (true) 
{

}
else 
{

}

bool ifTernario= (true) ? true : false;

// Loops

// for
for (var i = 0; i < 10; i++) 
{
    Console.WriteLine(i);
}

// while
int cont = 0;
while (cont < 10)
{
    Console.WriteLine(cont++);
}

// do - while
int cont2 = 0;
do
{
    Console.WriteLine(cont2++);
} while (cont2 < 10);

// foreach
int[] numbers = {0,1,2,3,4,5,6,7,8,9};
foreach (int numberX in numbers) 
{
    Console.WriteLine(numberX);
}

// try - catch
try 
{

}
catch (Exception e) 
{

}
finally 
{

}

// using (with scope)
using (object obj = new object()) 
{
    obj.Method();
}

// using (without scope)
using object obj = new object();
obj.Method();
