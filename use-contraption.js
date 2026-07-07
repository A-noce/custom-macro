//Macro to find all spells and show as a list and able the cast

export async function useContraption() {
  //select the token
  const token = canvas.tokens.controlled[0];

  if (!token) {
    ui.notifications.warn("No token selected.");
    return;
  }

  let actor = game.actors.get(token.actor.id);

  console.log("Ator,", actor);
  const biography = actor.system.detalhes.diario4.value;
  const regexp = /- engenhocas utilizadas:\s*(\d+)/i;
  const usage = Number(biography.match(regexp)?.[1]);
  console.log({ usage });
  biography.replace(regexp, "");

  if (usage) {
    actor.system.detalhes.diario4.value = `${"- engenhocas utilizadas: " + (usage + 1)}`;
  } else {
    actor.system.detalhes.diario4.value = `${"<p>- engenhocas utilizadas: 1</p>"}`;
  }
}
