"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function Home() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary" isLoading>
          Loading...
        </Button>
      </div>
      <div className="w-80">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter bet amount"
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            if (/^\d*$/.test(newValue)) {
              setValue(newValue);
            }
          }}
          onBlur={() => {
            if (value && Number(value) < 1) {
              setError("Bet amount must be at least 1");
            } else {
              setError(undefined);
            }
          }}
          error={error}
        />
      </div>
    </div>
  );
}
