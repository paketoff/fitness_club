import { differenceInMinutes, formatDuration, parseISO } from "date-fns";
import { ValueTransformer } from "typeorm";


export class DurationTransformer implements ValueTransformer {
  to(value: number): string {
    return formatDuration({ minutes: value });
  }

  from(value: string): number {
    const durationDate = parseISO(`1970-01-01T${value}Z`);
    return differenceInMinutes(durationDate, new Date(0));
  }
}
