// 1 uppercase, 1 lowercase, 1 number and at least 8 chars
export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/;

export const INVOICE_PENDING = 0;
export const INVOICE_PAID = 1; 
