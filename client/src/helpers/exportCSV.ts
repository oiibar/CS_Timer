import Papa from "papaparse";

export const exportSessionsToCSV = (sessions: any[]) => {
    const csv = Papa.unparse(sessions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sessions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
};
