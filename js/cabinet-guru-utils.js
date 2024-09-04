var CabinetGuru = CabinetGuru || {};

CabinetGuru.Utils = (function() {
    function fractionToDecimal(fraction) {
        if (typeof fraction !== 'string') return Number(fraction);
        
        const parts = fraction.split(' ');
        let result = 0;
        
        for (let part of parts) {
            if (part.includes('/')) {
                const [numerator, denominator] = part.split('/');
                result += Number(numerator) / Number(denominator);
            } else {
                result += Number(part);
            }
        }
        
        return result;
    }

    function calculateLinearFootage(width, spanners, height, sides, cabinetType, toeKickHeight) {
        let linearFootage = 0;
        
        // Calculate basic linear footage
        linearFootage += width * 2; // Front and back
        linearFootage += height * 2; // Top and bottom
        linearFootage += height * (sides - 2); // Side panels minus front and back
        
        // Add spanners
        linearFootage += width * spanners;
        
        // Adjust for cabinet type
        if (cabinetType === 'Base' || cabinetType === 'Vanity') {
            linearFootage += width; // Add toe kick
        }
        
        // Convert to feet
        return linearFootage / 12;
    }

    return {
        fractionToDecimal: fractionToDecimal,
        calculateLinearFootage: calculateLinearFootage
    };
})();

console.log('CabinetGuru.Utils loaded:', CabinetGuru.Utils);