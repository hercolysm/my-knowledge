# Python 2.7.16
# 
# Programacao orientada a objetos

# exemplo classe simmples
class Cliente():

    def __init__(self, nome, telefone):
        self.nome = nome
        self.telefone = telefone
    
    def obterNome(self):
        return self.nome
    
    def obterTelefone(self):
        return self.telefone

# exemplo superclasse (classe pai)
class Conta(object):

    # construtor
    def __init__(self, cliente, conta):
        self.cliente = cliente
        self.conta = conta
        self.deposito = 0
        self.saque = 0
        print "Abrindo nova conta..."
        print "Cliente:", cliente.obterNome()
        print "Telefone:", cliente.obterTelefone()
    
    def obterConta(self):
        return self.conta

    def obterDeposito(self):
        return self.deposito

    def obterSaque(self):
        return self.saque

    def obterSaldo(self):
        return self.deposito - self.saque

    def obterDisponivel(self):
        return self.deposito - self.saque

    def sacar(self, valor):
        if valor <= self.obterDisponivel():
            print "Operacao de saque aceita: realizando saque no valor de R$", valor
            self.saque = self.saque + valor
        else:
            print "Operacao de saque negada: valor solicitado ultrapassa saldo disponivel"

    def depositar(self, valor):
        print "Operacao de deposito aceita: realizando deposito no valor de R$", valor
        self.deposito = self.deposito + valor     

    def extrato(self):
        extrato = "Extrato CC No " + str(self.obterConta())
        extrato += "\n\n"
        extrato += "{0:>15}".format("Deposito: ") + "{0:>10}".format(str(self.obterDeposito()))
        extrato += "\n"
        extrato += "{0:>15}".format("Saque: ") + "{0:>10}".format(str(self.obterSaque()))
        extrato += "\n\n"
        extrato += "{0:>15}".format("Saldo: ") + "{0:>10}".format(str(self.obterSaldo()))
        extrato += "\n\n"
        extrato += "{0:>15}".format("Disponivel: ") + "{0:>10}".format(str(self.obterDisponivel()))
        extrato += "\n\n"
        return extrato

# exemplo subclasse (classe filha)
class ContaEspecial(Conta):
  
    # contrutor  
    def __init__(self, cliente, conta, limite):
        # heranca de atributos da classe pai
        super(ContaEspecial, self).__init__(cliente, conta)
        self.limite = limite

    def obterLimite(self):
        return self.limite

    # sobrescrevendo metedo da classe pai
    def obterDisponivel(self):
        return self.deposito - self.saque + self.limite

    # sobrescrevendo metedo da classe pai
    def extrato(self):
        extrato = "Extrato CC No " + str(self.obterConta())
        extrato += "\n\n"
        extrato += "{0:>15}".format("Deposito: ") + "{0:>10}".format(str(self.obterDeposito()))
        extrato += "\n"
        extrato += "{0:>15}".format("Saque: ") + "{0:>10}".format(str(self.obterSaque()))
        extrato += "\n\n"
        extrato += "{0:>15}".format("Saldo: ") + "{0:>10}".format(str(self.obterSaldo()))
        extrato += "\n\n"
        extrato += "{0:>15}".format("Limite: ") + "{0:>10}".format(str(self.obterLimite()))
        extrato += "\n\n"
        extrato += "{0:>15}".format("Disponivel: ") + "{0:>10}".format(str(self.obterDisponivel()))
        extrato += "\n\n"
        return extrato

#informacoes do cliente
nome = "Fco Antonio"
telefone = "(85) 98899-0011"

# informacoes da conta
num_conta = 23808;
limite = 1000;
deposito = 5000;
saque = 6000;

cliente = Cliente(nome, telefone)

conta = Conta(cliente, num_conta)
conta.depositar(deposito)
conta.sacar(saque)
print conta.extrato()

conta_especial = ContaEspecial(cliente, num_conta, limite)
conta_especial.depositar(deposito)
conta_especial.sacar(saque)
print conta_especial.extrato()
