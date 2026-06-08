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

  return <PostClient post={post} />;
}
