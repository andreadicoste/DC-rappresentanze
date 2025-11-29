import Link from "next/link";
import Contact from "@/components/Contact";
import company from "@/data/company.json";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import type { Metadata } from "next";

const COMPANY_ID = company.companyId;
export const revalidate = 300;

export const metadata: Metadata = {
  title: `Blog | ${company.business?.name}`,
  description: company.seo?.defaultDescription,
  openGraph: {
    title: `Blog | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
    url: "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${company.business?.name}`,
    description: company.seo?.defaultDescription,
  },
};

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  cover_image?: string | null;
  status?: string;
  created_at?: string;
};

function formatDate(dateString?: string) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export default async function BlogPage() {
  let articles: Article[] = [];
  let loadError: Error | null = null;

  try {
    const supabase = getSupabaseServerClient({ allowMissing: true });
    if (!supabase) throw new Error("Supabase non configurato");
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("company_id", COMPANY_ID)
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    articles = data || [];
  } catch (err: any) {
    loadError = err;
    console.error("[blog] supabase error", err);
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${company.business?.name} Blog`,
    description: company.seo?.defaultDescription,
    url: "/blog",
  };

  return (
    <>
      <div className="pt-24 min-h-screen bg-[#F8FAFC]">
        <section className="container mx-auto px-6 py-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-brand-accent font-display font-bold text-xs uppercase tracking-widest mb-3 block">
              News & Insights
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-6">
            L&apos;Osservatorio DC
          </h1>
          <p className="text-slate-500 text-lg">
            Approfondimenti, dati e strategie sul mondo della distribuzione alimentare.
          </p>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

        {loadError ? (
          <div className="text-center text-slate-500 bg-white border border-slate-200 rounded-2xl p-10 max-w-2xl mx-auto shadow-sm">
            Impossibile caricare gli articoli in questo momento.
          </div>
        ) : !articles.length ? (
          <div className="text-center text-slate-500 bg-white border border-slate-200 rounded-2xl p-10 max-w-2xl mx-auto shadow-sm">
            Nessun articolo disponibile al momento.
          </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
                >
                  <div className="h-48 bg-slate-200 relative overflow-hidden">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-brand-primary/10 group-hover:scale-105 transition-transform duration-500"></div>
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-brand-primary shadow-sm">
                      Articolo
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <h2 className="font-display text-xl font-bold text-brand-primary mb-3 group-hover:text-brand-accent transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <div className="mt-auto flex items-center gap-2 text-brand-primary font-bold text-sm group-hover:gap-3 transition-all">
                      Leggi articolo
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
      <Contact viewMode="footer" />
    </>
  );
}
