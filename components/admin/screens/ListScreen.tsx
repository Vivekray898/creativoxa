import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import Icon from "@/components/ui/Icon";
import ResourceTable from "@/components/admin/ResourceTable";
import { Notice, PageHeader, Toolbar, adminButton, adminInput } from "@/components/admin/ui";
import { getResource } from "@/lib/cms/resources";
import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminSearchParams = {
  q?: string;
  status?: string;
  saved?: string;
  error?: string;
};

function normaliseText(value: unknown): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return typeof value === "string" ? value : "";
}

export default async function ListScreen({
  resourceKey,
  searchParams,
  canCreate = true,
  title,
  description,
}: {
  resourceKey: string;
  searchParams: AdminSearchParams;
  canCreate?: boolean;
  title?: string;
  description?: string;
}) {
  const def = getResource(resourceKey);
  if (!def) notFound();

  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const q = normaliseText(searchParams.q).trim();
  const status = normaliseText(searchParams.status);
  const saved = normaliseText(searchParams.saved);
  const error = normaliseText(searchParams.error);

  const supabase = (await createSupabaseServerClient()) as unknown as SupabaseClient;

  let query = supabase.from(def.table).select("*");

  if (def.hasSortOrder) {
    query = query.order("sort_order", { ascending: true });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  if (q && def.searchKeys && def.searchKeys.length > 0) {
    // PostgREST filter syntax: strip characters that would break the expression.
    const safe = q.replace(/[,()%]/g, " ").trim();
    if (safe) {
      query = query.or(def.searchKeys.map((key) => `${key}.ilike.%${safe}%`).join(","));
    }
  }

  if (status && def.hasPublish) {
    query = query.eq("published", status === "published");
  }

  const { data, error: queryError } = await query;
  const rows = (data ?? []) as Record<string, unknown>[];

  return (
    <>
      <PageHeader
        title={title ?? def.label}
        description={description ?? def.description}
        breadcrumb={[{ label: "Admin", href: "/admin/dashboard" }, { label: def.label }]}
        actions={
          canCreate ? (
            <Link href={`${def.path}/new`} className={adminButton.primary}>
              <Icon name="plus" className="h-4 w-4" />
              Add {def.singular}
            </Link>
          ) : null
        }
      />

      <Notice saved={saved} error={error} />
      {queryError ? (
        <Notice error={`Could not load ${def.plural}: ${queryError.message}`} />
      ) : null}

      <Toolbar>
        <form method="get" className="flex flex-1 flex-wrap items-center gap-2">
          {def.searchKeys && def.searchKeys.length > 0 ? (
            <div className="relative min-w-[14rem] flex-1">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
              />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder={`Search ${def.plural}…`}
                className={`${adminInput} pl-9`}
              />
            </div>
          ) : null}

          {def.hasPublish ? (
            <select name="status" defaultValue={status} className={`${adminInput} w-auto`}>
              <option value="">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          ) : null}

          <button type="submit" className={adminButton.quiet}>
            <Icon name="filter" className="h-3.5 w-3.5" />
            Apply
          </button>

          {q || status ? (
            <Link href={def.path} className="text-xs font-semibold text-muted hover:text-foreground">
              Reset
            </Link>
          ) : null}

          <span className="ml-auto text-xs text-faint">
            {rows.length} {rows.length === 1 ? def.singular : def.plural}
          </span>
        </form>
      </Toolbar>

      <ResourceTable
        def={def}
        rows={rows}
        canDelete={user.role === "admin"}
        emptyAction={
          canCreate && !q && !status ? (
            <Link href={`${def.path}/new`} className={adminButton.primary}>
              <Icon name="plus" className="h-4 w-4" />
              Add {def.singular}
            </Link>
          ) : null
        }
      />
    </>
  );
}
