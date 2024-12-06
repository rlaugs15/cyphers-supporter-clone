import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface NoticeProps {
  title: string;
  children: React.ReactNode;
}

function Notice({ title, children }: NoticeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{children}</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default Notice;
