import { fields, stageOptions, systemGroups } from './constants.js';
import { getActiveFields, validateForm } from './validation.js';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeFieldValue(field, value) {
  if (field.type === 'select') {
    const option = stageOptions.find((item) => item.value === value);
    return option ? option.score / 100 : 0;
  }

  const normalized = (value - field.min) / (field.max - field.min);
  const bounded = clamp(normalized, 0, 1);
  return field.direction === 'inverse' ? 1 - bounded : bounded;
}

function getPredictedStage(score) {
  if (score < 34) {
    return { label: '0-2', className: 'low-risk' };
  }

  if (score < 58) {
    return { label: '3-4', className: 'medium-risk' };
  }

  if (score < 76) {
    return { label: '5', className: 'elevated-risk' };
  }

  return { label: '6', className: 'high-risk' };
}

function getStageProbabilities(score) {
  const centers = [
    { label: '0-2', center: 22 },
    { label: '3-4', center: 46 },
    { label: '5', center: 67 },
    { label: '6', center: 86 },
  ];

  const raw = centers.map((stage) => ({
    ...stage,
    value: Math.exp(-Math.abs(score - stage.center) / 16),
  }));
  const total = raw.reduce((sum, item) => sum + item.value, 0);

  return raw.map((item) => ({
    label: item.label,
    probability: (item.value / total) * 100,
  }));
}

export function calculateStageModel(form, language = 'en') {
  const validation = validateForm(form, language);

  if (validation.error) {
    return validation;
  }

  const { model, values } = validation;
  const activeFields = getActiveFields(form.modelId);
  const variableContributions = activeFields.map((field) => {
    const normalized = normalizeFieldValue(field, values[field.id]);
    const weighted = normalized * field.weight;

    return {
      id: field.id,
      label: field.label,
      system: field.system,
      normalized,
      weighted,
      percent: 0,
    };
  });

  const totalWeight = activeFields.reduce((sum, field) => sum + field.weight, 0);
  const weightedSum = variableContributions.reduce(
    (sum, item) => sum + item.weighted,
    0,
  );
  const score = Math.round((weightedSum / totalWeight) * 100);

  const systemContributions = systemGroups.map((system) => {
    const contribution = variableContributions
      .filter((item) => item.system === system.id)
      .reduce((sum, item) => sum + item.weighted, 0);

    return {
      ...system,
      contribution,
      percent: weightedSum > 0 ? (contribution / weightedSum) * 100 : 0,
    };
  });

  const variableContributionTotal = variableContributions.reduce(
    (sum, item) => sum + item.weighted,
    0,
  );

  const rankedVariables = variableContributions
    .map((item) => ({
      ...item,
      percent:
        variableContributionTotal > 0
          ? (item.weighted / variableContributionTotal) * 100
          : 0,
    }))
    .sort((a, b) => b.weighted - a.weighted);

  return {
    model,
    score,
    activeVariableCount: activeFields.length,
    predictedStage: getPredictedStage(score),
    probabilities: getStageProbabilities(score),
    systemContributions,
    variableContributions: rankedVariables,
  };
}

export { fields };
