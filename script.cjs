const fs = require('fs');
let f = fs.readFileSync('c:/Users/nikhi/OneDrive/Documents/2nd_year/fullstack/Projects/course-sphere/src/App.jsx', 'utf8');

f = f.replace(/return userRole === "educator"\s*\n\s*\? <Navigate to="\/educator\/dashboard" replace \/>\s*\n\s*: <Navigate to="\/dashboard" replace \/>;/g,
'if (userRole === "superadmin") return <Navigate to="/superadmin/dashboard" replace />;\n    return userRole === "educator" ? <Navigate to="/educator/dashboard" replace /> : <Navigate to="/dashboard" replace />;');

fs.writeFileSync('c:/Users/nikhi/OneDrive/Documents/2nd_year/fullstack/Projects/course-sphere/src/App.jsx', f);
