import td from "testdouble";

export function useTdRecaptcha(id?: string) {
  createDOMScriptElement(id);
  const readyFn = td.function<Window["grecaptcha"]["ready"]>();
  const executeFn = td.function<Window["grecaptcha"]["execute"]>();

  const grecaptcha = td.object<Window["grecaptcha"]>();
  grecaptcha.execute = executeFn;
  grecaptcha.ready = readyFn;
  td.when(grecaptcha.ready(td.callback)).thenCallback(null, grecaptcha);

  return {
    grecaptcha,
    readyFn,
    executeFn,
  };
}

function createDOMScriptElement(id?: string) {
  const js = document.createElement("script");
  js.id = id || "google-recaptcha-v3";

  document.body.append(js);
  return js;
}
