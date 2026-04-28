import re

# Update Register.jsx
with open('src/pages/Register.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('import { useNavigate } from "react-router-dom";', 'import { useNavigate, useLocation } from "react-router-dom";')
text = text.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const location = useLocation();')
text = text.replace('onClick={() => navigate("/join/student")}', 'onClick={() => navigate("/join/student", { state: location.state })}')
text = text.replace('onClick={() => navigate("/join/educator")}', 'onClick={() => navigate("/join/educator", { state: location.state })}')

with open('src/pages/Register.jsx', 'w', encoding='utf-8') as f:
    f.write(text)


# Update StudentRegister.jsx
with open('src/pages/StudentRegister.jsx', 'r', encoding='utf-8') as f:
    text2 = f.read()

text2 = text2.replace('import { useNavigate } from "react-router-dom";', 'import { useNavigate, useLocation } from "react-router-dom";')
text2 = text2.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const location = useLocation();')
text2 = text2.replace('const [name, setName] = useState("");', 'const [name, setName] = useState(location.state?.name || "");')
text2 = text2.replace('const [email, setEmail] = useState("");', 'const [email, setEmail] = useState(location.state?.email || "");')

with open('src/pages/StudentRegister.jsx', 'w', encoding='utf-8') as f:
    f.write(text2)


# Update EducatorRegister.jsx
with open('src/pages/EducatorRegister.jsx', 'r', encoding='utf-8') as f:
    text3 = f.read()

text3 = text3.replace('import { useNavigate } from "react-router-dom";', 'import { useNavigate, useLocation } from "react-router-dom";')
text3 = text3.replace('const navigate = useNavigate();', 'const navigate = useNavigate();\n  const location = useLocation();')
text3 = text3.replace('const [name, setName] = useState("");', 'const [name, setName] = useState(location.state?.name || "");')
text3 = text3.replace('const [email, setEmail] = useState("");', 'const [email, setEmail] = useState(location.state?.email || "");')

with open('src/pages/EducatorRegister.jsx', 'w', encoding='utf-8') as f:
    f.write(text3)

