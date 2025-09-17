//Macro to find if character can shoot with a ranged weapon
const recordWeaponAmmunition = {
  pistola: "balas",
  mosquete: "balas",
  "arco longo": "flechas",
  "arco curto": "flechas",
  "besta leve": "virotes",
  "besta pesada": "virotes",
};

//Condition to filter if the weapon is with a characte or npc
function filterWeapon(isNpc, item) {
  //return isNpc ? item.system.proposito === "disparo"  : item.system.proposito === "disparo" && !!item.system.equipado - BASE SYSTEM
  return isNpc
    ? item.system.proposito === "disparo"
    : item.system.proposito === "disparo" && !!item.system.equipado2.slot;
}

export async function shoot() {
  //select the token
  const token = canvas.tokens.controlled[0];
  if (!token) {
    ui.notifications.warn("No token selected.");
    return;
  }

  let actor = game.actors.get(token.actor.id);

  const isNpc = actor.type.toLowerCase() === "npc";
  //find witch ranged weapon it has equipped

  const rangedWeapon = actor.items.find((item) => filterWeapon(isNpc, item));

  if (!rangedWeapon) {
    let msg_html = `<h1>No ranged weapon equipped</h1>`;
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ token: actor }),
      content: msg_html,
    });
    return;
  }

  //get the first Weapon
  const weapon = rangedWeapon;
  const weaponName = rangedWeapon.name.toLowerCase();
  const isFireArm = /pistola|mosquete/.test(weaponName);

  const reloadEffectName = "descarregado";
  //Check if the character reloaded the weapon
  if (
    !!actor.effects.find((e) => e.name.toLowerCase() === reloadEffectName) &&
    isFireArm
  ) {
    let msg_html = `<h1>Empty weapon</h1>`;
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ token: actor }),
      content: msg_html,
    });
    return;
  }

  //Get the ammunition based on the weapon type
  const ammunitionName = recordWeaponAmmunition[weaponName];

  //find if has the ammmunition
  const ammunition = actor.items.find(
    (i) => i.name.toLowerCase() === ammunitionName
  );

  //Check if character has ammunition to make the attack
  if (!ammunition || ammunition.system.qtd === 0) {
    let msg_html = `<h1>No ammunition for ${weapon.name}</h1>`;
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ token: actor }),
      content: msg_html,
    });
    return;
  }

  await weapon.roll();

  //Check if the ammunition subtraction is configured in the item
  if (!weapon.system.consume.target) {
    await ammunition.update({ "system.qtd": ammunition.system.qtd - 1 });
  }

  //If the weapon is a fire arm inplement the effect "Descarregado" to avoid shooting again
  if (isFireArm) {
    const effectData = {
      label: "Descarregado",
      icon: "icons/weapons/ammunition/bullets-cartridge-shell-gray.webp",
      origin: `Actor.${actor.id}`,
      duration: {
        duration: null,
      },
      changes: [],
      flags: {
        tormenta20: {
          condition: true,
          durationScene: true,
        },
      },
      disabled: false,
    };

    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);
  }
}
