const buildUrl = (route: string, params: Record<string, string>): string => {
  return route.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => params[key] || "");
};

export default buildUrl;
