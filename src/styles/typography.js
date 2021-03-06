import { typeScale, color, scale } from './variables'

export const type = {
  t1: undefined,
  t2: {
    fontSize: typeScale.f4,
    fontWeight: 600,
  },
  t5: {
    fontWeight: 600,
    fontSize: typeScale.f5,
    color: color.black,
    margin: `0 0 ${scale.s1}px 0`,
  },
  t6: {
    fontSize: typeScale.f6,
    color: color.lightSilver,
    margin: `0 0 ${scale.s2}px 0`,
  },
}