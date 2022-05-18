import { loadWorker } from "~/src/utils/workerAdapter";
import td from "testdouble";
import { act, renderHook } from "@testing-library/react-hooks";
import { useLeaderboard } from "~/src/home/useLeaderboard";
import { WorkerEvent } from "~/worker/src/constants";

afterEach(() => {
  global.Worker = undefined as any;
  global.SharedWorker = undefined as any;
  global.BroadcastChannel = undefined as any;
});

test("leaderboard update state when shared worker notifies data", () => {
  global.SharedWorker = td.constructor([] as any);
  global.BroadcastChannel = td.constructor([] as any);
  const instance: { onmessage: Function | null } = { onmessage: null };
  td.when(new global.BroadcastChannel(td.matchers.anything())).thenReturn(
    instance as BroadcastChannel,
  );
  const { result } = renderHook(() => useLeaderboard());
  expect(result.current.leaderboard.TH).toBeUndefined();

  const workerAdapter = loadWorker();
  workerAdapter.subscribeLeaderboard(result.current.handleUpdate);
  expect(typeof instance.onmessage).toBe("function");
  act(() => {
    instance.onmessage!({
      data: {
        event: WorkerEvent.LEADERBOARD_EVENT,
        payload: { country: "TH", value: 1 },
      },
    });
  });

  expect(result.current.leaderboard.TH).toEqual(1);
});

test("leaderboard update state when web worker notifies data", () => {
  global.Worker = td.constructor([] as any);
  const instance: { onmessage: Function | null } = { onmessage: null };
  td.when(
    new global.Worker(td.matchers.anything(), td.matchers.anything()),
  ).thenReturn(instance as Worker);
  const { result } = renderHook(() => useLeaderboard());
  expect(result.current.leaderboard.TH).toBeUndefined();

  const workerAdapter = loadWorker();
  workerAdapter.subscribeLeaderboard(result.current.handleUpdate);
  expect(typeof instance.onmessage).toBe("function");
  act(() => {
    instance.onmessage!({
      data: {
        event: WorkerEvent.LEADERBOARD_EVENT,
        payload: { country: "TH", value: 1 },
      },
    });
  });

  expect(result.current.leaderboard.TH).toEqual(1);
});
