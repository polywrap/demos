export function imgType(uri: string): string {
  const extension: string = uri.trimEnd().substring(uri.lastIndexOf(".") + 1);
  switch (extension) {
    case "svg":
      return "svg+xml";
    case "jpg":
      return "jpeg";
    default:
      return extension;
  }
}
