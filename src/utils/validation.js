export const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
export const INDIAN_PINCODE_REGEX = /^\d{6}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateIndianPincode(pincode) {
  const digits = pincode.replace(/\D/g, "").slice(0, 6);
  if (!INDIAN_PINCODE_REGEX.test(digits)) {
    return { valid: false, value: digits, error: "Enter a valid 6-digit pincode." };
  }
  return { valid: true, value: digits, error: "" };
}

export function validateIndianPhone(phone) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (!INDIAN_PHONE_REGEX.test(digits)) {
    return { valid: false, value: digits, error: "Enter a valid 10-digit Indian mobile number." };
  }
  return { valid: true, value: digits, error: "" };
}

export function validateOptionalEmail(email) {
  const trimmed = email.trim();
  if (!trimmed) {
    return { valid: true, value: "", error: "" };
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, value: trimmed, error: "Enter a valid email address." };
  }
  return { valid: true, value: trimmed, error: "" };
}
