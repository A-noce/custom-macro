//Macro to find all spells and show as a list and able the cast

export async function getActorInfo() {
  //select the token
  const token = canvas.tokens.controlled[0];

  if (!token) {
    ui.notifications.warn("No token selected.");
    return;
  }

  let actor = game.actors.get(token.actor.id);

  //console.log("Ator,", actor, actor.items);
  console.log(actor.effects);
  return actor;
}
