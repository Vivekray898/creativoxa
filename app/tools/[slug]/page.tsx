import { supabase } from "@/lib/supabase";
import WordCounter from "@/components/tools/WordCounter";
import ImageCompressor from "@/components/tools/ImageCompressor";
import MetaTagGenerator from "@/components/tools/MetaTagGenerator";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

export const dynamic = "force-dynamic";

const componentMap: Record<string, React.ComponentType> = {
  WordCounter,
  ImageCompressor,
  MetaTagGenerator,
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: tool } = await supabase
    .from("tools")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!tool) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-24">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Tool not found
            </h1>
            <p className="mt-3 text-sm text-muted">
              The tool you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="mt-6 flex justify-center">
              <Link href="/tools" className="btn btn-outline">
                All tools
              </Link>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const ToolComponent = componentMap[tool.component];

  return (
    <section className="py-14 lg:py-20">
      <Container>
        <Reveal className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <Link href="/tools" className="transition-colors hover:text-foreground">
              Tools
            </Link>
            <span className="mx-2 text-faint">/</span>
            <span className="text-foreground">{tool.name}</span>
          </nav>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{tool.description}</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="card p-5 sm:p-8">
            {ToolComponent ? (
              <ToolComponent />
            ) : (
              <p className="py-14 text-center text-sm text-muted">
                This tool is being set up. Check back soon.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4 text-sm text-muted">
            <Icon name="briefcase" className="h-5 w-5 shrink-0 text-primary" />
            <p>
              Need help with your digital marketing instead?{" "}
              <Link href="/contact" className="font-semibold text-primary hover:text-primary-hover">
                Talk to us
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
