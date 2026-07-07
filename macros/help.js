const helpers = [
  {
    script: "/fail",
    description:
      "Rola um d100 automaticamente e acessa o resultao da tabela de falha críticas (Herois de Arton - Tabela 4-6 Falhas críticas).",
  },
  {
    script: "/shoot",
    description:
      "Dispara automaticamente uma arma de fogo/longa distância desde que o usuário possua munição no inventário. Armas de fogo ficam descarregadas.",
  },
  {
    script: "/reload",
    description: "Recarrega uma do usuário arma de fogo.",
  },
  {
    script: "/critical --x y",
    description:
      "Mostra o formulário de acerto crítico, pedindo o tipo de dano e o mofificado para escolher o efeito. x e y são os tipo do dano e modificador (opicionais)",
  },
  {
    script: "/tipo-dano",
    description: "Mostra do valores possíveis para o tipo de dano.",
  },
  {
    script: "/spell-book",
    description: "Mostra as mágias de um usuário..",
  },
  {
    script: "/random-names",
    description: "Cria um gerador de nomes aleatórios por raça.",
  },
];

export function showHelp() {
  const content = helpers
    .map(
      (data) =>
        `<div><span styles="font-weight: bold">${data.script} : </span>${data.description}</div>`
    )
    .join("</br>");
  ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker(),
  });
}
