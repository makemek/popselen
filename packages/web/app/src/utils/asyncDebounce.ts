import { debounce } from "lodash";

interface DebounceSettings {
  leading?: boolean | undefined;
  maxWait?: number | undefined;
  trailing?: boolean | undefined;
}

// https://github.com/lodash/lodash/issues/4815#issuecomment-815866904
export function asyncDebounce<F extends (...args: any[]) => Promise<any>>(
  func: F,
  wait?: number,
  options?: DebounceSettings
) {
  const debounced = debounce(
    (resolve, reject, args: Parameters<F>) => {
      func(...args)
        .then(resolve)
        .catch(reject);
    },
    wait,
    options
  );
  return (...args: Parameters<F>): ReturnType<F> =>
    new Promise((resolve, reject) => {
      debounced(resolve, reject, args);
    }) as ReturnType<F>;
}
