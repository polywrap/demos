import {
  Args_abstractMethod,
  Common_Object
} from "./wrap";

export function abstractMethod(
  args: Args_abstractMethod
): Common_Object {
  return {
    prop1: args.arg1,
    prop2: args.arg2,
    prop3: {
      prop: args.arg1 + args.arg2.toString()
    }
  };
}
