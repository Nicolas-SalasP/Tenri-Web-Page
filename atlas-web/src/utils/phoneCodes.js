export const countryCodes = [
    { code: '+56', country: 'CL', name: 'Chile', mask: '9 0000 0000' },
    { code: '+54', country: 'AR', name: 'Argentina', format: '0 0000 00000' },
    { code: '+51', country: 'PE', name: 'Perú', mask: '000 000 000' },
    { code: '+57', country: 'CO', name: 'Colombia', mask: '000 0000000' },
    { code: '+52', country: 'MX', name: 'México', mask: '000 000 0000' },
    { code: '+1', country: 'US/CA', name: 'Estados Unidos / Canadá', mask: '000 000 0000' },
    { code: '+34', country: 'ES', name: 'España', mask: '000 000 000' },
    { code: '+55', country: 'BR', name: 'Brasil', mask: '00 00000-0000' },
    { code: '+598', country: 'UY', name: 'Uruguay', mask: '00 000 000' },
    { code: '+593', country: 'EC', name: 'Ecuador', mask: '00 000 0000' },
    { code: '+58', country: 'VE', name: 'Venezuela', mask: '000 0000000' },
    { code: '+507', country: 'PA', name: 'Panamá', mask: '0000-0000' },
    { code: '+44', country: 'UK', name: 'Reino Unido', mask: '0000 000000' },
    { code: '+49', country: 'DE', name: 'Alemania', mask: '000 00000000' },
    { code: '+33', country: 'FR', name: 'Francia', mask: '0 00 00 00 00' },
    { code: '+39', country: 'IT', name: 'Italia', mask: '000 000 0000' },
];

export const formatPhoneNumber = (value, mask) => {
    if (!mask) return value.replace(/\D/g, '');
    
    const numericValue = value.replace(/\D/g, '');
    let formatted = '';
    let numericIndex = 0;

    for (let i = 0; i < mask.length && numericIndex < numericValue.length; i++) {
        if (mask[i] === '0' || mask[i] === '9') {
            formatted += numericValue[numericIndex];
            numericIndex++;
        } else {
            formatted += mask[i];
            // Si el usuario borra, evita que el separador se quede pegado
            if (numericIndex >= numericValue.length) break; 
        }
    }
    return formatted;
};