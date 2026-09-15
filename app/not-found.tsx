import Link from "next/link";
import { Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            This page took a wrong turn.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Here&apos;s the way
            back.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Back to Creativoxa
            </Link>
            <Link href="/services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-sm text-muted">
              Looking for something specific?{" "}
              <Link href="/contact" className="font-semibold text-primary hover:text-primary-hover">
                Send us an enquiry
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
