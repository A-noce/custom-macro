const locationValueTableRecord = {
  1: 1,
  2: 1,
  8: 3,
  9: 3,
  10: 4,
};

const numberLocation = {
  1: "Perna Direita",
  2: "Perna Esquerda",
  8: "Braço Direito",
  9: "Braço Esquesto",
  10: "Cabeça",
};

const damageTypeRecord = {
  0: "Corte",
  1: "Impacto",
  2: "Perfuração",
  3: "Energia",
};

const cutEffects = {
  1: [
    "Sangrando",
    "Caído",
    "Lento",
    "Vagaroso (leve)",
    "Vagaroso (grave)",
    "Vagaroso (permanente); perna decepada",
  ],
  2: [
    "Sangrando",
    "Sangrado",
    "Vulnerável",
    "Fraco",
    "Debilitado",
    "Morto; bucho aberto",
  ],
  3: [
    "Sangrando",
    "Derruba o que está segurando",
    "Vulnerável",
    "Maneta (leve)",
    "Maneta (grave)",
    "Maneta (permanente); braço decepado",
  ],
  4: [
    "Sangrando",
    "Cego (1d4 rodadas)",
    "Atordoado por 1 rodada pela dor intensa",
    "Caolho (leve)",
    "Caolho (grave)",
    "Morto; decapitado. Belo golpe!",
  ],
};
const impactEffect = {
  1: [
    "Caído",
    "Perde a próxima ação de movimento",
    "Enredado",
    "Vagaroso (leve)",
    "Vagaroso (grave)",
    "Vagaroso (permanente); joelho estilhaçado",
  ],
  2: [
    "Vulnerável",
    "Indefeso por 1 rodada",
    "Fraco",
    "Enjoado",
    "Debilitado",
    "Morto; esterno afundado",
  ],
  3: [
    "Derruba o que está segurando",
    "Perde a próxima ação de movimento",
    "Vulnerável",
    "Maneta (leve)",
    "Maneta (grave)",
    "Maneta (permanente); ombro ou cotovelo estilhaçado",
  ],
  4: [
    "Vulnerável",
    "Alquebrado",
    "Atordoado por 1 rodada pela tontura",
    "Role 1 dado: par = Cego (leve), ímpar = Surdo (leve)",
    "Role 1 dado: par = Cego (permanente), ímpar = Surdo (permanente)",
    "Morto; crânio esmigalhado. Caixão fechado...",
  ],
};
const punctureEffect = {
  1: [
    "Sangrando",
    "Sangrando",
    "Cai no chão",
    "Vagaroso (leve)",
    "Vagaroso (grave)",
    "Vagaroso (permanente); músculos trespassados",
  ],
  2: [
    "Sangrando",
    "Vulnerável",
    "Fraco",
    "Sangrando",
    "Debilitado e indefeso por 1 rodada",
    "Morto; coração perfurado",
  ],
  3: [
    "Sangrando",
    "Derruba o que está segurando",
    "Vulnerável",
    "Sangrando",
    "Maneta (grave)",
    "Maneta (permanente); tendões trespassados",
  ],
  4: [
    "Sangrando",
    "Abalado por 1 rodada e sangrando",
    "Frustrado",
    "Cego (grave)",
    "Cego (permanente)",
    "Morto; tiro na cabeça. Na mosca!",
  ],
};
const energyEffect = {
  1: [
    "Cai no chão",
    "Vulnerável",
    "Desprevenido por 1 rodada",
    "Vagaroso (leve); pé queimado",
    "Vagaroso (grave); perna queimada",
    "Vagaroso (permanente); perna incinerada",
  ],
  2: [
    "Sobrecarregado por 1d6 rodadas",
    "Vulnerável",
    "Engolfado por energia (como em chamas, mas sofre dano do mesmo tipo do ataque)",
    "Um item vestido aleatório é destruído",
    "Enjoado",
    "Morto; transformado em cinzas",
  ],
  3: [
    "Derruba o que está segurando",
    "Vulnerabilidade ao tipo de dano por 1 rodada",
    "Não pode usar o braço por 1 rodada",
    "Maneta (leve); mão queimada",
    "Maneta (grave); braço queimado",
    "Maneta (permanente); braço incinerado",
  ],
  4: [
    "Ofuscado",
    "Alquebrado",
    "Cego",
    "Pasmo por 1 rodada",
    "Confuso",
    "Morto; cabeça vaporizada. Um leve exagero...",
  ],
};

const damageEffect = {
  0: cutEffects,
  1: impactEffect,
  2: punctureEffect,
  3: energyEffect,
};

function getEffect(locationValue, severityValue, weaponValue) {
  const tableValue = locationValueTableRecord?.[locationValue] ?? 2;
  const locationHit = numberLocation?.[locationValue] ?? "Tronco";
  const weaponType = damageTypeRecord[weaponValue];
  const effectTable = damageEffect[weaponValue];
  const size = effectTable.length
  const pageIndex =
    Math.ceil(severityValue / 3) > (size -1) ? size -1 : Math.ceil(severityValue / 3); -1
    const table = effectTable[tableValue]
  const effect = table?.[pageIndex] ?? table.at(-1)
  return { locationHit, weaponType, effect };
}

function generateBox(
  location,
  locationValue,
  severityValue,
  modifier,
  damageType,
  effect
) {
  const damageBox = `<div style="text-align: left; text-weight: bold">Tipo de Dano</div>
  <h4 class="dice-total" style="flex: 0 0 100%" >${damageType}</h4>`;

  const locationBox = `<div style="text-align: left; text-weight: bold">Local do Ataque</div>
  <h4 class="dice-total" style="flex: 0 0 100%" ><span style="color: #0d0481ff">${locationValue}</span></h4>
  <h4 class="dice-total" style="flex: 0 0 100%" >${location}</h4>`;

  const severityBox = `<div style="text-align: left; text-weight: bold">Severidade</div>
  <h4 class="dice-total" style="flex: 0 0 100%" >
  <span style="color: #0d0481ff">${severityValue}</span> + ${modifier} = ${
    severityValue + modifier
  }</h4>`;

  const effectBox = `<div style="text-align: left; text-weight: bold">Efeito</div>
  <h4 class="dice-total" style="flex: 0 0 100%" >${effect}</h4>`;

  return `<div class="dice-roll">${damageBox}</br>${locationBox}</br>${severityBox}</br>${effectBox}</div>`;
}

const damageTypeButton = Object.entries(damageTypeRecord).map(
  ([value, name]) => {
    const button = `<button class="weapon" data-value="${value}" key="${value}" style="width: 50%; margin: 4px 0; padding: 8px; display: flex; align-items: center; gap: 10px; border: 4px 4px 4px px">
      <span style="flex-grow: 1; text-align: center;">${name}</span>
    </button>`;
    return button;
  }
);

const damageContent = `<span>Tipo de dano</span> </br>
  <div style="display: flex">${
    damageTypeButton[0] + damageTypeButton[1]
  }</div><div style="display: flex">${
  damageTypeButton[2] + damageTypeButton[3]
}</div>`;

const modifierField = `<div>
    <div class="form-group">
    <label>Modificador de Severidade:</label>
    <input type="text" onchange="this.value = this.value.replace(/\D/g, '')"
    name="modifier" value="2"/>
    </div>
    </div>`;

const calculateButton = `<button class="calculate" style="width: 100%; margin: 4px 0; padding: 8px; display: flex; align-items: center; gap: 10px; border: 4px 4px 4px px">
    <span style="flex-grow: 1; text-align: center;">Calcular</span>
    </button>`;
export async function critRoll(prop) {
  if (!prop?.weaponValue || !prop?.bonus) {
    let weaponValue;

    const content = `<div>${damageContent}</div> </br> ${modifierField} </br> ${calculateButton}
      <style>
      .weapon.selected {
        background: #6d0a0aff;
        color: white;
        font-weight: bold;
        }
        </style>`;

    const dialog = new Dialog({
      title: `Critica Hit!`,
      content: `<div>${content}</div>`,
      buttons: {},
      render: async (html) => {
        html.find(".weapon").click(async (ev) => {
          //get weapom
          html.find(".weapon").removeClass("selected");
          const btn = ev.currentTarget;
          weaponValue = ev.currentTarget?.dataset?.value;
          btn.classList.add("selected");
        });

        html.find(".calculate").on("click", async (event) => {
          const bonus = html.find('[name="modifier"]').val();

          const erro1 = weaponValue === undefined;
          const erro2 = !bonus;
          const erro3 = /\D/gi.test(bonus);
          const errorArray = [erro1, erro2, erro3];

          if (errorArray.some(Boolean)) {
            const message = errorArray
              .map((e, i) => {
                if (!e) return "";
                if (i === 0) return "Escolha um tipo de dano.";
                if (i === 1) return "Preencha o Modificador.";
                if (i === 2) return "Modificador não numérico.";
              })
              .filter(Boolean)
              .join("</br> ");
            ui.notifications.warn(`Validação:</br>${message}`);
            return;
          }

          const [locationRoll, severityRoll] = await Promise.all([
            new Roll("1d10").evaluate(),
            new Roll("1d10").evaluate(),
          ]);

          await Promise.all([
            game.dice3d?.showForRoll(locationRoll),
            game.dice3d?.showForRoll(severityRoll),
          ]);

          const { locationHit, weaponType, effect } = getEffect(
            Number(locationRoll.total),
            Number(severityRoll.total) + Number(bonus),
            Number(weaponValue)
          );

          ChatMessage.create({
            content: generateBox(
              locationHit,
              locationRoll.total,
              severityRoll.total,
              Number(bonus),
              weaponType,
              effect
            ),
            speaker: ChatMessage.getSpeaker(),
          });
        });
      },
    });

    dialog.render(true);
  } else {
    const { weaponValue, bonus } = prop;
    const invalidCase = [
      !Object.keys(damageTypeRecord)
        .map((k) => Number(k))
        .includes(Number(weaponValue)),
      isNaN(Number(bonus)),
    ];
    if (invalidCase.some(Boolean)) {
      const message = invalidCase
        .map((v, i) => {
          if (!v) return "";
          return i == 0
            ? `Valor do tipo de dano inexistente.`
            : "Multiplicado inválido.";
        })
        .filter(Boolean)
        .join("</br>");
      ui.notifications.error(message);
      return;
    }

    const [locationRoll, severityRoll] = await Promise.all([
      new Roll("1d10").evaluate(),
      new Roll("1d10").evaluate(),
    ]);

    await Promise.all([
      game.dice3d?.showForRoll(locationRoll),
      game.dice3d?.showForRoll(severityRoll),
    ]);

    const { locationHit, weaponType, effect } = getEffect(
      Number(locationRoll.total),
      Number(severityRoll.total) + Number(bonus),
      Number(weaponValue)
    );

    ChatMessage.create({
      content: generateBox(
        locationHit,
        locationRoll.total,
        severityRoll.total,
        Number(bonus),
        weaponType,
        effect
      ),
      speaker: ChatMessage.getSpeaker(),
    });
  }
}

export function showTypes() {
  const content = Object.entries(damageTypeRecord)
    .map(
      ([value, type]) =>
        `<div><span style="font-weight: bold">${type}</span>- ${value}</div>`
    )
    .join("");
  ChatMessage.create({
    content,
    speaker: ChatMessage.getSpeaker(),
  });
}
