import { Context, createContext as createReactContext, useContext } from "react";


function createContextUtil<T>(displayName: string) {
  const Context = createReactContext<T | null>(null);
  Context.displayName = displayName;
  return [Context.Provider, () => useDefinedContext(Context)] as const;
}

function useDefinedContext<T>(context: Context<T | null>): T {
  const value = useContext(context);
  if (!value) {
    const message = (context.displayName ? `${context.displayName}.` : '') + 'Provider node not found.';
    throw new Error(message);
  }
  return value;
}


export default createContextUtil;