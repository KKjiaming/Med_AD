import {
  clinicalStageOptions,
  fields,
  systemGroups,
} from './constants.js';
import { getActiveFields, validateForm } from './validation.js';

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normalizeFieldValue(field, value) {
  if (field.type === 'select') {
    const option = field.options.find((item) => item.value === value);
    return option ? option.score / 100 : 0;
  }

  const normalized = (value - field.min) / (field.max - field.min);
  const bounded = clamp(normalized, 0, 1);
  return field.direction === 'inverse' ? 1 - bounded : bounded;
}

function getSelectedOption(options, value) {
  return options.find((item) => item.value === value) ?? options[0];
}

function getPhenotypeBurden(score) {
  if (score >= 70) {
    return { level: 'high', className: 'high-risk' };
  }

  if (score >= 45) {
    return { level: 'moderate', className: 'medium-risk' };
  }

  return { level: 'low', className: 'low-risk' };
}

function getClinicalBiologicalRelation(clinicalStage, biologicalStage) {
  const difference = clinicalStage.score - biologicalStage.score;

  if (difference >= 12) {
    return { type: 'clinicalHeavy', className: 'high-risk', difference };
  }

  if (difference <= -12) {
    return { type: 'clinicalMild', className: 'low-risk', difference };
  }

  return { type: 'concordant', className: 'medium-risk', difference };
}

function getProgressionRisk(score, clinicalStage) {
  const applicable = clinicalStage.order <= 4;
  const oneYearRisk = applicable
    ? clamp(Math.round(score * 0.2 + clinicalStage.order), 5, 45)
    : clamp(Math.round(score * 0.08), 4, 18);
  const twoYearRisk = applicable
    ? clamp(oneYearRisk * 2, 10, 78)
    : clamp(Math.round(oneYearRisk * 1.4), 6, 28);

  let level = 'low';
  if (applicable && oneYearRisk >= 18) {
    level = 'high';
  } else if (applicable && oneYearRisk >= 11) {
    level = 'moderate';
  } else if (!applicable) {
    level = 'caution';
  }

  return {
    level,
    applicable,
    oneYearRisk,
    twoYearRisk,
  };
}

function getStageProfile(score) {
  const centers = clinicalStageOptions.map((stage) => ({
    label: stage.label,
    center: stage.score,
  }));

  const raw = centers.map((stage) => ({
    ...stage,
    value: Math.exp(-Math.abs(score - stage.center) / 18),
  }));
  const total = raw.reduce((sum, item) => sum + item.value, 0);

  return raw.map((item) => ({
    label: item.label,
    probability: (item.value / total) * 100,
  }));
}

function getRiskDrivers(systemContributions, variableContributions) {
  const topSystems = systemContributions
    .filter((item) => item.id !== 'stage')
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 2)
    .map((item) => ({ type: 'system', id: item.id, label: item.label }));

  const preferredVariables = ['NLR', 'Crea', 'TT', 'ATIII', 'PWMH', 'DWMH'];
  const topVariables = variableContributions
    .filter((item) => preferredVariables.includes(item.id))
    .sort(
      (a, b) =>
        preferredVariables.indexOf(a.id) - preferredVariables.indexOf(b.id),
    )
    .slice(0, 2)
    .map((item) => ({ type: 'variable', id: item.id, label: item.label }));

  return [...topSystems, ...topVariables];
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
  const rawScore = totalWeight > 0 ? (weightedSum / totalWeight) * 100 : 0;
  const score = clamp(Math.round(41 + rawScore * 0.8), 0, 100);

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

  const currentClinicalStageField = fields.find(
    (field) => field.id === 'currentClinicalStage',
  );
  const biologicalStageField = fields.find((field) => field.id === 'biologicalStage');
  const currentClinicalStage = getSelectedOption(
    currentClinicalStageField.options,
    values.currentClinicalStage,
  );
  const biologicalStage = getSelectedOption(
    biologicalStageField.options,
    values.biologicalStage,
  );
  const phenotypeBurden = getPhenotypeBurden(score);
  const clinicalBiologicalRelation = getClinicalBiologicalRelation(
    currentClinicalStage,
    biologicalStage,
  );
  const progressionRisk = getProgressionRisk(score, currentClinicalStage);
  const riskDrivers = getRiskDrivers(systemContributions, rankedVariables);

  return {
    model,
    score,
    rawScore,
    activeVariableCount: activeFields.length,
    currentClinicalStage,
    biologicalStage,
    clinicalBiologicalRelation,
    phenotypeBurden,
    progressionRisk,
    riskDrivers,
    probabilities: getStageProfile(score),
    systemContributions,
    variableContributions: rankedVariables,
  };
}

export { fields };
