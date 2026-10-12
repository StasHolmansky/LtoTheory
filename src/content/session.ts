export const EXAM_QUESTION_COUNT = 60;
export const EXAM_PASS_COUNT = 48;

export function shuffledIds(ids: number[]): number[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = copy[i];
    copy[i] = copy[j];
    copy[j] = current;
  }
  return copy;
}
