import Link from "next/link";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import ConfirmAction from "@/components/admin/ConfirmAction";
import { EmptyState, StatusPill, adminButton } from "@/components/admin/ui";
import {
  deleteResource,
  moveResource,
  setResourceFlag,
} from "@/lib/cms/actions/store";
import type { ColumnDef, ResourceDef } from "@/lib/cms/resources";

type Row = Record<string, unknown>;

const BOOL_LABELS: Record<string, { on: string; off: string; tone: "success" | "muted" }> = {
  published: { on: "Published", off: "Draft", tone: "success" },
  enabled: { on: "Enabled", off: "Hidden", tone: "success" },
  visible: { on: "Visible", off: "Hidden", tone: "success" },
  featured: { on: "Featured", off: "—", tone: "success" },
};

function Cell({ column, row }: { column: ColumnDef; row: Row }) {
  const value = row[column.key];

  if (column.kind === "bool") {
    const labels = BOOL_LABELS[column.key] ?? { on: "Yes", off: "No", tone: "muted" as const };
    return value ? (
      <StatusPill tone="success">{labels.on}</StatusPill>
    ) : (
      <StatusPill tone="muted">{labels.off}</StatusPill>
    );
  }

  if (column.kind === "icon") {
    return value ? (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-surface-2 text-muted">
        <Icon name={String(value) as IconName} className="h-4 w-4" />
      </span>
    ) : (
      <span className="text-xs text-faint">—</span>
    );
  }

  if (column.kind === "order") {
    return <span className="tabular-nums text-xs text-muted">{String(value ?? "—")}</span>;
  }

  if (column.kind === "muted") {
    return <span className="text-xs text-muted">{value ? String(value) : "—"}</span>;
  }

  return <span className="font-medium text-foreground">{value ? String(value) : "—"}</span>;
}

export default function ResourceTable({
  def,
  rows,
  canDelete,
  emptyAction,
}: {
  def: ResourceDef;
  rows: Row[];
  canDelete: boolean;
  emptyAction?: React.ReactNode;
}) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title={`No ${def.plural} yet`}
        description={def.emptyHint ?? `Create your first ${def.singular} to see it here.`}
        action={emptyAction}
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-background">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-2/60 text-left">
              {def.listColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-faint"
                >
                  {column.label}
                </th>
              ))}
              <th scope="col" className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-widest text-faint">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const id = String(row.id);
              return (
                <tr key={id} className="border-b border-line last:border-0 align-middle">
                  {def.listColumns.map((column) => (
                    <td key={column.key} className="px-4 py-3">
                      <Cell column={column} row={row} />
                    </td>
                  ))}

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      {def.hasSortOrder ? (
                        <>
                          <form action={moveResource}>
                            <input type="hidden" name="__resource" value={def.key} />
                            <input type="hidden" name="__id" value={id} />
                            <input type="hidden" name="__direction" value="up" />
                            <button
                              type="submit"
                              aria-label="Move up"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
                            >
                              <Icon name="arrowUp" className="h-3.5 w-3.5" />
                            </button>
                          </form>
                          <form action={moveResource}>
                            <input type="hidden" name="__resource" value={def.key} />
                            <input type="hidden" name="__id" value={id} />
                            <input type="hidden" name="__direction" value="down" />
                            <button
                              type="submit"
                              aria-label="Move down"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-foreground"
                            >
                              <Icon name="arrowDown" className="h-3.5 w-3.5" />
                            </button>
                          </form>
                        </>
                      ) : null}

                      {def.hasPublish ? (
                        <form action={setResourceFlag}>
                          <input type="hidden" name="__resource" value={def.key} />
                          <input type="hidden" name="__id" value={id} />
                          <input type="hidden" name="__field" value="published" />
                          <input type="hidden" name="__value" value={row.published ? "false" : "true"} />
                          <button type="submit" className={adminButton.quiet}>
                            <Icon name="eye" className="h-3.5 w-3.5" />
                            {row.published ? "Unpublish" : "Publish"}
                          </button>
                        </form>
                      ) : null}

                      <Link href={`${def.path}/${id}`} className={adminButton.quiet}>
                        <Icon name="edit" className="h-3.5 w-3.5" />
                        Edit
                      </Link>

                      {canDelete ? (
                        <ConfirmAction
                          action={deleteResource}
                          fields={{ __resource: def.key, __id: id }}
                          label="Delete"
                          message={`Delete this ${def.singular}?`}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
