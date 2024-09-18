// 余白用 Size
const BASE_SIZE = 8;

export const baseGutter = `${BASE_SIZE}px`;
export const halfGutter = `${BASE_SIZE / 2}px`;
export const gutterBy = (value: number): string => `${BASE_SIZE * value}px`;
