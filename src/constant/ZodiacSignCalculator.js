const ZodiacSignCalculator = (day, month) => {
  let astro_sign = '';

  if (month == 12) {
    if (day < 22) astro_sign = 'Sagittarius';
    else astro_sign = 'Capricorn';
  } else if (month == '01' || month == 1) {
    if (day < 20) astro_sign = 'Capricorn';
    else astro_sign = 'aquarius';
  } else if (month == '02' || month == 2) {
    if (day < 19) astro_sign = 'Aquarius';
    else astro_sign = 'Pisces';
  } else if (month == '03' || month == 3) {
    if (day < 21) astro_sign = 'Pisces';
    else astro_sign = 'Aries';
  } else if (month == '04' || month == 4) {
    if (day < 20) astro_sign = 'Aries';
    else astro_sign = 'Taurus';
  } else if (month == '05' || month == 5) {
    if (day < 21) astro_sign = 'Taurus';
    else astro_sign = 'Gemini';
  } else if (month == '06' || month == 6) {
    if (day < 21) astro_sign = 'Gemini';
    else astro_sign = 'Cancer';
  } else if (month == '07' || month == 7) {
    if (day < 23) astro_sign = 'Cancer';
    else astro_sign = 'Leo';
  } else if (month == '08' || month == 8) {
    if (day < 23) astro_sign = 'Leo';
    else astro_sign = 'Virgo';
  } else if (month == '09' || month == 9) {
    if (day < 23) astro_sign = 'Virgo';
    else astro_sign = 'Libra';
  } else if (month == '10') {
    if (day < 23) astro_sign = 'Libra';
    else astro_sign = 'Scorpio';
  } else if (month == '11') {
    if (day < 22) astro_sign = 'scorpio';
    else astro_sign = 'Sagittarius';
  }

  return astro_sign;
};

export default ZodiacSignCalculator;
