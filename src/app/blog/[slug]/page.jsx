import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = posts.find((post) => post.slug === params.slug);
  return { title: post ? `${post.title} | Qiming Liu` : "Article not found" };
}

export default function BlogPost({ params }) {
  const index = posts.findIndex((post) => post.slug === params.slug);
  if (index === -1) notFound();
  const post = posts[index];

  return (
    <main>
      <Container className="pb-16 pt-28 sm:pt-32">
        <article className="mx-auto max-w-4xl overflow-hidden  text-[#f6efd9]">
          <div className="px-6 py-8 sm:px-12 sm:py-12 lg:px-16">
            <Link href="/#articles" className="text-xs font-semibold uppercase tracking-[0.15em] underline-offset-4 hover:underline">← All writing</Link>
            <h1 className="mb-10 mt-12 font-display text-2xl font-medium leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
            <div className="space-y-6 font-serif text-xl leading-[1.85] sm:text-2xl">
              {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
}
