# Bot Framework SDK - Documentação

## O que é Bot Framework SDK?

O **Microsoft Bot Framework SDK** é uma coleção de bibliotecas, ferramentas e serviços que permite construir, testar, implementar e gerenciar bots inteligentes. É um framework modular e extensível que facilita a criação de bots capazes de usar fala, compreender linguagem natural, responder perguntas e muito mais.

## Para que Serve?

### Propósito Principal
- **Automatizar tarefas repetitivas**: tarefas simples como fazer reservas, coletar informações de perfil, etc.
- **Comunicação conversacional**: criar experiências que parecem com conversas humanas ao invés de interações com computadores
- **Integração multi-canal**: conectar um único bot a múltiplas plataformas (Facebook, Slack, Teams, Telegram, SMS, etc.)

### Casos de Uso
- Chatbots de atendimento ao cliente
- Bots de recursos humanos (onboarding, FAQ)
- Assistentes virtuais
- Bots em redes sociais e aplicativos de mensagens
- Automação de processos conversacionais

## Como Funciona?

### Arquitetura Básica

Um bot é essencialmente uma **aplicação web** com uma interface conversacional que:

1. **Recebe input do usuário** através de um canal (texto, voz, imagens ou vídeo)
2. **Processa a entrada** para interpretar o que o usuário pediu ou disse
3. **Realiza tarefas relevantes**:
   - Faz perguntas adicionais
   - Acessa serviços em nome do usuário
   - Consulta bancos de dados
4. **Responde ao usuário** sobre o que o bot está fazendo ou já fez

### Componentes Principais

| Componente | Descrição |
|-----------|-----------|
| **Bot Framework SDKs** | Bibliotecas para desenvolvimento em C#, JavaScript, Python ou Java |
| **Bot Connector Service** | Retransmite mensagens e eventos entre bots e canais |
| **Canais** | Integrações com plataformas (Teams, Facebook, Slack, Telegram, etc.) |
| **Azure AI Bot Service** | Serviço Azure para gerenciamento e configuração do bot |
| **CLI Tools** | Ferramentas de linha de comando para desenvolvimento |

### Ciclo de Vida do Bot

#### 1. **Plan (Planejamento)**
- Entender objetivos, processos e necessidades dos usuários
- Revisar diretrizes de design
- Definir capacidades (speech, NLU, Q&A)

#### 2. **Build (Construção)**
- Criar bot como serviço web hospedado (geralmente em Azure)
- Usar SDK escolhido (C#, JavaScript, Python, Java)
- Configurar envio/recebimento de mensagens e eventos
- Integrar com serviços complementares (Azure AI, Storage, etc.)

#### 3. **Test (Testes)**
- **Bot Framework Emulator**: teste local com interface de chat e ferramentas de debug
- **Web Chat**: interface web após configuração no portal Azure
- **Unit Tests**: testes automatizados com Bot Framework SDK

#### 4. **Publish (Publicação)**
- Deploy do bot em Azure ou servidor próprio
- Bot fica disponível na internet

#### 5. **Connect (Conexão)**
- Conectar bot a canais (Facebook, Teams, Slack, etc.)
- Bot Framework normaliza mensagens de diferentes plataformas
- Recebe um fluxo unificado de mensagens

#### 6. **Evaluate (Avaliação)**
- Coletar dados via portal Azure
- Análise de tráfego, latência, integrações
- Relatórios de conversas (usuários, mensagens, canais)

## Fluxo de Mensagens

```
Usuário → Canal → Bot Connector Service → Bot Application
                                              ↓
                                         Processamento
                                         (NLU, APIs, BD)
                                              ↓
Bot Application → Bot Connector Service → Canal → Usuário
```

## Funcionalidades Principais Suportadas

| Funcionalidade | Descrição |
|---------------|-----------|
| **Memory & Storage** | Persistir estado de usuário e conversa |
| **NLU (Natural Language Understanding)** | Interpretar e extrair informações do input |
| **Rich Cards** | Combinar texto com mídia (imagens, áudio, vídeo, botões) |
| **Integração com Azure AI** | Usar serviços de IA (fala, visão, etc.) |
| **Canais Múltiplos** | Conectar a várias plataformas simultaneamente |

## Linguagens Suportadas

- **C#** ✓
- **JavaScript/TypeScript** ✓
- **Python** ✓
- **Java** (suporte retirado - fim em novembro 2023)

## Ferramentas Complementares

### Bot Framework Emulator
- App stand-alone para teste local
- Interface de chat integrada
- Ferramentas de debug e interrogação
- Visualiza como o bot funciona

### Bot Framework CLI
- Ferramentas de linha de comando
- Gerenciamento de assets do bot
- Criação e testes automatizados

### Web Chat
- Interface web para teste
- Acesso sem código disponível
- Ótimo para testers e usuários finais

## Status Atual (2026)

⚠️ **IMPORTANTE**: Bot Framework SDK foi arquivado e não recebe mais atualizações. Suporte encerrado em 31 de dezembro de 2025.

### Alternativas Recomendadas
- **Microsoft 365 Agents SDK**: para agentes com orquestração e conhecimento próprio
- **Teams SDK (Teams AI Library)**: para agentes colaborativos em Microsoft Teams
- **Microsoft Copilot Studio**: plataforma SaaS baseada em agentes

## Exemplo Básico de Fluxo

```
1. Usuário: "Quero fazer uma reserva"
   ↓
2. Bot recebe via channel (Teams, Slack, etc.)
   ↓
3. Bot processa com NLU
   ↓
4. Bot identifica intenção: "reserva"
   ↓
5. Bot pergunta: "Para qual data e horário?"
   ↓
6. Usuário responde
   ↓
7. Bot acessa banco de dados/API
   ↓
8. Bot confirma: "Reserva criada para [data/horário]"
   ↓
9. Mensagem retorna ao usuário via mesmo channel
```

## Integração com Projeto Fleury

Conforme observado no workspace, o Bot Framework é utilizado no projeto Fleury para:
- Integração com **Omnichannel**
- Comunicação com **Azure** (Direct Line API)
- Serviços como **Fleury_Inlab_Integration** e **Fleury_Movel_Integration**
- Comunicação via **WebChat**

## Referências Úteis

- [Microsoft Learn - Bot Framework Documentation](https://learn.microsoft.com/en-us/azure/bot-service/)
- [GitHub Bot Framework Samples](https://github.com/microsoft/botbuilder-samples)
- [Bot Framework Design Guidelines](https://learn.microsoft.com/en-us/azure/bot-service/bot-service-design-principles)
