import * as React from "react";
import { useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";

export default function ReferenceDateExplicitDateTimePicker({
  setStartDateValue,
  setEndDateValue,
}) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      const startDateValue = startDate.format("YYYY-MM-DD");
      const endDateValue = endDate.format("YYYY-MM-DD");
      setStartDateValue(startDateValue);
      setEndDateValue(endDateValue);

      sessionStorage.setItem("start", startDateValue);
      sessionStorage.setItem("end", endDateValue);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    const storedStartDate = sessionStorage.getItem("start");
    const storedEndDate = sessionStorage.getItem("end");
    setStartDateValue(storedStartDate)
    setEndDateValue(storedEndDate)
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h1 className="text-2xl">NASA Near Earth Objects (NEO) Fetcher</h1>
      <div className="flex justify-center space-x-4 mt-8">
        <DatePicker
          label={"Start Date"}
          value={startDate}
          onChange={setStartDate}
        />
        <DatePicker label={"End Date"} value={endDate} onChange={setEndDate} />
      </div>
    </LocalizationProvider>
  );
}
