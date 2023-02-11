#!/bin/bash

#servidor:
#eth0: 192.168.1.101 - WAN
#eth1: 192.168.200.1 - LAN

#cliente:
#eth0: 192.168.200.1

#Queria fazer o cliente conectar por ssh no #servidor, segue abaixo meu script.

# define variáveis
ipt="/usr/sbin/iptables"
mod="/usr/sbin/modprobe"
LAN_IFACE="virbr0"
WAN_IFACE="enp0s3"
echo "lendo as variaveis"

# habilita o roteamento
echo 1 > /proc/sys/net/ipv4/ip_forward

# subindo modulos
$mod ip_tables
$mod ip_conntrack
$mod iptable_nat
$mod iptable_filter
$mod iptable_mangle
$mod ipt_LOG
$mod ipt_limit
$mod ipt_state
$mod ipt_MASQUERADE
echo "subindo os modulos"

# limpando as regras do $ipt
$ipt -F
$ipt -t nat -F
$ipt -t mangle -F
$ipt -X
$ipt -t nat -X
$ipt -t mangle -X
echo "zerando as regras"

# setando politicas default
$ipt -P INPUT DROP
$ipt -P FORWARD ACCEPT
$ipt -P OUTPUT ACCEPT
$ipt -t nat -P OUTPUT ACCEPT
$ipt -t nat -P PREROUTING ACCEPT
$ipt -t nat -P POSTROUTING ACCEPT
$ipt -t mangle -P PREROUTING ACCEPT
$ipt -t mangle -P POSTROUTING ACCEPT
echo "definindo a politica padrao"

# libera acesso para loopback
$ipt -A INPUT -i lo -j ACCEPT

# habilita o MASQUERADE
$ipt -t nat -A POSTROUTING -s 192.168.122.0/24 -o $WAN_IFACE -j MASQUERADE
echo "habilita o roteamento"

# libera conexoes estabelecidas
$ipt -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
$ipt -A FORWARD -i $WAN_IFACE -o $LAN_IFACE -m state --state ESTABLISHED,RELATED -j ACCEPT
$ipt -A FORWARD -i $LAN_IFACE -o $WAN_IFACE -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT

# aceita mensagens importantes do icmp
$ipt -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
$ipt -A INPUT -p icmp --icmp-type time-exceeded -j ACCEPT
$ipt -A INPUT -p icmp --icmp-type destination-unreachable -j ACCEPT
echo "liberando ping"

# rejeita conexões que não foram iniciadas na LAN
#$ipt -A INPUT -p tcp --syn -j DROP

### Liberando acesso a serviços
# SSH
$ipt -A INPUT -p tcp -i $WAN_IFACE --dport 22 -m state --state NEW -j ACCEPT

echo "criando regras"


#Deixando a INPUT como DROP não consegui fazer funcionar, testei várias regras, várias coisas, deixando a INPUT como ACCEPT dai funciona.

#Se alguém souber o que estou fazendo de errado eu agradeço.
