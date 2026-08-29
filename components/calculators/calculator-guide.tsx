import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FrequentlyAskedQuestion {
  question: string;
  answer: string;
}

export interface CalculatorGuideProps {
  notes: string[];
  formulaTitle: string;
  formula: string[];
  faqs: FrequentlyAskedQuestion[];
}

export function CalculatorGuide({ notes, formulaTitle, formula, faqs }: CalculatorGuideProps) {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertTitle>참고사항</AlertTitle>
        <AlertDescription>
          <ul className="list-disc space-y-2 pl-5">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>{formulaTitle}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm leading-6 text-muted-foreground">
          {formula.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>자주 묻는 질문</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question} className="space-y-2">
              <h3 className="text-base font-semibold">{faq.question}</h3>
              <p className="text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
