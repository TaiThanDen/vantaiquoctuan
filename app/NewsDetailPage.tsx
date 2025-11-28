"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";
import TableOfContents from "./components/TableOfContents";
import RelatedItems from "./components/RelatedItems";
import {
  getNewsBySlug,
  getNewsTags,
  getNewsList,
} from "../services/newsService";
import { getImageUrl } from "../services/imageService";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { BASE_URL } from "../services/api";
import "./styles/tiptap-content.css";

type News = {
  id: string;
  slug: string;
  title: string;
  content: string;
  bannerImage?: string;
  createdTime?: string;
  updatedTime?: string;
};

type TocItem = { id: string; text: string; level: 2 | 3 };

const SCROLL_OFFSET = 90;
const STOP_NEAR_BOTTOM = 200;

const NewsContent = React.memo(({ safeHtml }: { safeHtml: string }) => {
  return (
    <div
      className="w-full prose max-w-none tiptap-content leading-loose text-base sm:text-lg"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
});

const NewsDetailPage = () => {
  const params = useParams();
  const slug = (params?.slug as string) || "";

  const [article, setArticle] = useState<any>(null);
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [relatedNews, setRelatedNews] = useState<any[]>([]);

  const contentAreaRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Configure DOMPurify - MOVED INSIDE COMPONENT
  useEffect(() => {
    if (typeof window !== "undefined") {
      DOMPurify.addHook("uponSanitizeAttribute", (_: any, data: any) => {
        if (data.attrName === "style") {
          const allowed = [
            "font-size",
            "font-weight",
            "text-align",
            "width",
            "height",
            "line-height",
            "max-width",
            "object-fit",
            "display",
            "margin",
          ];
          data.attrValue = data.attrValue
            .split(";")
            .map((s: string) => s.trim())
            .filter((s: string) => allowed.some((a: string) => s.startsWith(a)))
            .join("; ");

          if (
            data.attrValue.includes("width:") &&
            !data.attrValue.includes("max-width:")
          ) {
            data.attrValue += "; max-width: 100%; height: auto;";
          }
        }
      });

      // Hook để giữ nguyên thuộc tính iframe
      DOMPurify.addHook("uponSanitizeElement", (node: any) => {
        if (node.tagName === "IFRAME") {
          // Đảm bảo iframe có đầy đủ thuộc tính cần thiết
          const src = node.getAttribute("src");
          if (
            src &&
            (src.includes("youtube.com") || src.includes("youtu.be"))
          ) {
            node.setAttribute("allowfullscreen", "");
            node.setAttribute(
              "allow",
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            );
          }
        }
      });
    }
  }, []);

  // Utils
  const decodeEntities = (str: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Chuyển TipTap JSON sang HTML - Memoize để tránh re-render
  const tiptapHtml = useMemo(() => {
    if (!article?.content) return "";

    try {
      return generateHTML(article.content, [
        StarterKit,
        Youtube,
        Image,
        Underline,
        TextStyle,
        Color,
        Highlight.configure({ multicolor: true }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        Subscript,
        Superscript,
      ]);
    } catch (error) {
      console.error("Error generating HTML:", error);
      return "";
    }
  }, [article?.content]);

  // Sau đó sanitize - Memoize để tránh re-sanitize
  const safeHtml = useMemo(() => {
    if (!tiptapHtml) return "";

    return DOMPurify.sanitize(tiptapHtml, {
      ALLOWED_TAGS: [
        "p",
        "br",
        "b",
        "strong",
        "i",
        "em",
        "u",
        "ul",
        "ol",
        "li",
        "blockquote",
        "a",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "img",
        "span",
        "mark",
        "sub",
        "sup",
        "code",
        "pre",
        "s",
        "strike",
        "div",
        "iframe",
      ],
      ALLOWED_ATTR: [
        "href",
        "target",
        "rel",
        "src",
        "alt",
        "style",
        "data-inline-heading",
        "class",
        "width",
        "height",
        "data-youtube-video",
        "frameborder",
        "allowfullscreen",
        "allow",
        "loading",
        "referrerpolicy",
      ],
      ADD_ATTR: [
        "allow",
        "allowfullscreen",
        "frameborder",
        "loading",
        "referrerpolicy",
      ],
      KEEP_CONTENT: true,
      FORCE_BODY: false,
    });
  }, [tiptapHtml]);

  const createdDate = article?.createdTime
    ? new Date(article.createdTime).toLocaleDateString("vi-VN")
    : "";
  const updatedDate = article?.updatedTime
    ? new Date(article.updatedTime).toLocaleDateString("vi-VN")
    : "";

  // Build TOC
  const buildTOC = useCallback(() => {
    const root = contentAreaRef.current;
    if (!root) return;

    const headings = root.querySelectorAll<HTMLElement>("h2, h3");
    const items: TocItem[] = [];

    headings.forEach((h, i) => {
      const level = h.tagName === "H2" ? 2 : 3;
      if (!h.id) h.id = slugify(h.innerText || `section-${i}`);
      items.push({ id: h.id, text: h.innerText.trim(), level });
    });

    setToc(items);
  }, []);

  // Setup Intersection Observer
  const setupObserver = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id;
            if (id) setActiveId(id);
          }
        }
      },
      { root: null, rootMargin: "-35% 0px -60% 0px", threshold: [0, 1] }
    );

    const root = contentAreaRef.current;
    if (!root) return;

    // CHỈ observe headings
    const headings = root.querySelectorAll("h2, h3");
    headings.forEach((el) => observerRef.current!.observe(el));
  }, []);

  // Scroll to ID
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Update progress and sticky
  const updateProgressAndSticky = useCallback(() => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;

    const root = contentAreaRef.current;
    if (root) {
      const rect = root.getBoundingClientRect();
      const start = rect.top + scrollTop - SCROLL_OFFSET;
      const end = rect.bottom + scrollTop - window.innerHeight;
      const len = Math.max(1, end - start);
      const ratio = Math.min(1, Math.max(0, (scrollTop - start) / len));
      setScrollProgress(Math.round(ratio * 100));
    }

    const distanceFromBottom =
      doc.scrollHeight - scrollTop - window.innerHeight;
    setIsSticky(distanceFromBottom >= STOP_NEAR_BOTTOM);
  }, []);

  // Fetch article
  const fetchArticle = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const news = await getNewsBySlug(slug);
      setArticle(news);
      const tagList = await getNewsTags(news.id);
      setTags(tagList);
    } catch (e) {
      setError("Không thể tải bài viết");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  // Thêm useEffect để lấy related news
  useEffect(() => {
    const fetchRelatedNews = async () => {
      if (!article || !article.id) return;

      try {
        // Lấy danh sách tất cả tin tức
        const res = await getNewsList();

        // Loại bỏ bài viết hiện tại và lấy 6 bài gần nhất
        const filtered = res.data
          .filter((item: any) => item.id !== article.id)
          .slice(0, 6);

        setRelatedNews(filtered);
      } catch (error) {
        console.error("Error fetching related news:", error);
        // Nếu có lỗi, vẫn set empty array để không crash
        setRelatedNews([]);
      }
    };

    fetchRelatedNews();
  }, [article]);

  // Effects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setArticle(null);
    setToc([]);
    setActiveId("");
    setScrollProgress(0);
    fetchArticle();
  }, [slug, fetchArticle]);

  useEffect(() => {
    if (article && safeHtml) {
      setTimeout(() => {
        buildTOC();
        setupObserver();
        updateProgressAndSticky();
      }, 100);
    }
  }, [article, safeHtml, buildTOC, setupObserver, updateProgressAndSticky]);

  useEffect(() => {
    window.addEventListener("scroll", updateProgressAndSticky, {
      passive: true,
    });
    window.addEventListener("resize", buildTOC);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      window.removeEventListener("scroll", updateProgressAndSticky);
      window.removeEventListener("resize", buildTOC);
    };
  }, [updateProgressAndSticky, buildTOC]);

  // Render
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-10">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-semibold mb-2">
            Không tìm thấy bài viết
          </h1>
          <Link href="/news" className="text-blue-600 hover:underline">
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-30">
      {/* Back button */}
      <div className="item-start justify-items-start my-4 cursor-pointer mx-auto text-xl font-bold text-[#00aa64]">
        <Link href="/news">
          <p className="flex items-center gap-2 sm:pl-8 font-semibold">
            <ArrowLeft size={24} className="font-bold text-[#00aa64]" />
            Quay lại
          </p>
        </Link>
      </div>
      <div className="relative w-full px-8">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold my-2 mx-auto ">
          {article.title}
        </h1>
        {/* Meta */}
        <div className="w-full text-md text-gray-500 mb-4">
          <span>Ngày đăng: {createdDate}</span>
          {updatedDate && <span> · Cập nhật: {updatedDate}</span>}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div ref={contentAreaRef} className="flex-1 lg:w-0 lg:flex-[0_0_75%]">
            {/* Banner */}
            {article.banner && (
              <div className="flex mb-8 items-center justify-center">
                <img
                  src={getImageUrl(article.banner)}
                  alt={article.title}
                  className="w-full h-auto object-cover rounded-lg shadow"
                />
              </div>
            )}

            {/* Mobile TOC */}
            <div className="lg:hidden mb-6">
              <TableOfContents
                items={toc}
                activeId={activeId}
                onItemClick={scrollToId}
              />
            </div>

            {/* Body */}
            <NewsContent safeHtml={safeHtml} />
          </div>

          {/* Desktop TOC */}
          <div className="hidden lg:block lg:w-80 lg:shrink-0">
            <aside
              className={`mt-4 lg:mt-0 ${
                isSticky ? "lg:sticky lg:top-24" : ""
              }`}
            >
              <TableOfContents
                items={toc}
                activeId={activeId}
                onItemClick={scrollToId}
                scrollProgress={scrollProgress}
                showProgress={true}
              />
            </aside>
          </div>
        </div>
      </div>
      <div className="bg-gray-50">
        {/* Related News Section */}
        <RelatedItems title="Tin tức liên quan" items={relatedNews} />
      </div>
    </div>
  );
};

export default NewsDetailPage;
