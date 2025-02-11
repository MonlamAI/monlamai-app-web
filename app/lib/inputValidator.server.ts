
interface ValidationResult {
    isValid: boolean;
    error?: string;
    charCount: number;
  }
  
  export const validateInput = (input: string, maxChars: number = 1000): ValidationResult => {
    if (!input || input.trim().length === 0) {
      throw new Error("Input text is required");
    }
  
    const charCount = input.length;
    if (charCount > maxChars) {
      throw new Error(`Input text exceeds maximum character limit of ${maxChars}`);
    }
  
    return {
      isValid: true,
      charCount
    };
  };