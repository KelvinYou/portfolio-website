"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { UnifiedSectionHeader } from "@/components/base/unified-section-header";
import Image from "next/image";
import Link from "next/link";
import { aboutProofPoints, personalInfo } from "@/constants";
import { fadeIn, defaultViewport } from "@/lib/animations";
import { useTranslations } from "next-intl";

/**
 * Two blocks used to live here and both were cut rather than restyled.
 *
 * `workSteps` (01 messy problem / 02 design a system / 03 ship it) said what
 * every engineer says about their own process — and restated the section's
 * own subtitle while doing it. `topTechs` listed eight technologies one
 * scroll above SkillsSection, which is the component that owns that list.
 *
 * What is left is the text that only Kelvin could have written: three
 * figures, and the thing currently being built.
 */
export function AboutSection() {
  const t = useTranslations("sections");

  return (
    <section id="about" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* One header, not two. This section used to stack an "About Me" /
            "Learn more about my journey" header on top of an inner "How I
            Work" heading — the subtitle was template filler and contradicted
            the heading below it. The real heading is now the section's. */}
        <UnifiedSectionHeader
          title={t("about_heading")}
          subtitle={t("about_hook")}
        />

        {/* Capped width. The page container runs past 1900px on a wide
            display, and every proportion here was being multiplied by that:
            a 2-of-5 column became a 730px-wide photo, and a 4:5 frame turned
            that into a 900px-tall one. Measure, not fraction. */}
        <div className="mx-auto max-w-5xl">
          {/* Proof figures — a ruled ledger, not three dashboard tiles.
              Full width above the fold of the block, because these are the
              only hard numbers in the section. */}
          <motion.dl
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-3 divide-x divide-border border-y border-border"
          >
            {aboutProofPoints.map((point) => (
              <div
                key={point.labelKey}
                className="group px-4 py-6 first:pl-0 sm:px-6"
              >
                <dt
                  className="font-heading text-2xl font-extrabold tabular-nums leading-none tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary-ink sm:text-4xl"
                  style={{ letterSpacing: "-0.04em" }}
                >
                  {point.value}
                </dt>
                <dd className="mt-3 text-[10px] uppercase leading-snug tracking-[0.12em] text-muted-foreground sm:text-[11px]">
                  {t(point.labelKey)}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Portrait and live project sit in one row as siblings of matched
              height. The photo used to own a full column and dictate the
              section's height, which is what produced the void beside it. */}
          <div className="mt-8 grid gap-6 md:grid-cols-5 md:items-stretch">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="group relative order-2 aspect-square overflow-hidden rounded-3xl ring-1 ring-border shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] md:order-1 md:col-span-2 md:aspect-auto"
            >
              <Image
                src={personalInfo.profilePicture}
                alt={`Portrait of ${personalInfo.fullname}`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                /* Anchored on the face (~62% across, ~30% down in the source),
                 not on the top edge, so the crop holds the face high in the
                 frame instead of leading with the mountain behind it. */
                className="object-cover object-[62%_30%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                priority={false}
              />
              {/* Top scrim keeps the location pill legible; the bottom fade
                grounds the frame now that no text sits over it. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
              {/* Feathered vignette — fades the photo's own edges into the
                surrounding void instead of ending in a hard rectangle, so
                the card reads as blended-in rather than pasted-on. */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 100% at 50% 40%, transparent 55%, rgba(0,0,0,0.5) 100%)",
                }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06] transition-all duration-500 group-hover:ring-primary/20" />

              <p className="absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs text-neutral-200 backdrop-blur-md">
                <MapPin
                  className="h-3 w-3 shrink-0 text-primary-ink"
                  aria-hidden="true"
                />
                {personalInfo.contact.location}
              </p>
            </motion.div>

            {/* The section's one forward link. About is section 2 of 7, so a
              Contact button here asked for the sale before any proof and
              scrolled the reader past Skills, Projects and Experience to do
              it. The live pipeline has a featured project two sections down;
              that's the next click. */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="order-1 md:order-2 md:col-span-3"
            >
              <Link
                href="/#projects"
                className="group flex h-full flex-col justify-between rounded-3xl border border-primary/20 bg-primary/[0.05] p-6 transition-colors duration-300 hover:border-primary/40 hover:bg-primary/[0.09] sm:p-8"
              >
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-ink">
                    {t("about_current_label")}
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-foreground/85 sm:text-xl">
                    {t("about_current_detail")}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-ink">
                  {t("about_current_cta")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
