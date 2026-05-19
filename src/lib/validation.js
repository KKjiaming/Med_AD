import { fields, modelOptions } from './constants.js';
import { t, tf } from './i18n.js';

export function parseNumber(value) {
  return value === '' ? Number.NaN : Number(value);
}

export function getActiveFields(modelId) {
  return fields.filter((field) => field.models.includes(modelId));
}

export function validateForm(form, language = 'en') {
  const model = modelOptions.find((item) => item.id === form.modelId);

  if (!model) {
    return { error: t(language, 'validation.invalidModel') };
  }

  const values = {
    modelId: form.modelId,
    biologicalStage: form.biologicalStage,
  };

  for (const field of getActiveFields(form.modelId)) {
    if (field.type === 'select') {
      if (!field.options.some((option) => option.value === form[field.id])) {
        return {
          error: t(language, 'validation.invalidSelect', {
            field: tf(language, `fieldLabels.${field.id}`, field.label),
          }),
        };
      }
      values[field.id] = form[field.id];
      continue;
    }

    const value = parseNumber(form[field.id]);

    if (Number.isNaN(value) || value < field.min || value > field.max) {
      const unit = field.unit ? ` ${field.unit}` : '';
      return {
        error: t(language, 'validation.range', {
          field: tf(language, `fieldLabels.${field.id}`, field.label),
          min: field.min,
          max: field.max,
          unit,
        }),
      };
    }

    values[field.id] = value;
  }

  return { model, values };
}
