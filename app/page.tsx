// "use client";
// import { Button } from "@/components/ui/Button";
// import { Card } from "@/components/ui/Card";
// import { Input } from "@/components/ui/Input";
// import { Badge } from "@/components/ui/Badge";
// import React, { useState } from "react";

// export default function Home() {
//   const [value, setValue] = useState("");
//   const [error, setError] = useState<string | undefined>();

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center gap-8">
//       <div className="flex gap-4">
//         <Button variant="primary">Primary</Button>
//         <Button variant="destructive">Destructive</Button>
//         <Button variant="outline">Outline</Button>
//         <Button variant="ghost">Ghost</Button>
//         <Button variant="primary" isLoading>
//           Loading...
//         </Button>
//       </div>
//       <div className="w-80">
//         <Input
//           type="text"
//           inputMode="numeric"
//           pattern="[0-9]*"
//           placeholder="Enter bet amount"
//           value={value}
//           onChange={(e) => {
//             const newValue = e.target.value;
//             if (/^\d*$/.test(newValue)) {
//               setValue(newValue);
//             }
//           }}
//           onBlur={() => {
//             if (value && Number(value) < 1) {
//               setError("Bet amount must be at least 1");
//             } else {
//               setError(undefined);
//             }
//           }}
//           error={error}
//         />
//       </div>
//       <Card className="w-96">
//         <h3 className="text-lg font-bold text-white mb-2">Manchester United vs Chelsea</h3>
//         <Badge variant="success">Live</Badge>
//         <div className="flex gap-4">
//           <Button size="sm" variant="outline">1.50</Button>
//           <Button size="sm" variant="outline">2.00</Button>
//           <Button size="sm" variant="outline">3.20</Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";
import { BetSlip } from "@/components/features/BetSlip";
import { Button } from "@/components/ui/Button";
import { useBetSlipStore } from "@/store/betSlipStore";

export default function Home() {
  const addBet = useBetSlipStore((state) => state.addBet);

  const handleAddTestBet = () => {
    addBet({
      id: crypto.randomUUID(),
      match: "Manchester United vs Chelsea",
      outcome: "Manchester United to win",
      odds: 2.5,
      stake: 10,
    });
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8">
      <Button variant="primary" onClick={handleAddTestBet}>
        + Add Test Bet
      </Button>
      <BetSlip />
    </div>
  );
}
