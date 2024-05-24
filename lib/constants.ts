export const clients = [...new Array(10)].map((client, index) => ({
  href: `/sponsers/${index + 1}.png`,
}));
