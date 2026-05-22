import { t, tf } from './i18n.js';

function joinLabels(labels, language) {
  if (language === 'zh') {
    return labels.join('、');
  }
  return labels.join(', ');
}

export function getInterpretation(result, language = 'en') {
  const relationLabel = t(
    language,
    `relationTypes.${result.clinicalBiologicalRelation.type}`,
  );
  const burdenLabel = t(language, `burdenLevels.${result.phenotypeBurden.level}`);
  const riskLevelLabel = t(language, `riskLevels.${result.progressionRisk.level}`);
  const applicabilityNote = t(
    language,
    result.progressionRisk.applicable
      ? 'applicabilityText.suitable'
      : 'applicabilityText.cautious',
    { stage: result.currentClinicalStage.label },
  );
  const topVariableLabels = result.variableContributions
    .slice(0, 5)
    .map((item) => tf(language, `fieldLabels.${item.id}`, item.label));
  const topVariables = joinLabels(topVariableLabels, language);

  return {
    relationLabel,
    burdenLabel,
    riskLevelLabel,
    applicabilityNote,
    className: result.clinicalBiologicalRelation.className,
    summary: t(language, 'reportTemplates.relation', {
      clinicalStage: result.currentClinicalStage.label,
      biologicalStage: result.biologicalStage.label,
      relation: relationLabel,
    }),
    phenotypeText: t(language, 'reportTemplates.phenotype', {
      score: result.score,
      burden: burdenLabel,
    }),
    contributionText: t(language, 'reportTemplates.contribution', {
      variables: topVariables,
    }),
    riskText: t(language, 'reportTemplates.risk', {
      clinicalStage: result.currentClinicalStage.label,
      oneYear: result.progressionRisk.oneYearRisk,
      twoYear: result.progressionRisk.twoYearRisk,
    }),
    limitText: t(language, 'reportTemplates.limit'),
  };
}
