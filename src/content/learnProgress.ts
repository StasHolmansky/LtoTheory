import AsyncStorage from '@react-native-async-storage/async-storage';

const LEARN_QUESTION_KEY = 'learnQuestionId';

export async function loadLearnQuestionId(): Promise<number | null> {
  const raw = await AsyncStorage.getItem(LEARN_QUESTION_KEY);
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function saveLearnQuestionId(id: number): Promise<void> {
  await AsyncStorage.setItem(LEARN_QUESTION_KEY, String(id));
}

export async function clearLearnQuestionId(): Promise<void> {
  await AsyncStorage.removeItem(LEARN_QUESTION_KEY);
}

const MISTAKES_KEY = 'learnMistakeIds';

export async function loadMistakeIds(): Promise<number[]> {
  const raw = await AsyncStorage.getItem(MISTAKES_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((id): id is number => Number.isInteger(id) && id > 0);
  } catch {
    return [];
  }
}

export async function recordLearnResult(id: number, correct: boolean): Promise<void> {
  const current = await loadMistakeIds();
  const next = new Set(current);
  if (correct) {
    next.delete(id);
  } else {
    next.add(id);
  }
  await AsyncStorage.setItem(MISTAKES_KEY, JSON.stringify([...next].sort((a, b) => a - b)));
}
