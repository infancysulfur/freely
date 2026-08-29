import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface ResultCardProps {
  title: string;
  value: string;
  description?: string;
  criteria?: string[];
}

export function ResultCard({ title, value, description, criteria = [] }: ResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-3xl font-semibold tracking-normal">{value}</p>
        {criteria.length > 0 ? (
          <dl className="space-y-1 text-sm text-muted-foreground">
            {criteria.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </dl>
        ) : null}
      </CardContent>
    </Card>
  );
}
