import { expect, test } from "@jest/globals";
import { getIssueContentBoardSnapshot, listIssueContentBoards } from "../../packages/shared/src";

test("builds issue content boards from canonical feeder lanes", () => {
  const boards = listIssueContentBoards();
  const snapshot = getIssueContentBoardSnapshot();

  expect(boards.length).toBe(6);
  expect(snapshot.boardCount).toBe(6);
  expect(snapshot.totalActiveTasks).toBeGreaterThan(0);
  expect(boards.some((board) => board.slug === "health-care-affordability")).toBe(true);
  expect(
    boards.some(
      (board) =>
        board.slug === "honest-government" && board.feederSiteSlugs.includes("honest-government-tx24")
    )
  ).toBe(true);
});
