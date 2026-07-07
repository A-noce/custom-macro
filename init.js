import { critRoll, showTypes } from "./macros/critical-hit.js";
import { shoot } from "./macros/shoot-macro.js";
import { randomNames } from "./macros/random-name.js";
import { showHelp } from "./macros/help.js";
import { reload } from "./macros/reload-macro.js";
import { spellBook } from "./macros/spell-list.js";
import { rollFail } from "./macros/critical-fail.js";
import { getActorInfo } from "./macros/get-actor-info.js.js";
import { useContraption } from "./macros/use-contraption.js";

export function registerCustomFunctios() {
  console.log("!!! - All custom functions working!");
  if (!Hooks._myChatHook) {
    Hooks._myChatHook = true;

    Hooks.on("chatMessage", (chatLog, message, chatData) => {
      if (/^\/tipo-dano/.test(message)) {
        showTypes();
        return false;
      }
      if (/^\/critical/.test(message)) {
        const match = message.match(/--(\w+)\s+(\w+)/);
        critRoll({ weaponValue: match?.[1], bonus: match?.[2] });
        return false;
      }
      if (/^\/shoot/.test(message)) {
        shoot();
        return false;
      }
      if (/^\/random-names/.test(message)) {
        randomNames();
        return false;
      }
      if (/^\/help/.test(message)) {
        showHelp();
        return false;
      }
      if (/^\/reload/.test(message)) {
        reload();
        return false;
      }
      if (/^\/spell-book/.test(message)) {
        spellBook();
        return false;
      }
      if (/^\/fail/.test(message)) {
        rollFail();
        return false;
      }
      if (/^\/info/.test(message)) {
        getActorInfo();
        return false;
      }
      if (/^\/contraption/.test(message)) {
        useContraption();
        return false;
      }
    });
  }
}

Hooks.once("init", () => {
  console.log("!!! -Running");
  registerCustomFunctios();
});
