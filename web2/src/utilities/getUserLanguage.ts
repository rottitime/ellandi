export const getUserLanguage = (): string | undefined => {
  const navigator = window.navigator;
  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(navigator.languages)) {
    for (const language of navigator.languages) {
      if (language && language.length > 0) {
        return language;
      }
    }
  }
  // support for other well known properties in browsers
  for (const key of ["language", "browserLanguage", "systemLanguage", "userLanguage"]) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const language: string | undefined = navigator.languages[key as any];
    if (language && language.length > 0) {
      return language;
    }
  }
};
