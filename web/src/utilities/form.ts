// Shared helpers used by form hooks

export const nonEmpty = (value: string): string => {
  if (value.trim().length === 0) {
    return "Field is required";
  }
  return "";
};

export type PascalCase<T extends string, C extends string = ""> = string extends T
  ? string
  : T extends `${infer F} ${infer R}`
  ? PascalCase<Capitalize<R>, `${C}${F}`>
  : `${C}${T}`;
export const pascalCase = <T extends string>(str: T): PascalCase<T> => {
  let camelStr = "";
  for (const part of str.split(" ")) {
    camelStr += part.slice(0, 1).toUpperCase() + part.slice(1);
  }
  return camelStr as PascalCase<T>;
};

export type CamelCase<T extends string> = Uncapitalize<PascalCase<T>>;
export const camelCase = <T extends string>(str: T): CamelCase<T> => {
  const pascal = pascalCase(str);
  return `${pascal.slice(0, 1).toLowerCase()}${pascal.slice(1)}` as CamelCase<T>;
};
