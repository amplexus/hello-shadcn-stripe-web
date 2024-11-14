import { Loader2 } from "lucide-react";

export default function ShopLoading() {
  return (
    <div className="bg-muted/60 flex justify-center items-center">
      <Loader2 className="size-24 animate-spin" />Page is loading...
    </div>
  );
}
