import applyReplacements from './replacements';

describe('applyReplacements', () => {
    it('should replace "་\n" with "་"', () => {
        const input = "བཀྲ་ཤིས་\nབདེ་ལེགས།";
        const expectedOutput = "བཀྲ་ཤིས་བདེ་ལེགས།";
        expect(applyReplacements(input)).toBe(expectedOutput);
    });

    it('should replace "་ " with "་"', () => {
        const input = "བཀྲ་ཤིས་ བདེ་ལེགས།";
        const expectedOutput = "བཀྲ་ཤིས་བདེ་ལེགས།";
        expect(applyReplacements(input)).toBe(expectedOutput);
    });

    it('should replace " ་" with "་"', () => {
        const input = "བཀྲ་ཤིས་ ་བདེ་ལེགས།";
        const expectedOutput = "བཀྲ་ཤིས་་བདེ་ལེགས།";
        expect(applyReplacements(input)).toBe(expectedOutput);
    });

    it('should apply all replacements correctly', () => {
        const input = "བཀྲ་ཤིས་\nབདེ་ ་ལེགས་ ";
        const expectedOutput = "བཀྲ་ཤིས་བདེ་ལེགས་";
        expect(applyReplacements(input)).toBe(expectedOutput);
    });

    it('should return the same string if no replacements are needed', () => {
        const input = "བཀྲ་ཤིས་བདེ་ལེགས།";
        expect(applyReplacements(input)).toBe(input);
    });
});
