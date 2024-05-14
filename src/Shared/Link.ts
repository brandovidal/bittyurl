import type { Session } from "@auth/core/types";
import { getLinksByUser } from "./db";

import type { UserProps } from "@/interfaces/User";
import type { LinkProps } from "@/interfaces/Link";

export async function upsertLink (user:  UserProps | null) {
  let links: LinkProps[] = [];

  if (user !== null) {
    const response = await getLinksByUser(user.id!);
  
    if (response.success && response.data) {
      links = response.data;
    }
  }
  return links
} 