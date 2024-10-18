import { includes, is } from 'ramda';

/**
 * Determine if the value is a measure unit.
 */
export function isMeasureUnit(value: unknown): boolean {
  return is(String, value) && includes(value, ['none', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
}

/**
 * Determine if the value is a font size unit.
 */
export function isFontSizeUnit(value: unknown): boolean {
  return (
    is(String, value) &&
    includes(value, [
      'fp',
      'fps',
      'f1',
      'f1s',
      'f2',
      'f2s',
      'f3',
      'f3s',
      'f4',
      'f4s',
      'f5',
      'f5s',
      'f6',
      'f6s',
      'f7',
      'f7s',
    ])
  );
}
