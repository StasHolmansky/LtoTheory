import type { LanguageCode } from '../i18n';
import de from './translations/de.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import ptBR from './translations/pt-BR.json';
import ru from './translations/ru.json';

export type LineKey = 'q' | 'a' | 'b' | 'c';

type LineMap = Record<string, Partial<Record<LineKey, string>>>;

const catalogs: Record<Exclude<LanguageCode, 'en'>, LineMap> = {
  ru,
  es,
  'pt-BR': ptBR,
  fr,
  de,
};

export function lineTranslation(
  language: LanguageCode,
  questionId: number,
  line: LineKey,
): string | null {
  if (language === 'en') {
    return null;
  }
  const text = catalogs[language]?.[String(questionId)]?.[line];
  return text && text.trim().length > 0 ? text : null;
}
