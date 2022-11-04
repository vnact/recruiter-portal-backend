import { ExpLevel } from './enum';

export const experienceMap = [
  ExpLevel.NoExp,
  ExpLevel.LessThanOne,
  ExpLevel.OnePlus,
  ExpLevel.TwoPlus,
  ExpLevel.ThreePlus,
  ExpLevel.FourPlus,
  ExpLevel.FivePlus,
];

export function getAllowedExperience(exp: ExpLevel): ExpLevel[] {
  const expIndex = experienceMap.indexOf(exp);
  if (expIndex == -1) return experienceMap;
  const expMap = experienceMap.slice(0, expIndex + 1);
  return expMap;
}
