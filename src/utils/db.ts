import mongoose, { Model, Query } from "mongoose";

export const findPaginatedData = async (model: Model<any>, query: object, pageNumber: number, pageSize: number) => {
    return model.aggregate([
        {
            $match: query
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $facet: {
                data: [
                    { $skip: (pageNumber - 1) * pageSize },
                    { $limit: pageSize }
                ],
                metadata: [
                    { $count: 'totalCount' }
                ]
            }
        }
    ]).then(res => {
        const totalCount = res[0]?.metadata[0]?.totalCount || 0
        return {
            metadata: {
                totalCount: totalCount,
                totalPage: Math.ceil(totalCount / pageSize),
                pageNumber: pageNumber,
                pageSize: pageSize
            },
            data: res[0].data as Array<any>
        }
    })
}