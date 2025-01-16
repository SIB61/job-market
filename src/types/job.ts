export type Job = {
    jobId: string
    title: string,
    description: string,
    location: string,
    salary: {
        min: string,
        max: string
    },
    employerId?: string
    applicationCount?: number
}