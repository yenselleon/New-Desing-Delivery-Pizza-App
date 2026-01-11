import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, DollarSign, TrendingUp, Clock } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  changeType: "positive" | "negative";
}

function StatCard({ title, value, change, icon, changeType }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="mb-1">{value}</div>
        <p className="text-muted-foreground">
          <span className={changeType === "positive" ? "text-green-600" : "text-red-600"}>
            {change}
          </span>{" "}
          from last week
        </p>
      </CardContent>
    </Card>
  );
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Orders",
      value: "1,284",
      change: "+12.5%",
      icon: <Package className="size-4" />,
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: "$18,420",
      change: "+8.2%",
      icon: <DollarSign className="size-4" />,
      changeType: "positive" as const,
    },
    {
      title: "Avg. Delivery Time",
      value: "28 min",
      change: "-5.1%",
      icon: <Clock className="size-4" />,
      changeType: "positive" as const,
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      change: "+4.3%",
      icon: <TrendingUp className="size-4" />,
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
