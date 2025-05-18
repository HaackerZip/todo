"use client";

import { Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid, Bar, ComposedChart } from "recharts";

const data = [
  {
    date: "2024-03-01",
    sales: 1200,
    orders: 15,
    returns: 1,
    completed: 12,
    pending: 2,
    cancelled: 1,
    products: {
      "Skateboard Professional Baker": 5,
      "Independent Trucks 149mm": 6,
      "Spitfire Formula Four Wheels": 4
    }
  },
  {
    date: "2024-03-05",
    sales: 1800,
    orders: 22,
    returns: 2,
    completed: 18,
    pending: 3,
    cancelled: 1,
    products: {
      "Skateboard Professional Baker": 8,
      "Independent Trucks 149mm": 9,
      "Spitfire Formula Four Wheels": 5
    }
  },
  {
    date: "2024-03-10",
    sales: 1400,
    orders: 18,
    returns: 1,
    completed: 15,
    pending: 2,
    cancelled: 1,
    products: {
      "Skateboard Professional Baker": 6,
      "Independent Trucks 149mm": 7,
      "Spitfire Formula Four Wheels": 5
    }
  },
  {
    date: "2024-03-15",
    sales: 2200,
    orders: 28,
    returns: 3,
    completed: 22,
    pending: 4,
    cancelled: 2,
    products: {
      "Skateboard Professional Baker": 10,
      "Independent Trucks 149mm": 11,
      "Spitfire Formula Four Wheels": 7
    }
  },
  {
    date: "2024-03-20",
    sales: 1900,
    orders: 24,
    returns: 2,
    completed: 19,
    pending: 3,
    cancelled: 2,
    products: {
      "Skateboard Professional Baker": 8,
      "Independent Trucks 149mm": 9,
      "Spitfire Formula Four Wheels": 7
    }
  },
  {
    date: "2024-03-25",
    sales: 2400,
    orders: 30,
    returns: 3,
    completed: 24,
    pending: 4,
    cancelled: 2,
    products: {
      "Skateboard Professional Baker": 11,
      "Independent Trucks 149mm": 12,
      "Spitfire Formula Four Wheels": 7
    }
  },
  {
    date: "2024-03-30",
    sales: 2800,
    orders: 35,
    returns: 4,
    completed: 28,
    pending: 5,
    cancelled: 2,
    products: {
      "Skateboard Professional Baker": 13,
      "Independent Trucks 149mm": 14,
      "Spitfire Formula Four Wheels": 8
    }
  },
];

interface OverviewProps {
  type?: 'sales' | 'orders';
}

export function Overview({ type = 'sales' }: OverviewProps) {
  if (type === 'sales') {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#1E293B] p-4 rounded-lg border border-gray-700">
                      <p className="text-white font-semibold mb-2">{payload[0].payload.date}</p>
                      <p className="text-[#38BDF8]">Sales: ${payload[0].value}</p>
                      <p className="text-yellow-500">Returns: ${payload[1]?.value ? (Number(payload[1].value) * 100) : 0}</p>
                      <div className="mt-2 pt-2 border-t border-gray-700">
                        <p className="text-gray-400 text-sm mb-1">Top Products:</p>
                        {Object.entries(payload[0].payload.products).map(([name, quantity]) => (
                          <p key={name} className="text-gray-300 text-sm">
                            {name}: {quantity as number} units
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#38BDF8"
              strokeWidth={2}
              dot={false}
              name="Revenue"
            />
            <Bar
              yAxisId="right"
              dataKey="returns"
              fill="#EAB308"
              radius={[4, 4, 0, 0]}
              name="Returns"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="date"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-[#1E293B] p-4 rounded-lg border border-gray-700">
                    <p className="text-white font-semibold mb-2">{payload[0].payload.date}</p>
                    <p className="text-[#38BDF8]">Total Orders: {payload[0].value}</p>
                    <p className="text-green-500">Completed: {payload[0].payload.completed}</p>
                    <p className="text-yellow-500">Pending: {payload[0].payload.pending}</p>
                    <p className="text-red-500">Cancelled: {payload[0].payload.cancelled}</p>
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <p className="text-gray-400 text-sm mb-1">Order Details:</p>
                      {Object.entries(payload[0].payload.products).map(([name, quantity]) => (
                        <p key={name} className="text-gray-300 text-sm">
                          {name}: {quantity as number} units
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar
            dataKey="completed"
            stackId="orders"
            fill="#22C55E"
            radius={[4, 4, 0, 0]}
            name="Completed"
          />
          <Bar
            dataKey="pending"
            stackId="orders"
            fill="#EAB308"
            radius={[4, 4, 0, 0]}
            name="Pending"
          />
          <Bar
            dataKey="cancelled"
            stackId="orders"
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
            name="Cancelled"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#38BDF8"
            strokeWidth={2}
            dot={false}
            name="Total Orders"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}