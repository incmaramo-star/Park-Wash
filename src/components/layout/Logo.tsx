import Image from "next/image";

type LogoProps = {
  variant?: "primary" | "mono-white" | "wordmark";
  priority?: boolean;
};

const logoByVariant = {
  primary: "/brand/logo/park-and-wash-primary.svg",
  "mono-white": "/brand/logo/park-and-wash-mono-white.svg",
  wordmark: "/brand/logo/park-and-wash-wordmark.svg"
} satisfies Record<NonNullable<LogoProps["variant"]>, string>;

export function Logo({ variant = "primary", priority = false }: LogoProps) {
  const isWordmark = variant === "wordmark";

  return (
    <Image
      alt="Park&Wash"
      className={isWordmark ? "block h-auto w-40" : "block h-auto w-16"}
      height={isWordmark ? 100 : 720}
      priority={priority}
      src={logoByVariant[variant]}
      unoptimized
      width={isWordmark ? 440 : 600}
    />
  );
}
