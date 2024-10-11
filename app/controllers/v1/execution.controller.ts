import ApiResponse from "../../utils/apiResponse";
import expressAsyncHandler from "../../utils/expressAsyncHandler";

export const executeCode = expressAsyncHandler(async function (req, res, next) {
  new ApiResponse(res, 200, "Code executed");
});

