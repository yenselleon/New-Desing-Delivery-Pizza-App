import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { PlusCircle, Users, Pizza, Settings } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button className="w-full justify-start">
          <PlusCircle className="mr-2 size-4" />
          New Order
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 size-4" />
          Manage Drivers
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Pizza className="mr-2 size-4" />
          Menu Items
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Settings className="mr-2 size-4" />
          Settings
        </Button>
      </CardContent>
    </Card>
  );
}
