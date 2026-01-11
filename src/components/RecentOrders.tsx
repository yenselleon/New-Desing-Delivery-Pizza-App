import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Order {
  id: string;
  customer: string;
  items: string;
  total: string;
  status: "preparing" | "on-the-way" | "delivered" | "pending";
  time: string;
}

const orders: Order[] = [
  {
    id: "#3542",
    customer: "Sarah Johnson",
    items: "2x Margherita, 1x Pepperoni",
    total: "$42.50",
    status: "on-the-way",
    time: "12:34 PM",
  },
  {
    id: "#3541",
    customer: "Mike Thompson",
    items: "1x Supreme, 1x BBQ Chicken",
    total: "$38.00",
    status: "preparing",
    time: "12:28 PM",
  },
  {
    id: "#3540",
    customer: "Emma Wilson",
    items: "3x Vegetarian",
    total: "$51.75",
    status: "delivered",
    time: "12:15 PM",
  },
  {
    id: "#3539",
    customer: "James Brown",
    items: "1x Hawaiian, 1x Meat Lovers",
    total: "$45.00",
    status: "delivered",
    time: "12:02 PM",
  },
  {
    id: "#3538",
    customer: "Lisa Anderson",
    items: "2x Four Cheese",
    total: "$36.00",
    status: "pending",
    time: "11:58 AM",
  },
  {
    id: "#3537",
    customer: "David Lee",
    items: "1x Pepperoni, 1x Margherita, 1x Coke",
    total: "$39.50",
    status: "delivered",
    time: "11:45 AM",
  },
];

function getStatusColor(status: Order["status"]) {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "on-the-way":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "preparing":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "pending":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

function getStatusLabel(status: Order["status"]) {
  switch (status) {
    case "on-the-way":
      return "On the Way";
    case "preparing":
      return "Preparing";
    case "delivered":
      return "Delivered";
    case "pending":
      return "Pending";
  }
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest pizza delivery orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
