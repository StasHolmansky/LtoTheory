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
