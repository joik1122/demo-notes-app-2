import { Api, StackContext, use } from "sst/constructs"
import { StorageStack } from "./StorageStack"

export function ApiStack({ stack }: StackContext) {
    const { table } = use(StorageStack)

    // create api
    const api = new Api(stack, "Api", {
        defaults: {
            authorizer: "iam",
            function: {
                bind: [table] // bind the table to the functions (api can access the dynamodb table)
            }
        },
        routes: {
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "GET /notes": "packages/functions/src/list.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main"
        }
    });

    // show the api endpoint in the output
    stack.addOutputs({
        "ApiEndPoint": api.url // 다른 스택에서 이 스택의 API 엔드포인트에 액세스할 수 있도록 출력에 추가
    });

    // return the api
    return { api };
}