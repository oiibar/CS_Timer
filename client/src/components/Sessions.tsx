import { FC } from "react";

const Sessions: FC = () => {
  return (
    <aside className="bg-slate-700 h-screen max-w-64 p-4">
      <table className="table-auto text-center border-2 border-slate-800">
        <thead>
          <tr>
            <th className="px-2 py-2">Time</th>
            <th className="px-2 py-2">ao5</th>
            <th className="px-2 py-2">ao12</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-2">4.73</td>
            <td className="px-2 py-2">5</td>
            <td className="px-2 py-2">6</td>
          </tr>
          <tr>
            <td className="px-2 py-2">4.73</td>
            <td className="px-2 py-2">5</td>
            <td className="px-2 py-2">6</td>
          </tr>
          <tr>
            <td className="px-2 py-2">4.73</td>
            <td className="px-2 py-2">5</td>
            <td className="px-2 py-2">6</td>
          </tr>
        </tbody>
      </table>
    </aside>
  );
};

export default Sessions;
