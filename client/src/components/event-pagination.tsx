"use client";

import { type ReactNode, useCallback } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface EventPaginationProps {
    pageSizeSelectOptions?: {
        pageSizeSearchParam?: string;
        pageSizeOptions: number[];
    };
    totalCount: number;
    pageSize: number;
    page: number;
    pageSearchParam?: string;
}

export default function EventPagination({
    pageSizeSelectOptions,
    pageSize,
    totalCount,
    page,
    pageSearchParam,
}: EventPaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalPageCount = Math.ceil(totalCount / pageSize);

    const buildLink = useCallback(
        (newPage: number) => {
            const key = pageSearchParam || "page";
            if (!searchParams) return `${pathname}?${key}=${newPage}`;
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set(key, String(newPage));
            return `${pathname}?${newSearchParams.toString()}`;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams, pathname]
    );

    const navToPageSize = useCallback(
        (newPageSize: number) => {
            const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
            const newSearchParams = new URLSearchParams(searchParams || undefined);
            newSearchParams.set(key, String(newPageSize));
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams, pathname]
    );

    const renderPageNumbers = () => {
        const items: ReactNode[] = [];
        const maxVisiblePages = 5;

        if (totalPageCount <= maxVisiblePages) {
            for (let i = 1; i <= totalPageCount; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href={buildLink(i)}
                            isActive={page === i}
                            className={cn(
                                "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:text-white",
                                page === i ? "bg-purple-500 border-purple-500" : ""
                            )}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            items.push(
                <PaginationItem key={1}>
                    <PaginationLink
                        href={buildLink(1)}
                        isActive={page === 1}
                        className={cn(
                            "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:text-white",
                            page === 1 ? "bg-purple-500 border-purple-500" : ""
                        )}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>
            );

            if (page > 3) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            const start = Math.max(2, page - 1);
            const end = Math.min(totalPageCount - 1, page + 1);

            for (let i = start; i <= end; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            href={buildLink(i)}
                            isActive={page === i}
                            className={cn(
                                "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:text-white",
                                page === i ? "bg-purple-500 border-purple-500 hover:text-white" : ""
                            )}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            if (page < totalPageCount - 2) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }

            items.push(
                <PaginationItem key={totalPageCount}>
                    <PaginationLink
                        href={buildLink(totalPageCount)}
                        isActive={page === totalPageCount}
                        className={cn(
                            "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:text-white",
                            page === totalPageCount ? "bg-purple-500 border-purple-500" : ""
                        )}
                    >
                        {totalPageCount}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-3 w-full">
            {pageSizeSelectOptions && (
                <div className="flex flex-col gap-4 flex-1">
                    <SelectRowsPerPage
                        options={pageSizeSelectOptions.pageSizeOptions}
                        setPageSize={navToPageSize}
                        pageSize={pageSize}
                    />
                </div>
            )}
            <Pagination
                className={cn({
                    "md:justify-end bg-[#1a1d24] p-2 rounded-[5px] w-fit": pageSizeSelectOptions,
                })}
            >
                <PaginationContent className="max-sm:gap-0">
                    <PaginationItem>
                        <PaginationPrevious
                            href={buildLink(Math.max(page - 1, 1))}
                            aria-disabled={page === 1}
                            tabIndex={page === 1 ? -1 : undefined}
                            className={cn(
                                "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:text-white",
                                page === totalPageCount
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            )}
                        />
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem>
                        <PaginationNext
                            href={buildLink(Math.min(page + 1, totalPageCount))}
                            aria-disabled={page === totalPageCount}
                            tabIndex={page === totalPageCount ? -1 : undefined}
                            className={cn(
                                "bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:text-white",
                                page === totalPageCount
                                    ? "pointer-events-none opacity-50"
                                    : undefined
                            )}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

function SelectRowsPerPage({
    options,
    setPageSize,
    pageSize,
}: {
    options: number[];
    setPageSize: (newSize: number) => void;
    pageSize: number;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4 bg-[#1a1d24] p-2 rounded-[5px]">
                <span className="text-sm text-gray-400">Show</span>
                <Select
                    value={String(pageSize)}
                    onValueChange={(value) => setPageSize(Number(value))}
                >
                    <SelectTrigger className="w-[70px] bg-gray-800 border-gray-800">
                        <SelectValue placeholder="Select page size">{String(pageSize)}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option} value={String(option)}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
