import {createContext, FlowProps, FlowComponent} from "solid-js";
import {PolywrapClient} from "@polywrap/client-js";

export const ClientContext = createContext<PolywrapClient | undefined>(undefined);

export function PolywrapProvider(props: FlowProps): FlowComponent {

  const client = new PolywrapClient()

  return (
    <ClientContext.Provider value={client} children={props.children} />
  );
}