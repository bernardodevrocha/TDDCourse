export class DateRange{
  private readonly startDate: Date;
  private readonly endDate: Date;

  constructor(startDate: Date, endDate: Date){
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }
  getStartDate(): Date {
    return this.startDate;
  }

  getTotalNights(): number{
    const diffTime = this.endDate.getTime() - this.startDate.getTime();
    return Math.ceil(diffTime / (1000 * 3600 * 24));
  }

  overlaps(other: DateRange): boolean {
    return(
        this.startDate < other.endDate && other.getStartDate() > this.endDate
    )
  }

  private validateDates(startDate: Date, endDate: Date){
    if(startDate == endDate){
      throw new Error("A data de início e termino não podem ser iguais.")
    }

    if(endDate < startDate){
      throw new Error("A data de término deve ser posterior à data de início.")
    }
  }
}