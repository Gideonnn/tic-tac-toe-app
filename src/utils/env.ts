export const env = (requiredVariables: string[]) => {
  for (const v of requiredVariables) {
    if (!process.env[v]) {
      console.error(`Environment variable '${v}' is required but not set.`);
      process.exit(1);
    }
  }
};
