import { Bucket, StackContext, Table } from 'sst/constructs'

export function StorageStack({ stack }: StackContext) {
    // create dynamodb table
    const table = new Table(stack, 'Notes', {
        fields: {
            userId: "string",
            noteId: "string"
        },
        primaryIndex: { partitionKey: "userId", sortKey: "noteId" }
    });

    // create s3 bucket
    const bucket = new Bucket(stack, "Uploads");

    return {
        table,
        bucket
    };
}