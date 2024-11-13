import { MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
    title: string;
    level: string;
    description: string;
    isRemote: boolean;
    isFullTime: boolean;
}

interface JobCardItemProps {
    item: Job;
}

export function JobCardItem({ item }: JobCardItemProps) {
    return (
        <Card className="bg-[#1a1d24] border border-gray-600 rounded-[5px]">
            <CardHeader className="space-y-2 px-5 py-4">
                <CardTitle className="text-xl font-semibold text-white">{item.title}</CardTitle>
                <div className="inline-flex">
                    <span className="text-gray-300 text-xs px-3 py-1 rounded-sm border border-gray-600">
                        {item.level}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-5">
                <p className="text-gray-400 text-lg">{item.description}</p>
                <div className="flex items-center space-x-6">
                    {item.isRemote && (
                        <div className="flex items-center space-x-2 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-md">Remote</span>
                        </div>
                    )}
                    {item.isFullTime && (
                        <div className="flex items-center space-x-2 text-gray-300">
                            <Clock className="w-4 h-4" />
                            <span className="text-md">Full-time</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-4">
                <Button
                    className="w-full bg-transparent hover:bg-purple-500 text-white border border-purple-500 rounded-[4px] py-5 text-md font-medium transition-colors duration-200"
                    variant="outline"
                >
                    Apply Now
                </Button>
            </CardFooter>
        </Card>
    );
}
