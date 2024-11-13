import JobCardList from "@/components/job-card-list";
import JobPagination from "@/components/job-pagination";

type Props = {
    searchParams: {
        page?: string;
        pageSize?: string;
    };
};

interface Job {
    id: number;
    title: string;
    level: string;
    description: string;
    isRemote: boolean;
    isFullTime: boolean;
}

export default async function Page({ searchParams }: Props) {
    const page = parseInt(searchParams.page || "1", 10);
    const pageSize = parseInt(searchParams.pageSize || "20", 10);

    // console.log("Fetching jobs for page", page, "with page size", pageSize);

    const [data, count] = await getJobsWithCount(page, pageSize);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-20">
            <div className="max-w-6xl mx-auto space-y-12">
                {/*  Page Title*/}
                <div className="text-center space-y-8">
                    <h1 className="text-4xl font-bold">Latest Job Openings</h1>
                    <p className="text-lg text-gray-400">
                        Join our Waitlist and get access to Rumor for discounted early-bird prices.
                    </p>
                </div>

                <JobCardList data={data} />

                <JobPagination
                    page={page}
                    pageSize={pageSize}
                    totalCount={count}
                    pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50, 100] }}
                />
            </div>
        </div>
    );
}

async function getJobsWithCount(page: number, pageSize: number): Promise<[Job[], number]> {
    // Total job list (simulating 500 jobs)
    const allJobs = Array(500)
        .fill({
            title: "Mern Stack Developer",
            level: "Mid Level",
            description: "We're looking for a mid-level product designer to join our team.",
            isRemote: true,
            isFullTime: true,
        })
        .map((job, index) => ({ ...job, id: index + 1, title: `${job.title} #${index + 1}` }));

    // Slice the allJobs array to get the current page's jobs
    const start = (page - 1) * pageSize;
    const data = allJobs.slice(start, start + pageSize);

    return [data, allJobs.length];
}
