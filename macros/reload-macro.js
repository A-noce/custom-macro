//Macro to find if character can shoot with a ranged weapon and reload it

export async function reload() {
  //select the token
  const token = canvas.tokens.controlled[0];
  if (!token) {
    ui.notifications.warn("No token selected.");
    return;
  }
  let actor = game.actors.get(token.actor.id);

  //find empty and ranged weapon
  const weapon = actor.items.find(
    (i) => i.system.proposito === "disparo" && !!i.system.equipado
  );
  const effectToBeRemovedName = "descarregado";

  const effect = actor.effects.find(
    (e) => e.name.toLowerCase() === effectToBeRemovedName
  );

  if (!weapon && !effect) {
    let msg_html = `<h1>No weapon to reaload</h1>`;
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({ token: actor }),
      content: msg_html,
    });
  }

  await actor.deleteEmbeddedDocuments("ActiveEffect", [effect.id]);

  /* ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({ token: actor }),
    content: `<h1>Reload!</h1>`,
    }); */
  ui.notifications.info("Reload !");
}

