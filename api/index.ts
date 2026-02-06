import * as moduleAlias from "module-alias";
import path from "path";

// これで addAlias が認識されます
moduleAlias.addAlias("@shared", path.join(__dirname, "../shared"));

import app from "../backend/src/app";
export default app;
