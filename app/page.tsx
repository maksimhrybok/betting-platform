import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" isLoading>
        Loading...
      </Button>
    </div>
  );
}
