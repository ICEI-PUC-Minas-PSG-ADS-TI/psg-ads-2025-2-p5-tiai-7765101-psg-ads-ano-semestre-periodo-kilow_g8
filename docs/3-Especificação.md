# 3. Especificações do Projeto
 
📌 **Pré-requisito:** Planejamento do Projeto (Cronograma e Sprints definidos).
 
Nesta seção serão detalhados:
 
- ✅ Requisitos Funcionais
- ✅ Histórias de Usuário
- ✅ Requisitos Não Funcionais
- ✅ Restrições do Projeto
 
O objetivo é organizar claramente as funcionalidades, qualidades e limites da solução.
 
---
 
# 3.1 Requisitos Funcionais
 
Os **Requisitos Funcionais (RF)** descrevem o que o sistema deve fazer.
 
📌 Cada requisito deve:
- Representar uma funcionalidade única
- Ser claro e objetivo
- Orientar diretamente o desenvolvimento
 
---
 
## Tabela de Requisitos Funcionais
 
| ID    | Descrição do Requisito | Prioridade |
|-------|------------------------|------------|
| RF-01 | O sistema deve permitir que os usuários criem uma conta e realizem login de forma segura. | 🔴 ALTA |
| RF-02 | O sistema deve permitir o cadastro de eletrodomésticos (Nome, Categoria e Tempo de Uso). | 🔴 ALTA |
| RF-03 | O sistema deve permitir a configuração da tarifa de energia (kWh) de acordo com a distribuidora. | 🔴 ALTA |
| RF-04 | O sistema deve calcular automaticamente o consumo mensal em kWh e o custo em Reais (R$). | 🔴 ALTA |
| RF-05 | O sistema deve utilizar IA para estimar a potência de aparelhos baseando-se em descrições simples. | 🟡 MÉDIA |
| RF-06 | O sistema deve gerar comparativos visuais entre o consumo do mês atual e meses anteriores. | 🟡 MÉDIA |
| RF-07 | O sistema deve fornecer uma lista de recomendações de economia baseada no perfil de uso. | 🟡 MÉDIA |
| RF-08 | O sistema deve simular o tempo de retorno financeiro (Payback) ao trocar um aparelho antigo por um novo. | 🟢 BAIXA |
| RF-09 | O sistema deve emitir alertas visuais para aparelhos identificados como "vilões da conta". | 🟢 BAIXA |
| RF-10 | O sistema deve permitir a exportação de relatórios de consumo em formato PDF ou CSV. | 🟢 BAIXA |
 
---
 
# 3.2 Histórias de Usuário
 
**História 1 (relacionada ao RF-01)**
Como usuário doméstico, eu quero criar uma conta e acessar o sistema com segurança, para que meus dados de consumo e aparelhos cadastrados não sejam perdidos e fiquem protegidos.
 
**História 2 (relacionada ao RF-05)**
Como um usuário sem conhecimentos técnicos de eletricidade, eu quero descrever meu aparelho (ex: "geladeira antiga") e deixar que a IA estime o gasto, para que eu não precise procurar etiquetas técnicas ou manuais complexos.
 
**História 3 (relacionada ao RF-08)**
Como um consumidor consciente financeiramente, eu quero simular se vale a pena comprar um aparelho novo com selo Procel A, para que eu saiba em quantos meses a economia na conta de luz pagará o investimento.
 
---
 
# 3.3 Requisitos Não Funcionais
 
## Tabela de Requisitos Não Funcionais
 
| ID      | Descrição do Requisito | Prioridade |
|---------|------------------------|------------|
| RNF-01  | O sistema deve carregar as telas principais e gráficos em até 3 segundos. | 🟡 MÉDIA |
| RNF-02  | O sistema deve proteger os dados do usuário via criptografia e seguir as diretrizes da LGPD. | 🔴 ALTA |
| RNF-03  | A interface deve seguir o padrão visual do Windows (Fluent Design) para garantir usabilidade nativa. | 🟡 MÉDIA |
| RNF-04  | O motor de processamento da IA deve responder às solicitações de diagnóstico em menos de 2 segundos. | 🟡 MÉDIA |
| RNF-05  | O software deve ser capaz de operar o cálculo básico e exibição de dados mesmo em modo offline. | 🟢 BAIXA |
| RNF-06  | O sistema deve garantir uma precisão de cálculo de 99% em relação às fórmulas oficiais da ANEEL. | 🔴 ALTA |
 
---
 
# 3.4 Restrições do Projeto
 
| ID  | Restrição |
|-----|-----------|
| R-01 | O projeto deverá ser entregue até o final do semestre letivo. |
| R-02 | O software deve ser desenvolvido exclusivamente para o sistema operacional Windows 10 e 11. |
| R-03 | O sistema deve estar em total conformidade com a Lei Geral de Proteção de Dados (LGPD). |
| R-04 | O banco de dados utilizado deve ser obrigatoriamente do tipo relacional (SQL). |
| R-05 | O idioma principal e padrão de moeda da interface deve ser Português (Brasil) e Real (R$). |
| R-06 | O software deve exigir conexão com a internet apenas para atualizações de tarifas e funções de IA. |
| R-07 | O tamanho total do instalador do software não deve ultrapassar 500 MB. |
| R-08 | O desenvolvimento deve utilizar bibliotecas e frameworks de código aberto (Open Source). |
 
---
 
# 3.5 Regras de Negócio
 
| ID    | Regra de Negócio |
|-------|------------------|
| RN-01 | Fórmula de Cálculo: (Watts × Horas/Dia × 30) / 1000. |
| RN-02 | Validação: O sistema não deve permitir potências ou tempos de uso menores ou iguais a zero. |
| RN-03 | Tarifa Padrão: Se não informada, aplicar valor médio nacional como "Estimado". |
| RN-04 | Privacidade: Dados de consumo não podem ser acessíveis por outros usuários. |
| RN-05 | Sugestão: Para eletrônicos com uso 24h, sugerir regra de remoção de tomada (standby). |
