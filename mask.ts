function mask(
  data: Record<string, any>,
  maskingFields: string[],
  fullMasking: boolean
): Record<string, any> {
  const isPrimitive = (val: any) => typeof val === 'string' || typeof val === 'number';

  const maskValue = (val: string | number): string => {
    const str = val.toString();
    if (fullMasking) return '#'.repeat(str.length);
    if (str.length <= 4) return '#'.repeat(str.length);
    const visible = str.slice(-4);
    const masked = '#'.repeat(str.length - 4);
    return masked + visible;
  };

  const deepMask = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item, index) => {
        if (isPrimitive(item)) {
          return maskValue(item);
        } else {
          console.warn(`Unsupported array item at index ${index}`, item);
          return item;
        }
      });
    }

    if (typeof obj === 'object' && obj !== null) {
      const result: Record<string, any> = {};
      for (const key in obj) {
        const val = obj[key];
        if (maskingFields.includes(key)) {
          if (isPrimitive(val)) {
            result[key] = maskValue(val);
          } else if (Array.isArray(val)) {
            result[key] = deepMask(val);
          } else if (typeof val === 'object' && val !== null) {
            result[key] = deepMask(val);
          } else {
            console.warn(`Unsupported type for masking at key "${key}"`, val);
            result[key] = val;
          }
        } else {
          result[key] = typeof val === 'object' && val !== null ? deepMask(val) : val;
        }
      }
      return result;
    }

    return obj;
  };

  return deepMask(data);
}