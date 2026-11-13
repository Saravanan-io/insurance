/**
 * Validation rules for Insurance Planning Cards
 */

export const validateMarriage = (data) => {
  const errors = {};

  if (!data.prefix || data.prefix === '') {
    errors.prefix = 'Please select a title prefix (Mr./Mrs.)';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required (minimum 2 characters)';
  }

  const value = Number(data.marriageValue);
  if (!data.marriageValue || isNaN(value) || value <= 0) {
    errors.marriageValue = 'Please enter a valid planned marriage budget (> 0)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateEducation = (data) => {
  const errors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Student Full Name is required';
  }

  if (!data.gender || (data.gender !== 'Male' && data.gender !== 'Female')) {
    errors.gender = 'Please select student gender';
  }

  const value = Number(data.educationValue);
  if (!data.educationValue || isNaN(value) || value <= 0) {
    errors.educationValue = 'Please enter a valid education target fund (> 0)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRetirement = (data) => {
  const errors = {};

  if (!data.prefix || data.prefix === '') {
    errors.prefix = 'Please select a title prefix (Mr./Mrs.)';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required';
  }

  const value = Number(data.retirementValue);
  if (!data.retirementValue || isNaN(value) || value <= 0) {
    errors.retirementValue = 'Please enter a target retirement corpus (> 0)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateAccidentalRisk = (data) => {
  const errors = {};

  if (!data.prefix || data.prefix === '') {
    errors.prefix = 'Please select a title prefix (Mr./Mrs.)';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Insured Full Name is required';
  }

  const value = Number(data.coverageValue);
  if (!data.coverageValue || isNaN(value) || value <= 0) {
    errors.coverageValue = 'Please enter an accidental coverage sum (> 0)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLifeRisk = (data) => {
  const errors = {};

  if (!data.prefix || data.prefix === '') {
    errors.prefix = 'Please select a title prefix (Mr./Mrs.)';
  }

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Insured Full Name is required';
  }

  const value = Number(data.coverageValue);
  if (!data.coverageValue || isNaN(value) || value <= 0) {
    errors.coverageValue = 'Please enter a life risk coverage sum (> 0)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const planValidators = {
  marriage: validateMarriage,
  education: validateEducation,
  retirement: validateRetirement,
  accidentalRisk: validateAccidentalRisk,
  lifeRisk: validateLifeRisk
};
