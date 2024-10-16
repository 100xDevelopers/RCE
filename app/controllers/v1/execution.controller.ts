import path from "path";
import ApiResponse from "../../utils/apiResponse";
import expressAsyncHandler from "../../utils/expressAsyncHandler";
import os from "os";
import { randomUUID } from "crypto";
import fs from "fs";
import cp from "child_process";
import ApiError from "../../utils/apiError";

export const executeCode = expressAsyncHandler(async function (req, res, next) {
  const { content } = req.body;

  // Step 1: Check if content is provided
  if (!content) {
    throw new ApiError(400, "Please provide the content to execute");
  }

  // Step 2: Create a temp file to store the code
  const tempFileName = randomUUID();
  const tempDir = os.tmpdir();
  const tempFilePath = path.join(tempDir, `${tempFileName}.js`);

  // Step 3: Write user-provided content to the temp file
  fs.writeFileSync(tempFilePath, content, { encoding: "utf-8" });

  // Step 4: Execute the temporary JS file using `child_process.exec()`
  cp.exec(`node "${tempFilePath}"`, (error, stdout, stderr) => {
    if (error) {
      fs.unlinkSync(tempFilePath);
      // Error in execution (e.g., syntax error in the user's code)
      return next(
        new ApiError(400, "Failed to execute your code", error, stderr)
      );
    }

    if (stderr) {
      fs.unlinkSync(tempFilePath);
      // There is a non-fatal issue that the process outputs via stderr
      return next(new ApiError(400, "Execution generated an error", stderr));
    }

    // If code executes successfully
    if (stdout) {
      fs.unlinkSync(tempFilePath);
      new ApiResponse(res, 200, "Code executed successfully", stdout, null);
    }
  });
});
