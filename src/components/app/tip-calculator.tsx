"use client";

import { useState, useMemo } from "react";
import { DollarSign, Users, Percent, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const tipOptions = [15, 18, 20, 25];

export function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState<number | "custom">(18);
  const [customTip, setCustomTip] = useState("");
  const [people, setPeople] = useState("1");
  const [currency, setCurrency] = useState("$");

  const billAmount = useMemo(() => parseFloat(bill) || 0, [bill]);
  const numPeople = useMemo(() => parseInt(people, 10) || 1, [people]);

  const tipPercentage = useMemo(() => {
    if (tip === "custom") {
      return parseFloat(customTip) || 0;
    }
    return tip;
  }, [tip, customTip]);

  const { tipPerPerson, totalPerPerson } = useMemo(() => {
    if (billAmount <= 0 || numPeople <= 0) {
      return { tipPerPerson: 0, totalPerPerson: 0 };
    }
    const tipValue = billAmount * (tipPercentage / 100);
    const totalValue = billAmount + tipValue;
    const tipPer = tipValue / numPeople;
    const totalPer = totalValue / numPeople;

    return { tipPerPerson: tipPer, totalPerPerson: totalPer };
  }, [billAmount, tipPercentage, numPeople]);

  const handleReset = () => {
    setBill("");
    setTip(18);
    setCustomTip("");
    setPeople("1");
  };

  const formatCurrency = (value: number) => {
    return isNaN(value) || !isFinite(value) ? "0.00" : value.toFixed(2);
  };
  
  return (
    <Card className="w-full max-w-4xl shadow-2xl shadow-primary/10">
      <CardContent className="p-4 sm:p-8 grid md:grid-cols-2 gap-8">
        <div className="space-y-6 sm:space-y-8">
          <div>
            <Label htmlFor="bill" className="text-base">Bill Amount</Label>
            <div className="mt-2 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-auto h-auto p-0 border-none bg-transparent focus:ring-0 text-muted-foreground text-lg">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="$">$ USD</SelectItem>
                        <SelectItem value="€">€ EUR</SelectItem>
                        <SelectItem value="£">£ GBP</SelectItem>
                        <SelectItem value="¥">¥ JPY</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <Input
                id="bill"
                type="number"
                placeholder="0.00"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                className="pl-16 pr-4 py-6 text-2xl text-right font-semibold"
                min="0"
              />
            </div>
          </div>

          <div>
            <Label className="text-base">Select Tip %</Label>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {tipOptions.map((option) => (
                <Button
                  key={option}
                  onClick={() => {
                    setTip(option);
                    setCustomTip("");
                  }}
                  variant={tip === option ? "default" : "secondary"}
                  className="py-6 text-lg"
                >
                  {option}%
                </Button>
              ))}
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Custom"
                  value={customTip}
                  onChange={(e) => {
                    setCustomTip(e.target.value);
                    setTip("custom");
                  }}
                  className={cn("py-6 text-lg text-center", tip === 'custom' && 'ring-2 ring-primary')}
                />
                 <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="people" className="text-base">Number of People</Label>
            <div className="mt-2 relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="people"
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="pl-12 pr-4 py-6 text-2xl text-center font-semibold"
                min="1"
              />
            </div>
          </div>
        </div>

        <div className="bg-accent text-accent-foreground rounded-xl p-6 sm:p-8 flex flex-col space-y-8">
            <div className="flex-grow space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg">Tip Amount</p>
                        <p className="text-sm opacity-75">/ person</p>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold tracking-tighter">
                        {currency}
                        <span className="transition-all duration-300">
                          {formatCurrency(tipPerPerson)}
                        </span>
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-medium">Total</p>
                        <p className="text-sm opacity-75">/ person</p>
                    </div>
                    <p className="text-4xl sm:text-5xl font-bold tracking-tighter">
                        {currency}
                        <span className="transition-all duration-300">
                          {formatCurrency(totalPerPerson)}
                        </span>
                    </p>
                </div>
            </div>
            <Button 
                onClick={handleReset} 
                variant="secondary" 
                className="w-full h-14 text-lg bg-accent-foreground/10 hover:bg-accent-foreground/20 text-accent-foreground"
                disabled={bill === "" && people === "1" && tip === 18}
            >
                <RotateCcw className="mr-2 h-5 w-5" />
                Reset
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
