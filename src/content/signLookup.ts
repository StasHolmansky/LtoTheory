import type { LanguageCode } from '../i18n';
import de from './signTranslations/de.json';
import es from './signTranslations/es.json';
import fr from './signTranslations/fr.json';
import ptBR from './signTranslations/pt-BR.json';
import ru from './signTranslations/ru.json';
import type { SignCategoryId, SignGroupId } from './signs';

type Named = { name: string; summary?: string; description?: string };

type Catalog = {
  categories: Record<string, { name: string; summary: string }>;
  groups: Record<string, string>;
  signs: Record<string, { name: string; description: string }>;
};

const catalogs: Record<Exclude<LanguageCode, 'en'>, Catalog> = {
  ru,
  es,
  'pt-BR': ptBR,
  fr,
  de,
};

function textOf(value: string | undefined): string | null {
  return value && value.trim().length > 0 ? value : null;
}

export function categoryTranslation(
  language: LanguageCode,
  categoryId: SignCategoryId,
  field: 'name' | 'summary',
): string | null {
  if (language === 'en') {
    return null;
  }
  return textOf(catalogs[language]?.categories?.[categoryId]?.[field]);
}

export function groupTranslation(language: LanguageCode, groupId: SignGroupId): string | null {
  if (language === 'en') {
    return null;
  }
  return textOf(catalogs[language]?.groups?.[groupId]);
}

export function signTranslation(
  language: LanguageCode,
  signId: string,
  field: 'name' | 'description',
): string | null {
  if (language === 'en') {
    return null;
  }
  const entry: Named | undefined = catalogs[language]?.signs?.[signId];
  return textOf(entry?.[field]);
}
