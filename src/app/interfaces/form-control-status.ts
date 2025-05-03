export interface FormControlStatus {
    isInValid: boolean;
    isTouched: boolean;
    errors: {
        required: boolean;
        minLength: boolean;
        maxLength: boolean;
        pattern: boolean;
    }
}
