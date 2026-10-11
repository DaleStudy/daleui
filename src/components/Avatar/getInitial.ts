/**
 * 한 글자만으로 충분히 구분되는 문자.
 * 한글, 한자(호환 한자·확장 영역 포함), 히라가나·가타카나를 포함합니다.
 */
const CJK_CHARACTER =
  /[\p{Script=Hangul}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u;

/**
 * 이름에서 이니셜을 만듭니다.
 *
 * 한글처럼 한 글자에 뜻이 담기는 문자는 첫 글자만, 영문처럼 한 글자로는 구분이 어려운
 * 문자는 두 글자를 사용합니다.
 *
 * - `"서달레"` → `"서"`
 * - `"Dale Seo"` → `"DS"`
 * - `"dale"` → `"DA"`
 */
export function getInitial(name: string): string {
  const trimmed = name.trim();

  if (!trimmed) {
    return "";
  }

  const characters = Array.from(trimmed);

  if (CJK_CHARACTER.test(characters[0])) {
    return characters[0];
  }

  const words = trimmed.split(/\s+/);

  if (words.length > 1) {
    return (Array.from(words[0])[0] + Array.from(words[1])[0]).toUpperCase();
  }

  return characters.slice(0, 2).join("").toUpperCase();
}
