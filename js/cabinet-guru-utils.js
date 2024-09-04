function fractionToDecimal(fraction) {
    if (fraction.includes('/')) {
        const parts = fraction.split(' ');
        if (parts.length === 2) {
            const whole = parseFloat(parts[0]);
            const frac = parts[1].split('/');
            return whole + (parseFloat(frac[0]) / parseFloat(frac[1]));
        } else {
            const frac = parts[0].split('/');
            return parseFloat(frac[0]) / parseFloat(frac[1]);
        }
    } else {
        return parseFloat(fraction);
    }
}

function calculateLinearFootage(cabWidth, numSpanners, cabHeight, numSides, cabinetType, toeKickHeight) {
    // Subtract toe kick height from cabinet height if applicable
    if (!['Upper', 'Pantry', 'Pantry Oven/Microwave'].includes(cabinetType)) {
        cabHeight -= toeKickHeight;
    }

    // Calculate total length of edges in inches
    const totalLengthInches = (cabWidth * numSpanners) + (cabHeight * numSides);
    // Convert to linear footage
    return totalLengthInches / 12;
}