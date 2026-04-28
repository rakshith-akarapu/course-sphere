import re

with open('src/pages/Login.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('import React, { useState } from "react";', 'import React, { useState } from "react";\nimport { GoogleLogin } from "@react-oauth/google";')

button_replacement = """        <button
          type="button"
          className="loginBtn"
          onClick={handleLogin}
        >
          Login
        </button>

        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await API.post("/auth/google-login", {
                  credential: credentialResponse.credential
                });
                if (res.data.status === "SUCCESS") {
                  const token = res.data.token;
                  localStorage.setItem("token", token);
                  const role = decodeTokenRole(token);
                  setCurrentUser({ role: role });
                  alert("Login successful ✅");
                  if (role === "educator") navigate("/educator/dashboard");
                  else if (role === "superadmin") navigate("/superadmin/dashboard");
                  else navigate("/dashboard");
                } else if (res.data.status === "USER_NOT_FOUND") {
                  alert("Email not found. Redirecting to registration...");
                  navigate("/register", { state: { email: res.data.email, name: res.data.name } });
                }
              } catch (err) {
                console.error(err);
                if (err.response && err.response.data && typeof err.response.data === "string" && err.response.data.includes("pending approval")) {
                    alert("Your account is pending approval from the Super Admin.");
                } else {
                    alert("Google Login Failed ❌");
                }
              }
            }}
            onError={() => { console.log("Login Failed"); }}
          />
        </div>"""

text = re.sub(r'        <button\s+type="button"\s+className="loginBtn"\s+onClick=\{handleLogin\}\s+>\s+Login\s+</button>', button_replacement, text)

with open('src/pages/Login.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
