import { critRoll, showTypes } from "./critical-hit.js";
import { shoot } from "./shoot-macro.js";
import { randomNames } from "./random-name.js";
import { showHelp } from "./help.js";
import { reload } from "./reload-macro.js";
import { spellBook } from "./spell-list.js";
import { rollFail } from "./critical-fail.js";
import { showBag } from "./show-bag.js.js";
import { getActorInfo } from "./get-actor-info.js.js";
import { useContraption } from "./use-contraption.js";

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
      if (/^\/bag/.test(message)) {
        showBag();
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
