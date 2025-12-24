import { apiFetcher } from "@/lib/fetcher";
import { PostContactRequest } from "@/types/api-request/contact";

export const PostContact = (data: PostContactRequest) =>
  apiFetcher("/contact", {
    method: "POST",
    body: data,
  });
