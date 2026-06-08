import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "../posts";
import PostClient from "./PostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | Advitec",
    };
  }

  return {
    title: `${post.title} | Advitec International Healthcare Blog`,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `https://advitecint.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://advitecint.com/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          alt: post.title,
        },
      ],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Generate ISO date format for JSON-LD schema
  let formattedDate = "2026-06-08";
  try {
    formattedDate = new Date(post.date).toISOString().split('T')[0];
  } catch (e) {
    // Fallback if date string parsing fails
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://advitecint.com/blog/${post.slug}`
    },
    "headline": post.title,
    "description": post.metaDescription,
    "image": `https://advitecint.com${post.coverImage}`,
    "datePublished": formattedDate,
    "author": {
      "@type": "Person",
      "name": post.author.split(" (")[0]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Advitec International",
      "logo": {
        "@type": "ImageObject",
        "url": "https://advitecint.com/logo-01-332x129.webp"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostClient post={post} />
    </>
  );
}
