const { Remarkable } = require("remarkable");

const md = new Remarkable();

console.log(md.render("# Remarkable rulezz!"));
const markdownToHtml = (markdown: string): string => {
  const md = new Remarkable();
  return md.render(markdown);
};
console.log(markdownToHtml("# Remarkable rulezz!"));
