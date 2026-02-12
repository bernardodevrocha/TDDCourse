import { DateRange } from "./date_range";

describe("DateRange Value Object", () => {
  it("should create an instance of DateRange with the begining and finishing data, and verify the output of this data", () => {
    const startDate = new Date("2025-12-20");
    const endDate = new Date("2025-12-25");
    const dateRange = new DateRange(startDate, endDate);
    expect(dateRange.getStartDate()).toEqual(startDate);
    expect(dateRange.getEndDate()).toEqual(endDate);
  })

  it("deve lançar um erro se a data de término for antes da data de início", () => {
    expect(()  => {
      new DateRange(new Date("2024-12-25"), new Date("2024-12-10"));
    }).toThrow("A data de término deve ser maior que à de início.")
  })

  it("deve calcular o total de noites corretamente", () => {
    const startDate = new Date("2025-12-20");
    const endDate = new Date("2025-12-25");
    const dateRange = new DateRange(startDate, endDate);

    const totalNights = dateRange.getTotalNights();

    expect(totalNights).toBe(5);
  })

  it("deve verificar se dois intervalos de datas se sobrepõem", () => {
    const dateRange1 = new DateRange( new Date("2025-12-20"), new Date("2025-12-25"));

    const dateRange2 = new DateRange(new Date("2025-12-22"), new Date("2025-12-27"));

    const overlaps = dateRange1.overlaps(dateRange2);

    expect(overlaps).toBe(true);
  });

  it("deve verificar se dois intervalos ficam no mesmo dia", () => {
    const date = new Date("2025-12-20");
    expect(() => {
      new DateRange(date, date);
    }).toThrow("A data de término e início não podem ser iguais.");
  });
})