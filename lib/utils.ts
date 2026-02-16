export const getLetraLinha = (index: number) =>
  String.fromCodePoint(64 + index);

export const getNicho = (linha: number, coluna: number) =>
  `${getLetraLinha(linha)}${coluna}`;

export const getLinhaColuna = (
  nicho: string,
): { linha: number; coluna: number } => {
  const match = /^([A-Z]+)(\d+)$/i.exec(nicho);

  if (!match) {
    throw new Error('Posição inválida');
  }

  const letra = match[1].toUpperCase();
  const coluna = Number.parseInt(match[2], 10);

  const linha = letra.codePointAt(0) ? letra.codePointAt(0)! - 64 : -1;

  return { linha, coluna };
};
