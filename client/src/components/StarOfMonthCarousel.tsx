import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const monthlyStars = [
  {
    id: "xander",
    image: "/images/news/xander-september-2026.webp",
    prefix: "starOfMonthSeptember",
    loves: 4,
  },
  {
    id: "arturo",
    image: "/images/news/arturo.webp",
    prefix: "starOfMonth",
    loves: 5,
  },
] as const;

const SHARE_YOUR_STORY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdUyQYZiOEHNsuywUdwtFFsM1-3bV2AZv1OtjsRYRfMltaSoA/viewform?usp=sharing&ouid=100823584681284292020";

export default function StarOfMonthCarousel() {
  const { t } = useTranslation();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!carouselApi) return;

    const rotation = window.setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 8000);

    return () => window.clearInterval(rotation);
  }, [carouselApi]);

  return (
    <section id="star-of-the-month" className="bg-muted px-4 py-16 sm:px-6 sm:py-24" data-testid="section-star-of-month">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <Star className="h-6 w-6 fill-[#E67E5C] text-[#E67E5C]" aria-hidden="true" />
          </div>
          <h2 className="mb-2 font-heading text-2xl font-bold text-foreground sm:text-3xl" data-testid="text-star-of-month-title">
            {t("events.starOfMonthTitle")}
          </h2>
          <p className="text-muted-foreground">{t("events.starOfMonthSubtitle")}</p>
          <Button className="mt-5" asChild data-testid="button-star-share-your-story">
            <a href={SHARE_YOUR_STORY_URL} target="_blank" rel="noopener noreferrer">
              {t("events.shareYourStory")}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <Carousel
          setApi={setCarouselApi}
          opts={{ loop: true }}
          className="px-8 sm:px-12"
          aria-label={t("events.starCarouselLabel")}
        >
          <CarouselContent>
            {monthlyStars.map((star) => (
              <CarouselItem key={star.id}>
                <Card className="overflow-hidden" data-testid={`card-star-of-month-${star.id}`}>
                  <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
                    <div className="bg-muted">
                      <img
                        src={star.image}
                        alt={t(`events.${star.prefix}ImageAlt`)}
                        className="h-full min-h-[320px] w-full object-cover object-center"
                        data-testid={`img-star-of-month-${star.id}`}
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                            {t(`events.${star.prefix}Date`)}
                          </p>
                          <h3 className="mt-1 font-heading text-3xl font-bold text-foreground">
                            {t(`events.${star.prefix}Name`)}
                          </h3>
                        </div>
                        <dl className="flex gap-5 text-sm">
                          <div>
                            <dt className="font-semibold text-muted-foreground">{t("events.starOfMonthAgeLabel")}</dt>
                            <dd className="mt-1 font-bold text-foreground">{t(`events.${star.prefix}Age`)}</dd>
                          </div>
                          <div>
                            <dt className="font-semibold text-muted-foreground">{t("events.starOfMonthCountryLabel")}</dt>
                            <dd className="mt-1 font-bold text-foreground">{t(`events.${star.prefix}Country`)}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <div>
                          <h4 className="font-heading text-lg font-bold text-foreground">
                            {t(`events.${star.prefix}LovesTitle`)}
                          </h4>
                          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                            {Array.from({ length: star.loves }, (_, index) => (
                              <li key={index}>• {t(`events.${star.prefix}Love${index + 1}`)}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-heading text-lg font-bold text-foreground">
                            {t(`events.${star.prefix}JourneyTitle`)}
                          </h4>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {t(`events.${star.prefix}Journey1`)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                        {t(`events.${star.prefix}Journey2`)}
                      </p>
                      <p className="mt-4 text-base font-medium leading-relaxed text-foreground">
                        {t(`events.${star.prefix}Closing`)}
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" aria-label={t("events.previousStar")} />
          <CarouselNext className="right-0" aria-label={t("events.nextStar")} />
        </Carousel>
      </div>
    </section>
  );
}