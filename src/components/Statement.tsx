import { Card } from './ui/card';
import { Spotlight } from './ui/spotlight';
import { GooeyText } from './ui/gooey-text-morphing';
import { Reveal } from '../lib/motion';

// Module-level so the array identity is stable — an inline literal re-created
// each render would reset GooeyText's effect (its deps include `texts`) and
// the morph could never complete its first cooldown.
const GOOEY_WORDS = ['FULL-STACK', 'TEST-DRIVEN', 'PRECISE', 'PERFORMANT'];

// Spotlight statement band — pairs the aceternity Spotlight + shadcn Card with
// a gooey morphing word so the crimson accent sweeps across a single strong line.
export default function Statement() {
  return (
    <section className="relative z-[5] px-5 sm:px-8 py-16 sm:py-[90px]">
      <Reveal variant="scale">
        <Card className="relative w-full overflow-hidden border-line bg-black/[0.96] min-h-[360px] flex">
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#c2303d" />

          <div className="relative z-10 flex flex-col md:flex-row items-center w-full gap-8 p-6 sm:p-10 md:p-16">
            <div className="flex-1">
              <p className="font-mono text-[11px] tracking-[0.3em] text-accent mb-4">— THE ETHOS</p>
              <h2 className="font-display font-extrabold leading-[0.95] tracking-[-0.02em] text-paper" style={{ fontSize: 'clamp(34px,5vw,68px)' }}>
                Interfaces that feel<br /><span className="font-serif italic font-normal text-accent">deliberate.</span>
              </h2>
              <p className="mt-5 max-w-md text-paper/55 text-[15px] leading-[1.6]">
                Every component earns its place — measured spacing, intentional motion, and state that always reads clearly.
              </p>
            </div>

            <div className="flex-1 h-[130px] sm:h-[200px] flex items-center justify-center w-full">
              <GooeyText
                texts={GOOEY_WORDS}
                morphTime={1}
                cooldownTime={1.1}
                className="h-[90px] sm:h-[120px] flex items-center justify-center w-full"
                textClassName="font-display font-extrabold tracking-[-0.03em] text-accent text-3xl sm:text-5xl md:text-6xl"
              />
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
