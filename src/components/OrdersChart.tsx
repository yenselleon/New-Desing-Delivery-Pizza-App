import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { day: "Mon", orders: 45, revenue: 680 },
  { day: "Tue", orders: 52, revenue: 780 },
  { day: "Wed", orders: 48, revenue: 720 },
  { day: "Thu", orders: 65, revenue: 980 },
  { day: "Fri", orders: 88, revenue: 1320 },
  { day: "Sat", orders: 95, revenue: 1425 },
  { day: "Sun", orders: 78, revenue: 1170 },
];

export function OrdersChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
        <CardDescription>Orders and revenue for the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius-md)",
              }}
            />
            <Line 
              type="monotone" 
              dataKey="orders" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Orders"
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="Revenue ($)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
