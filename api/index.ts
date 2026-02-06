import * as moduleAlias from "module-alias";
import path from "path";

// 1. @shared の登録
moduleAlias.addAlias("@shared", path.join(__dirname, "../shared"));

// 2. @ の登録
moduleAlias.addAlias("@", path.join(__dirname, "../backend/src"));

import app from "../backend/src/app";
export default app;
