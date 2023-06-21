const UtilCutomerSuccessBalancing = require("../utils/util-cutomer-success-balancing");
const CustomerSuccessBalancingService = require("../services/customer-success-balancing");

const { customerSuccessBalancing } = CustomerSuccessBalancingService;
const { buildSizeEntities, mapEntities, arraySeq } =
  UtilCutomerSuccessBalancing;

describe("CustomerSuccessBalancingTests", () => {
  test("Scenario 1", () => {
    const css = [
      { id: 1, score: 60 },
      { id: 2, score: 20 },
      { id: 3, score: 95 },
      { id: 4, score: 75 },
    ];
    const customers = [
      { id: 1, score: 90 },
      { id: 2, score: 20 },
      { id: 3, score: 70 },
      { id: 4, score: 40 },
      { id: 5, score: 60 },
      { id: 6, score: 10 },
    ];
    const csAway = [2, 4];

    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
  });

  test("Scenario 2", () => {
    const css = mapEntities([11, 21, 31, 3, 4, 5]);
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
    const csAway = [];

    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
  });

  test("Scenario 3", () => {
    const testTimeoutInMs = 100;
    const testStartTime = new Date().getTime();

    const css = mapEntities(arraySeq(999, 1));
    const customers = buildSizeEntities(10000, 998);
    const csAway = [999];

    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

    if (new Date().getTime() - testStartTime > testTimeoutInMs) {
      throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
    }
  });

  test("Scenario 4", () => {
    const css = mapEntities([1, 2, 3, 4, 5, 6]);
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
    const csAway = [];

    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
  });

  test("Scenario 5", () => {
    const css = mapEntities([100, 2, 3, 6, 4, 5]);
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
    const csAway = [];

    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
  });

  test("Scenario 6", () => {
    const css = mapEntities([100, 99, 88, 3, 4, 5]);
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
    const csAway = [1, 3, 2];

    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
  });

  test("Scenario 7", () => {
    const css = mapEntities([100, 99, 88, 3, 4, 5]);
    const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
    const csAway = [4, 5, 6];

    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
  });

  test("Scenario 8", () => {
    const css = mapEntities([60, 40, 95, 75]);
    const customers = mapEntities([90, 70, 20, 40, 60, 10]);
    const csAway = [2, 4];
    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0); //test errors
  });
  
  test("Scenario 9", () => {
    const css = mapEntities([50, 30, 70, 40]);
    const customers = mapEntities([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    const csAway = [3];
  
    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(2);
  });
  
  test("Scenario 10", () => {
    const css = mapEntities([100, 90, 80, 70, 60]);
    const customers = mapEntities([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    const csAway = [];
  
    expect(customerSuccessBalancing(css, customers, csAway)).toEqual(5);
  });
});
