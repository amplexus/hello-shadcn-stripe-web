import { Star } from "lucide-react";

export default function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array(rating).fill(0).map((n, index) =>
        (<Star key={index} className="text-yellow-400" fill={"currentColor"} />)
      )}
    </div>
  )
}

