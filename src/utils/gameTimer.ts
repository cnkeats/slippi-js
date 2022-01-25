import { GameStartType, TimerType } from "..";

export function frameToGameTimer(frame: number, settings: GameStartType): string {
  const timerType = ((settings.gameInfo?.gameBitfield1 as number) & 0b11) as TimerType;

  if (timerType == TimerType.DECREASING) {
    let remainingFrames = frame > 0 ? frame : 0;
    const startingTimerInFrames = (settings.gameInfo?.gameTimer as number) * 60;

    const minutesPassed = Math.floor(remainingFrames / 60 / 60);
    remainingFrames -= minutesPassed * 60 * 60;

    const secondsPassed = Math.floor(remainingFrames / 60);
    remainingFrames -= secondsPassed * 60;

    const centiseconds = Math.ceil((((60 - remainingFrames) % 60) * 99) / 59);

    const seconds = ((60 - secondsPassed) % 60) - (remainingFrames > 0 ? 1 : 0);

    const minutes = startingTimerInFrames / 60 / 60 - minutesPassed - (seconds > 0 ? 1 : 0);

    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${
      centiseconds < 10 ? "0" : ""
    }${centiseconds}`;
  }

  if (timerType == TimerType.INCREASING) {
    let remainingFrames = frame > 0 ? frame : 0;

    const minutes = Math.floor(remainingFrames / 60 / 60);
    remainingFrames -= minutes * 60 * 60;

    const seconds = Math.floor(remainingFrames / 60);
    remainingFrames -= seconds * 60;

    const centiseconds = Math.floor(((remainingFrames % 60) * 99) / 59);

    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${
      centiseconds < 10 ? "0" : ""
    }${centiseconds}`;
  }

  return "";
}
