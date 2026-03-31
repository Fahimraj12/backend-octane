const db = require("./config/database");

db.query("SELECT 1", (err, result) => {
  if (err) {
    console.error("❌ Test query failed:", err.message);
    return;
  }
  console.log("✅ Test query success:", result);
});
