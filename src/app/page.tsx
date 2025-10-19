import { TipCalculator } from '@/components/app/tip-calculator';
import { Logo } from '@/components/icons/logo';

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col justify-center items-center bg-background p-4 sm:p-6 lg:p-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-20%] h-[50vw] w-[50vw] max-h-96 max-w-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-[-20%] right-[-20%] h-[50vw] w-[50vw] max-h-96 max-w-96 rounded-full bg-accent/10 blur-3xl"></div>
      </div>
      <main className="z-10 flex flex-col items-center w-full">
        <div className="flex items-center gap-3 mb-8">
          <Logo className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-headline font-bold tracking-tighter text-foreground sm:text-5xl">
            TipSplit
          </h1>
        </div>
        <TipCalculator />
      </main>
      <footer className="z-10 mt-8 text-center text-muted-foreground text-sm">
        <p>
          Designed & Built for a world-class tipping experience.
        </p>
      </footer>
    </div>
  );
}
