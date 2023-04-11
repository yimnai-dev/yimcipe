export function randomCodeGenerator(): number {
  let code = '';
  for (let i = 0; i < 5; i++) {
    const temp = Math.ceil(Math.random() * 9);
    code += temp;
  }
  return parseInt(code);
}
