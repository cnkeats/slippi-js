import { GameStartType, SlippiGame } from "../src";
import { frameToGameTimer } from "../src/utils/gameTimer";

describe("when calculating the in-game timer", () => {
  it("should calculate the timer correctly when increasing", () => {
    const timer_increasing = new SlippiGame("./slp/timer_increasing.slp");
    const timer_increasing_settings = timer_increasing.getSettings() as GameStartType;
    expect(frameToGameTimer(timer_increasing.getMetadata()?.lastFrame as number, timer_increasing_settings)).toBe(
      "00:33.57",
    );
  });

  it("should calcualte the timer correctly when the limit is hit", () => {
    const timer_limit = new SlippiGame("./slp/timer_limit.slp");
    const timer_limit_settings = timer_limit.getSettings() as GameStartType;
    expect(frameToGameTimer(timer_limit.getMetadata()?.lastFrame as number, timer_limit_settings)).toBe("00:00.00");
  });

  it("should calculate the timer correctly when decreasing", () => {
    const timer_decreasing = new SlippiGame("./slp/timer_decreasing.slp");
    const timer_decreasing_settings = timer_decreasing.getSettings() as GameStartType;
    expect(frameToGameTimer(timer_decreasing.getMetadata()?.lastFrame as number, timer_decreasing_settings)).toBe(
      "01:51.76",
    );
  });
});
