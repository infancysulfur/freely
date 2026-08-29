import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface CalculatorCardProps {
  title: string;
  description: string;
  href: string;
}

export function CalculatorCard({ title, description, href }: CalculatorCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full transition-colors hover:bg-secondary">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
