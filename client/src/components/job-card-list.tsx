import { JobCardItem } from "@/components/job-card-item";

interface Job {
    title: string;
    level: string;
    description: string;
    isRemote: boolean;
    isFullTime: boolean;
}

interface JobCardListProps {
    data: Job[];
}

export default function JobCardList({ data }: JobCardListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {data.map((item, index) => (
                <JobCardItem key={index} item={item} />
            ))}
        </div>
    );
}
