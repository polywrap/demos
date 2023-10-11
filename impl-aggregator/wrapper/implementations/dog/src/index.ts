import {
  Args_getAnimalName,
  Args_getAnimalDimensions,
  Args_getAnimalVelocity,
  Args_speak,
  Animal_Size,
  Animal_Dimensions
} from "./wrap";

export function getAnimalName(args: Args_getAnimalName): string {
  return "Dog";
}

export function getAnimalDimensions(args: Args_getAnimalDimensions): Animal_Dimensions {
  if (args.size === Animal_Size.SMALL) {
    return {
      height: 4,
      length: 5,
      width: 3
    };
  } else if (args.size === Animal_Size.MEDIUM) {
    return {
      height: 10,
      length: 12,
      width: 5
    };
  } else if (args.size === Animal_Size.LARGE) {
    return {
      height: 16,
      length: 14,
      width: 8
    };
  } else {
    throw new Error("Unknown size.");
  }
}

export function getAnimalVelocity(args: Args_getAnimalVelocity): u32 {
  if (args.size === Animal_Size.SMALL) {
    return 1;
  } else if (args.size === Animal_Size.MEDIUM) {
    return 2;
  } else if (args.size === Animal_Size.LARGE) {
    return 4;
  } else {
    throw new Error("Unknown size.");
  }
}

export function speak(args: Args_speak): string {
  return "Wooooof!";
}
