import { t } from './i18n.js';

export function getInterpretation(result, language = 'en') {
  const stage = result.predictedStage.label;

  return {
    level: t(language, `interpretation.${stage}.level`),
    className: result.predictedStage.className,
    interpretation: t(language, `interpretation.${stage}.text`),
    advice: t(language, `interpretation.${stage}.advice`),
  };
}
