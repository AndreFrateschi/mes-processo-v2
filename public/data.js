window.MES_DATA = {
  settings: {
    planningLabel: "PCP",
    planningAlternative: "PCPM",
    mesColor: "#2C2CFE",
    progressColor: "#00D394",
    programProgress: 68,
    preliminaryNote: "Conteúdo preliminar — validar com Product Owner"
  },
  program: {
    title: "Programa MES Yamaha",
    tagline: "Da ordem de produção à execução na fábrica.",
    concept: "Da ordem de produção à montagem final.",
    mainText: "O PCP define o plano. O MES coordena a execução, a automação conecta as linhas de produção e o realizado retorna para novas decisões.",
    message: "O programa iniciou sua evolução pela automação e agora amplia sua atuação para conectar planejamento, execução e gestão de ponta a ponta.",
    timeline: [
      "Início pela automação", "Gestão de Linha e monitoramento", "ANDON e visibilidade operacional",
      "Integrações PLC · IHM → DDC", "Expansão para planejamento e PCP", "Visão completa do MES", "Próximas evoluções"
    ]
  },
  stages: {
    source: {
      order: 1, category: "Origem", shortTitle: "Pymac / futuro SAP", cardTitle: "Pymac / SAP", subtitle: "Demanda, ordens e dados mestres", progress: 72,
      purpose: "Originar a ordem de produção e disponibilizar os dados mestres que alimentam o planejamento e a jornada completa do MES.",
      mesRelation: "É o ponto de nascimento da informação produtiva, garantindo que produto, modelo e ordem cheguem de forma confiável ao planejamento.",
      objectives: [
        ["Originação da ordem de produção", "Gerar e disponibilizar ordens produtivas para o planejamento.", "done", 100, ["Ordens", "Demanda"], "Consolidar regras de integração", "A definir"],
        ["Dados mestres", "Disponibilizar modelos, produtos e parâmetros produtivos.", "evolving", 75, ["Modelos", "Produtos", "Parâmetros"], "Validar cobertura com PO", "A definir"],
        ["Integração com planejamento", "Enviar informações consistentes para PCP/PCPM.", "evolving", 65, ["Interface Pymac", "Plano"], "Mapear exceções", "A definir"],
        ["Evolução futura para SAP", "Preparar a transição futura mantendo continuidade operacional.", "planned", 20, ["Roadmap SAP"], "Definir arquitetura-alvo", "A definir"]
      ]
    },
    pcp: {
      order: 2, category: "Planejamento", shortTitle: "PCP / PCPM", cardTitle: "PCP", subtitle: "Plano, sequência e decisões", progress: 55,
      purpose: "Construir o plano de produção e decidir sequência, mix, balanceamento e replanejamento respeitando a janela congelada.",
      mesRelation: "Conecta a intenção produtiva à execução real e utiliza o retorno da fábrica para orientar novas decisões.",
      objectives: [
        ["Plano de produção", "Construir e liberar o plano que orienta a execução.", "evolving", 70, ["Plano", "Capacidade"], "Validar nomenclatura PCP/PCPM", "A definir"],
        ["Sequenciamento e balanceamento", "Apoiar mix, cores e sequência com APS/Balance.", "evolving", 60, ["APS/Balance", "Mix", "Cores"], "Detalhar regras", "A definir"],
        ["Janela congelada", "Manter três dias congelados e replanejar a partir do quarto.", "done", 100, ["3 dias", "Replanejamento"], "Formalizar governança", "A definir"],
        ["Integração com MES", "Enviar plano e receber realizado, paradas e aderência.", "planned", 25, ["Plano × realizado"], "Definir contrato de dados", "A definir"]
      ]
    },
    mes: {
      order: 3, category: "Gestão da execução", shortTitle: "MES", cardTitle: "MES", subtitle: "Coordenação e gestão ponta a ponta", progress: 80,
      purpose: "Coordenar a execução, transformar sinais da fábrica em gestão e conectar planejamento, automação, qualidade e rastreabilidade.",
      mesRelation: "É o núcleo integrador da jornada: recebe o plano, acompanha a execução e devolve informações confiáveis para novas decisões.",
      objectives: [
        ["Visibilidade da execução em tempo real", "Disponibilizar uma visão online da produção, status das linhas, paradas e aderência ao planejamento.", "done", 100, ["Gestão de Linha", "ANDON", "Segundo ANDON", "Monitoramento da execução"], "Consolidar indicadores executivos", "A definir"],
        ["Integração com a automação", "Capturar eventos da fábrica por meio de PLC, IHM e DDC, transformando sinais de máquina em informações para gestão.", "done", 100, ["PLC", "IHM", "DDC", "Liberação de ciclo", "Intertravamento", "Coleta de eventos"], "Expandir cobertura das linhas", "A definir"],
        ["Gestão operacional da linha", "Dar suporte à operação na identificação de perdas, paradas, desvios e produzido versus programado.", "done", 100, ["GL", "ANDON", "Monitoramento ABS", "Apontamentos de produção"], "Aprimorar análise de perdas", "A definir"],
        ["Integração com planejamento e PCP", "Conectar o plano de produção à execução, permitindo acompanhar sequência, aderência e necessidade de replanejamento.", "evolving", 55, ["Integração com PCP/PCPM", "Plano de produção", "Sequenciamento", "APS/Balance", "Janela congelada de três dias"], "Validar processo ponta a ponta", "A definir"],
        ["Qualidade e rastreabilidade", "Conectar os eventos de produção aos dados de qualidade e rastreabilidade, permitindo uma visão integrada do produto e do processo.", "evolving", 45, ["Qualidade", "Inspeções", "Rastreabilidade", "Histórico produtivo"], "Definir dados prioritários", "A definir"]
      ]
    },
    automation: {
      order: 4, category: "Automação", shortTitle: "Automação", cardTitle: "PLC · IHM → DDC", subtitle: "Sinais, ações e coleta", progress: 88,
      purpose: "Detectar eventos, permitir ações operacionais e disponibilizar dados confiáveis das linhas para o MES.",
      mesRelation: "Foi o ponto de partida do programa e permanece como a camada que conecta máquinas e operação à gestão integrada.",
      objectives: [
        ["Captura via PLC", "Detectar eventos e sinais relevantes da produção.", "done", 100, ["PLC", "Sensores"], "Expandir padronização", "A definir"],
        ["Ações via IHM", "Permitir liberação de ciclos e ações operacionais controladas.", "done", 100, ["IHM", "Ciclos"], "Revisar experiência operacional", "A definir"],
        ["Coleta via DDC", "Coletar e disponibilizar sinais para o MES.", "done", 100, ["DDC", "Eventos"], "Ampliar cobertura", "A definir"],
        ["Intertravamento e ABS", "Apoiar segurança operacional e monitoramento ABS.", "evolving", 70, ["Intertravamento", "ABS"], "Validar escopo futuro", "A definir"],
        ["Integração de todas as linhas", "Conectar as linhas de produção à visão completa do MES.", "evolving", 68, ["Linhas", "MES"], "Planejar ondas de expansão", "A definir"]
      ]
    },
    line: {
      order: 5, category: "Execução", shortTitle: "Linhas de produção / montagem final", cardTitle: "Linhas de produção", subtitle: "Produzir, registrar e apontar", progress: 62,
      purpose: "Executar as ordens de produção e registrar o realizado, paradas, qualidade e aderência até a montagem final.",
      mesRelation: "É onde plano, pessoas, máquinas e produto se encontram; o realizado retorna ao MES e ao planejamento para novas decisões.",
      objectives: [
        ["Execução das ordens", "Executar a sequência liberada para cada linha.", "done", 100, ["Ordens", "Sequência"], "Validar aderência", "A definir"],
        ["Operador, máquina e posto", "Associar recursos e contexto da execução.", "evolving", 60, ["Operador", "Máquina", "Posto"], "Detalhar rastreabilidade", "A definir"],
        ["Produção e paradas", "Registrar produção realizada e motivos de parada.", "evolving", 70, ["Produção", "Paradas"], "Padronizar apontamentos", "A definir"],
        ["Qualidade", "Integrar inspeções e eventos de qualidade.", "planned", 30, ["Inspeções", "Desvios"], "Definir escopo com Qualidade", "A definir"],
        ["Retorno do realizado", "Disponibilizar produzido versus programado para novas decisões.", "evolving", 50, ["Realizado", "Aderência"], "Conectar ao PCP/PCPM", "A definir"]
      ]
    }
  }
};

Object.values(window.MES_DATA.stages).forEach(stage => {
  stage.objectives = stage.objectives.map((item, index) => ({
    id: index + 1, name: item[0], description: item[1], status: item[2], progress: item[3],
    deliveries: item[4], nextStep: item[5], owner: item[6], preliminary: true
  }));
});
