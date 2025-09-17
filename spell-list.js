//Macro to find all spells and show as a list and able the cast

export async function spellBook() {
  //select the token
  const token = canvas.tokens.controlled[0];

  if (!token) {
    ui.notifications.warn("No token selected.");
    return;
  }

  let actor = game.actors.get(token.actor.id);

  const spells = actor.items.filter((item) => item.type === "magia");
  let total = spells.length;
  const memorized = spells.filter((s) => s.system.preparada).length;
  const spellsByNivel = spells.reduce((acc, spell) => {
    if (!acc[spell.system.circulo]) {
      acc[spell.system.circulo] = [spell];
    } else {
      acc[spell.system.circulo] = [...acc[spell.system.circulo], spell];
    }
    return acc;
  }, {});

  // Cria HTML com um botão por magia

  const content =
    `<span>Total Spells: ${total}</span> </br>` +
    `<span>Memorized Spells: ${memorized}</span> </br>` +
    Object.entries(spellsByNivel)
      .map(([key, spellArray]) => {
        const buttons = spellArray
          .sort((a, b) => b.system.preparada - a.system.preparada)
          .map((spell) => {
            return `
      <button class="spell-button" data-spell-id="${
        spell.id
      }" style="width: 100%; margin: 4px 0; padding: 8px; display: flex; align-items: center; gap: 10px;">
      <img src="${
        spell.img
      }" width="32" height="32" style="border: none; flex-shrink: 0;" />
      <span style="flex-grow: 1; text-align: left;">${spell.name}</span>
      ${
        spell.system.preparada
          ? '<span style="color: green; font-size: 16px;flex-shrink: 0">Preparada</span>'
          : ""
      }
      </button>
      `;
          })
          .join("");
        return `<div>
    <h4>Circulo ${key}</h4>
    ${buttons}
    </div>`;
      })
      .join("");

  new Dialog({
    title: `Magias de ${actor.name}`,
    content: `<div>${content}</div>`,
    buttons: {},
    render: (html) => {
      html.find(".spell-button").click((ev) => {
        const spellId = ev.currentTarget.dataset.spellId;
        const spell = actor.items.get(spellId);
        if (spell) spell.roll();
      });
    },
  }).render(true);
}
