import { notFound } from "next/navigation";
import company from "@/data/company.json";
import { getSupabaseServerClient } from "@/lib/supabase-server";
import Contact from "@/components/Contact";
import type { Metadata } from "next";
import Link from "next/link";

const COMPANY_ID = company.companyId;
export const revalidate = 300;

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string | null;
  cover_image?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
};

function formatDate(dateString?: string) {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const supabase = getSupabaseServerClient({ allowMissing: true });
    if (!supabase) return { title: company.seo?.defaultTitle, description: company.seo?.defaultDescription };
    const { data } = await supabase
      .from("articles")
      .select("title, excerpt")
      .eq("company_id", COMPANY_ID)
      .eq("slug", params.slug)
      .single();
    const title = data?.title || company.seo?.defaultTitle;
    const description = data?.excerpt || company.seo?.defaultDescription;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `/blog/${params.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: company.seo?.defaultTitle,
      description: company.seo?.defaultDescription,
    };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let article: Article | null = null;
  try {
    const supabase = getSupabaseServerClient({ allowMissing: true });
    if (!supabase) throw new Error("Supabase non configurato");
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("company_id", COMPANY_ID)
      .eq("slug", params.slug)
      .limit(1)
      .maybeSingle<Article>();

    if (error) {
      throw new Error(error.message);
    }
    article = data as Article | null;
  } catch (err) {
    console.error("[blog slug] supabase error", err);
  }

  if (!article) {
    notFound();
  }

  const paragraphs = (article.content || "").split(/\n{2,}/).filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: {
      "@type": "Organization",
      name: `Team ${company.business?.name}`,
    },
  };

  return (
    <>
      <div className="pt-24 min-h-screen bg-[#F8FAFC]">
        <div className="container mx-auto px-6 pt-8">
          <a
            href="/blog"
            className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors text-sm font-medium"
          >
            <span className="rotate-180 inline-block text-lg">{">"}</span> Torna al blog
          </a>
        </div>

        <header className="container mx-auto px-6 py-12 max-w-4xl text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-primary mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-slate-500 text-sm font-medium">
            <span>{formatDate(article.created_at)}</span>
            {article.updated_at ? (
              <>
                <span>•</span>
                <span>Aggiornato {formatDate(article.updated_at)}</span>
              </>
            ) : null}
          </div>
        </header>

        {article.cover_image ? (
          <div className="container mx-auto px-6 max-w-5xl mb-16">
            <div className="aspect-video bg-slate-200 rounded-3xl shadow-lg relative overflow-hidden">
              <img
                src={article.cover_image}
                alt={article.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-corporate opacity-20"></div>
            </div>
          </div>
        ) : null}

        <div className="container mx-auto px-6 max-w-4xl pb-16">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
          <article className="prose prose-slate prose-lg max-w-none text-slate-600">
            {paragraphs.length
              ? paragraphs.map((para, idx) => <p key={idx}>{para}</p>)
              : article.content}
          </article>
          <div className="mt-8 text-sm text-slate-600">
            Scopri i nostri <Link href="/servizi" className="underline hover:text-brand-accent">servizi</Link> o richiedi un <Link href="/form-preventivo" className="underline hover:text-brand-accent">preventivo</Link>.
          </div>
        </div>
      </div>
      <Contact viewMode="footer" />
    </>
  );
}
