(() => {
  const mockData = (n: number): ScoreCardType[] => {
    let c = 0;
    let data = [];
    while (c < n) {
      let baseAnswer = Object.keys(baseRange)[
        rand(0, Object.keys(baseRange).length - 1)
      ];
      let real = rand(0, 20) < 17;
      let Hz = real ? rand(...baseRange[baseAnswer]) : rand(60, 20000);
      data.push({
        Hz,
        baseAnswer,
        subAnswer:
          rand(0, 4) > 1 ? subRange(baseRange[baseAnswer])[rand(0, 4)] : [],
      });
      c++;
    }
    return data;
  };
  q = rand(10, 40);
  answers = mockData(q);
  qPage = q;
  setup = true;
})();
