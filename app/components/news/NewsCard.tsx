import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";

type CardProps = ComponentProps<typeof Card>;

type Props = {
  children: ReactNode;
  href: string;
  image: string;
  title?: string;
  category?: string;
  date?: string;
} & CardProps;

const NewsCard = ({
  children,
  image,
  href,
  title,
  category,
  date,
  ...cardProps
}: Props) => {
  return (
    <Link href={href}>
      <Card {...cardProps} className="h-max flex">
        <CardHeader>
          <img className="w-full aspect-3/2 rounded-2xl" src={image} />
        </CardHeader>
        <CardContent>
          {title && <h3 className="font-semibold mb-2 text-lg">{title}</h3>}
          {/* ngày và thể loại */}
          {(date || category) && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              {date && <span>{date}</span>}
              {category && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                  {category}
                </span>
              )}
            </div>
          )}
          {children}
        </CardContent>
      </Card>
    </Link>
  );
};

export default NewsCard;
