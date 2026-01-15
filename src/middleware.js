export const onRequest = async (context, next) => {
  const { pathname, search } = context.url;
  const match = pathname.match(/^(\/posts)?\/(2025|2026)\/(.+)$/);

  if (match) {
    const prefix = match[1] ?? "";
    const target = `${prefix}/${match[3]}${search}`;
    return context.redirect(target, 301);
  }

  return next();
};
