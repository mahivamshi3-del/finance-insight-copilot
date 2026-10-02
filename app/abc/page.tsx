"use client";

import { useState } from "react";

type Activity = {
  name: string;
  totalCost: number;
  totalDriverUnits: number;
  productDriverUnits: number;
};

export default function ABC() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      name: "Machine Setup",
      totalCost: 500000,
      totalDriverUnits: 100,
      productDriverUnits: 25,
    },
    {
      name: "Quality Inspection",
      totalCost: 300000,
      totalDriverUnits: 600,
      productDriverUnits: 120,
    },
    {
      name: "Order Processing",
      totalCost: 200000,
      totalDriverUnits: 1000,
      productDriverUnits: 150,
    },
  ]);

  const totalAllocatedCost = activities.reduce((total, activity) => {
    const costPerDriver =
      activity.totalDriverUnits > 0
        ? activity.totalCost / activity.totalDriverUnits
        : 0;

    return total + costPerDriver * activity.productDriverUnits;
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          ABC Profitability Analyzer
        </h1>

        <p className="text-slate-400 mb-8">
          Activity-Based Costing analysis for product-level cost allocation
        </p>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Activity Cost Pools
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-slate-700 text-slate-400">
                  <th className="p-3">Activity</th>
                  <th className="p-3">Total Cost</th>
                  <th className="p-3">Total Driver Units</th>
                  <th className="p-3">Product Driver Units</th>
                  <th className="p-3">Allocated Cost</th>
                </tr>
              </thead>

              <tbody>

                {activities.map((activity, index) => {

                  const costPerDriver =
                    activity.totalDriverUnits > 0
                      ? activity.totalCost / activity.totalDriverUnits
                      : 0;

                  const allocatedCost =
                    costPerDriver * activity.productDriverUnits;

                  return (
                    <tr
                      key={index}
                      className="border-b border-slate-800"
                    >

                      <td className="p-3 font-medium">
                        {activity.name}
                      </td>

                      <td className="p-3">
                        ₹{activity.totalCost.toLocaleString("en-IN")}
                      </td>

                      <td className="p-3">
                        {activity.totalDriverUnits}
                      </td>

                      <td className="p-3">
                        {activity.productDriverUnits}
                      </td>

                      <td className="p-3 font-semibold">
                        ₹{allocatedCost.toLocaleString("en-IN")}
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

        <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <p className="text-slate-400">
            Total ABC Allocated Cost
          </p>

          <p className="text-3xl font-bold mt-2">
            ₹{totalAllocatedCost.toLocaleString("en-IN")}
          </p>

        </div>

        <div className="mt-8 bg-slate-900 rounded-2xl border border-slate-800 p-6">

          <h2 className="text-2xl font-semibold mb-3">
            How ABC Works
          </h2>

          <p className="text-slate-400">
            ABC assigns indirect costs to products based on the activities
            and resources consumed by those products.
          </p>

        </div>

      </div>
    </main>
  );
}