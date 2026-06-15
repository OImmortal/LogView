import React from "react";

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
}

export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-outline-variant">
      <table className="w-full text-sm text-left">
        <thead className="bg-surface-container-high text-slate-400 uppercase text-xs">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-t border-outline-variant hover:bg-surface-container-low transition-colors"
            >
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-on-surface">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
