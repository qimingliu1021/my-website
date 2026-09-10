import { NightLink as Link } from "./NightNavigation";
import { posts } from "@/lib/posts";

export default function ArticleList({ night = false }) {
  return (
    <ol className={night ? "divide-y divide-white/10" : "divide-y divide-[#2C2F3B]/20"}>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className={`group grid grid-cols-[1fr_auto] items-baseline gap-3 rounded-lg py-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-6 sm:py-4 ${night ? "hover:bg-white/5" : "hover:bg-black/5"}`}>
            <div>
              <h2 className="font-display text-base font-medium leading-relaxed tracking-tight sm:text-xl">{post.title}</h2>
            </div>
            <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1 motion-reduce:transform-none">↗</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
