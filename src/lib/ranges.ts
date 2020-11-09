export const baseRange: {[key: string]: [number,number]} = {
  Bass: [60, 249],
  "Low Midrange": [250, 499],
  Midrange: [500, 1999],
  "Upper Midrange": [2000, 3999],
  Presence: [4000, 5999],
  Brilliance: [6000, 20000],
};

export const subRange = (range: [number,number]): number[][] => {
  let diff = Math.round((range[1],range[0])/5);
  return Array(5).fill(0).map((n,i) => {
    // [r0+d*i,r0+diff*(i+1)-1] -> eg [300,399]
    return [range[0]+diff *i,range[0] + diff * (i+1)-1]
  })
}