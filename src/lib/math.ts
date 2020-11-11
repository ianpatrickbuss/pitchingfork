export const rand = (min:number, max:number) => {
  let r = Math.random() * max
  return Math.round(r<min ? r+min : r);
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

export const percentage = (number: number): string => `${Math.round(number * 100)}%`;