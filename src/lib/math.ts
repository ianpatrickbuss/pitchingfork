export const rand = (min, max) => {
  return Math.round(Math.random() * max + min);
};

export const between = (val: number, comp: number[]): boolean => {
  return val>comp[0] && val<comp[1]
}

export const randomRange = ():number => {
  if(rand(0,10)<=8) {
    return rand(60,2000);
  }
  return rand(2000,20000);
}