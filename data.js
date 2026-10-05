/* ============================================================
   ForgeAPT — Question Bank (Updated)
   Practical = THM-style labs (type commands / flags)
   MCQs     = pure multiple choice
   Exam     = short-answer / type-the-answer (NO MCQs)
   ============================================================ */

const PRACTICAL_QUESTIONS = [
  {
    id: 1,
    difficulty: "easy",
    category: "Linux",
    module: "Linux Basics • THM Style",
    type: "command",
    scenario: "You just got a reverse shell on a Linux machine.\nYour prompt shows: www-data@target:~$\n\nTask: Check which user you are and your groups in one command.",
    question: "Type the command you would run:",
    answer: "whoami && id",
    accepted: ["whoami && id", "id", "whoami; id", "id && whoami"],
    hint: "Two common commands that show username and groups.",
    explanation: "whoami shows the current user, id shows uid/gid and groups."
  },
  {
    id: 2,
    difficulty: "easy",
    category: "Networking",
    module: "Module 3 — Scanning • THM Style",
    type: "command",
    scenario: "You are on your Kali machine. Target IP is 10.10.10.50.\nYou want a fast SYN scan of the most common ports without being too noisy.",
    question: "Type the full nmap command:",
    answer: "nmap -sS -T4 -F 10.10.10.50",
    accepted: ["nmap -sS -T4 -F 10.10.10.50", "nmap -sS -F -T4 10.10.10.50", "nmap -F -sS -T4 10.10.10.50"],
    hint: "-sS = SYN, -T4 = timing, -F = fast (top ports)",
    explanation: "Classic fast stealth scan taught in almost every practical course."
  },
  {
    id: 3,
    difficulty: "medium",
    category: "Recon",
    module: "Module 2 — Footprinting • THM Style",
    type: "command",
    scenario: "You need subdomains of target.com.\nYou want a completely passive method (no traffic to the target).",
    question: "Name one popular free website/tool used for Certificate Transparency logs:",
    answer: "crt.sh",
    accepted: ["crt.sh", "crtsh", "https://crt.sh", "certificate transparency", "crt.sh/"],
    hint: "It is a website that shows certificates issued for domains.",
    explanation: "crt.sh is the most common passive CT log source."
  },
  {
    id: 4,
    difficulty: "medium",
    category: "Web Hacking",
    module: "Module 15 — SQL Injection • THM Style",
    type: "payload",
    scenario: "Login form has username and password fields.\nYou want to bypass authentication using a classic comment-based SQLi.",
    question: "Type the username payload (password can be anything):",
    answer: "admin'--",
    accepted: ["admin'--", "admin'-- -", "admin' #", "' or 1=1--", "' or '1'='1"],
    hint: "Close the string and comment out the rest of the query.",
    explanation: "admin'-- closes the quote and comments the password check."
  },
  {
    id: 5,
    difficulty: "medium",
    category: "Linux",
    module: "Module 6 — Linux PrivEsc • THM Style",
    type: "command",
    scenario: "You have a low-privilege shell.\nYou want to find all SUID binaries on the system (common first step in PrivEsc).",
    question: "Type the command to find SUID binaries:",
    answer: "find / -perm -4000 -type f 2>/dev/null",
    accepted: ["find / -perm -4000 -type f 2>/dev/null", "find / -perm -u=s -type f 2>/dev/null", "find / -perm -4000 2>/dev/null"],
    hint: "Use find with permission bit 4000 and suppress errors.",
    explanation: "This is the classic THM / HTB first PrivEsc enumeration command."
  },
  {
    id: 6,
    difficulty: "hard",
    category: "Web Hacking",
    module: "Module 14 — Web App Hacking • THM Style",
    type: "concept",
    scenario: "You found /api/user?id=5\nChanging id to 5' OR 1=1-- returns ALL users.\nOther endpoints use prepared statements, this one does not.",
    question: "What two vulnerability classes are present here? (write both)",
    answer: "IDOR and SQL Injection",
    accepted: ["idor and sql injection", "idor + sqli", "sqli and idor", "idor sql injection", "insecure direct object reference and sql injection"],
    hint: "One is about accessing other users' data, the other is about the database query.",
    explanation: "You can access other objects (IDOR) and the parameter is injectable (SQLi)."
  },
  {
    id: 7,
    difficulty: "hard",
    category: "Networking",
    module: "Module 8 & 11 — Sniffing / Session Hijacking",
    type: "tool",
    scenario: "You are on a switched network.\nYou already poisoned ARP so traffic flows through you.\nYou want to capture cleartext credentials and possibly downgrade HTTPS.",
    question: "Name one popular tool used for this (ARP MITM + credential sniffing):",
    answer: "ettercap",
    accepted: ["ettercap", "bettercap", "bettercap or ettercap", "ettercap/bettercap"],
    hint: "Classic MITM tool that supports ARP poisoning and filters.",
    explanation: "ettercap and bettercap are the go-to tools for this scenario."
  },
  {
    id: 8,
    difficulty: "medium",
    category: "Tools",
    module: "Module 5 — Vulnerability Analysis • THM Style",
    type: "tool",
    scenario: "You want a free open-source tool that can automatically scan a web application\nfor common issues (outdated software, dangerous files, basic misconfigs).",
    question: "Name the classic tool (often taught in beginner courses):",
    answer: "nikto",
    accepted: ["nikto", "owasp zap", "zap", "nikto or zap"],
    hint: "It is a command-line web server scanner.",
    explanation: "Nikto is the classic quick web vulnerability scanner."
  },
  {
    id: 9,
    difficulty: "easy",
    category: "AI",
    module: "AI Security Concepts • Modern",
    type: "concept",
    scenario: "You are testing an internal chatbot that has a system prompt with safety rules.\nYou want the model to ignore those rules and do something it was told not to do.",
    question: "What is this attack class called?",
    answer: "prompt injection",
    accepted: ["prompt injection", "promptinjection", "jailbreak", "prompt injection / jailbreak"],
    hint: "It is the #1 attack against LLMs right now.",
    explanation: "Prompt Injection (and jailbreaking) is the main attack surface of LLMs."
  }
];

const MCQ_QUESTIONS = [
  { id: 1, category: "Hacking", question: "Which phase of ethical hacking involves gathering information without directly interacting with the target system?", options: ["Passive Reconnaissance", "Active Scanning", "Exploitation", "Maintaining Access"], correct: 0 },
  { id: 2, category: "Hacking", question: "What does the 'S' in the Nmap -sS scan stand for?", options: ["SYN Stealth Scan", "Full TCP Connect Scan", "UDP Scan", "Script Scan"], correct: 0 },
  { id: 3, category: "Hacking", question: "In Linux privilege escalation, what does SUID stand for?", options: ["Set User ID", "Super User ID", "Secure User Identity", "System Unique ID"], correct: 0 },
  { id: 4, category: "Hacking", question: "Which of the following is a classic example of a Denial-of-Service attack?", options: ["SYN Flood", "SQL Injection", "XSS", "Phishing"], correct: 0 },
  { id: 5, category: "Hacking", question: "What is the main goal of Social Engineering?", options: ["Manipulate humans to reveal information or perform actions", "Scan networks faster", "Encrypt traffic", "Write malware"], correct: 0 },
  { id: 6, category: "Hacking", question: "Which attack involves intercepting and potentially altering communication between two parties who believe they are communicating directly?", options: ["Man-in-the-Middle (MITM)", "SQL Injection", "Buffer Overflow", "Directory Traversal"], correct: 0 },
  { id: 7, category: "Hacking", question: "What is the primary purpose of Enumeration in the hacking methodology?", options: ["Extract usernames, shares, services and other details from a live system", "Only find open ports", "Only write reports", "Only install backdoors"], correct: 0 },
  { id: 8, category: "Hacking", question: "In web application security, what does OWASP stand for?", options: ["Open Web Application Security Project", "Official Web Attack Security Protocol", "Open Wireless Access Security Protocol", "Online Web Application Scanning Platform"], correct: 0 },
  { id: 9, category: "Hacking", question: "Which of the following is most associated with Session Hijacking?", options: ["Stealing or predicting session tokens/cookies", "Cracking Wi-Fi passwords", "Exploiting buffer overflows", "Sending phishing emails"], correct: 0 },
  { id: 10, category: "Hacking", question: "What is the safest legal way to practice real penetration testing skills?", options: ["On systems you own or have explicit written permission to test (labs, HTB, THM, bug bounty programs)", "Any public website", "Your friend's laptop without telling him", "Government websites"], correct: 0 },
  { id: 11, category: "Tools", question: "Which tool is primarily used for password cracking of hashes?", options: ["John the Ripper / Hashcat", "Nmap", "Wireshark", "Burp Suite"], correct: 0 },
  { id: 12, category: "Tools", question: "Burp Suite is mainly used for:", options: ["Web application security testing (proxy, scanner, repeater)", "Network packet sniffing only", "Wireless cracking only", "Malware analysis only"], correct: 0 },
  { id: 13, category: "Tools", question: "Which tool is the industry standard for network packet capture and analysis?", options: ["Wireshark", "Metasploit", "Nikto", "Gobuster"], correct: 0 },
  { id: 14, category: "Tools", question: "Metasploit Framework is best known for:", options: ["Exploitation and post-exploitation modules", "Only DNS enumeration", "Only writing reports", "Only creating phishing pages"], correct: 0 },
  { id: 15, category: "Tools", question: "Which tool is commonly used for directory and file brute-forcing on web servers?", options: ["Gobuster / Dirb / Dirsearch", "Hashcat", "Aircrack-ng", "Volatility"], correct: 0 },
  { id: 16, category: "Tools", question: "Aircrack-ng suite is primarily used for:", options: ["Wireless network auditing and WPA/WPA2 cracking", "Web SQLi automation", "Linux privilege escalation", "Email phishing"], correct: 0 },
  { id: 17, category: "Tools", question: "What is sqlmap used for?", options: ["Automating detection and exploitation of SQL Injection vulnerabilities", "Scanning open ports", "Cracking password hashes", "Sniffing network traffic"], correct: 0 },
  { id: 18, category: "Tools", question: "Which tool is best for performing OSINT and subdomain enumeration?", options: ["Amass / Subfinder / theHarvester", "John the Ripper", "Mimikatz", "Responder"], correct: 0 },
  { id: 19, category: "Tools", question: "Mimikatz is famous for extracting what from Windows systems?", options: ["Plaintext passwords, hashes and Kerberos tickets from memory", "Only network routes", "Only installed software list", "Only browser history"], correct: 0 },
  { id: 20, category: "Tools", question: "Which tool is commonly used for Active Directory enumeration and attacks?", options: ["BloodHound / Impacket / CrackMapExec", "Nikto", "Aircrack-ng", "Volatility"], correct: 0 },
  { id: 21, category: "AI", question: "What is Prompt Injection in the context of AI/LLM security?", options: ["Crafting inputs that make the model ignore system instructions or perform unintended actions", "Injecting SQL into a database via AI", "Overloading the GPU", "Training a model on poisoned data only"], correct: 0 },
  { id: 22, category: "AI", question: "Which attack involves feeding malicious data during model training so that the model later behaves incorrectly?", options: ["Data Poisoning / Model Poisoning", "Prompt Injection", "XSS", "ARP Spoofing"], correct: 0 },
  { id: 23, category: "AI", question: "What does RAG stand for in modern AI systems?", options: ["Retrieval-Augmented Generation", "Random Access Gateway", "Remote Attack Generator", "Rapid AI Growth"], correct: 0 },
  { id: 24, category: "AI", question: "Why is RAG security important?", options: ["Attackers can poison the knowledge base or retrieve sensitive documents via crafted queries", "It only affects training speed", "It is only a marketing term", "It has no security implications"], correct: 0 },
  { id: 25, category: "AI", question: "What is a common defense against simple prompt injection?", options: ["Strong system prompts, input/output filtering, and separating trusted vs untrusted data", "Disabling the internet", "Using only CPU", "Removing all training data"], correct: 0 },
  { id: 26, category: "AI", question: "Jailbreaking an LLM typically means:", options: ["Bypassing the model's safety alignment to make it produce restricted content", "Physically opening the server", "Cracking the API key with hashcat", "Running the model offline"], correct: 0 },
  { id: 27, category: "AI", question: "In AI red teaming, what is the main goal?", options: ["Discover and demonstrate ways the AI system can be abused or fail safely", "Only improve model accuracy", "Only reduce inference cost", "Only collect more training data"], correct: 0 },
  { id: 28, category: "AI", question: "Which of the following is an example of an indirect prompt injection?", options: ["Malicious instructions hidden inside a document that the LLM later retrieves and follows", "Typing a bad prompt in the chat box", "Changing the model weights", "DDoS the API endpoint"], correct: 0 },
  { id: 29, category: "AI", question: "Why should you never paste sensitive company data into public AI chat interfaces?", options: ["The data may be logged, used for training, or leaked", "It makes the model slower", "It is illegal in every country", "AI cannot understand company data"], correct: 0 },
  { id: 30, category: "AI", question: "What is a key difference between traditional AppSec and AI Security?", options: ["AI systems introduce new attack surfaces (prompts, embeddings, training data, model weights) that classic OWASP Top 10 does not fully cover", "There is no difference", "AI systems cannot be attacked", "Only networking knowledge is needed"], correct: 0 }
];

const EXAM_QUESTIONS = [
  { id: 1, category: "Linux", question: "Write the command that lists all SUID binaries and hides permission errors.", answer: "find / -perm -4000 -type f 2>/dev/null", accepted: ["find / -perm -4000 -type f 2>/dev/null", "find / -perm -u=s -type f 2>/dev/null", "find / -perm -4000 2>/dev/null"], hint: "find + permission 4000 + suppress stderr" },
  { id: 2, category: "Networking", question: "What is the default port number for HTTPS?", answer: "443", accepted: ["443"], hint: "HTTP is 80, the secure version is..." },
  { id: 3, category: "Web Hacking", question: "What is the single most effective way to prevent SQL Injection? (short answer)", answer: "parameterized queries", accepted: ["parameterized queries", "prepared statements", "parameterized queries / prepared statements", "use prepared statements", "parameterised queries"], hint: "Never concatenate user input into the SQL string." },
  { id: 4, category: "Tools", question: "Which Nmap script category is used to detect known vulnerabilities? (write the flag value)", answer: "vuln", accepted: ["vuln", "--script=vuln", "script=vuln"], hint: "nmap --script=????" },
  { id: 5, category: "Hacking", question: "In a penetration test, what does the term 'pivot' mean? (one short sentence)", answer: "using a compromised host to attack deeper into the network", accepted: ["using a compromised host to attack deeper into the network", "use compromised machine to reach internal network", "attack internal systems through a compromised host", "move laterally using a compromised host"], hint: "You are already inside and now want to reach other internal systems." },
  { id: 6, category: "Linux", question: "Which command shows the sudo privileges of the current user?", answer: "sudo -l", accepted: ["sudo -l", "sudo -l -U", "sudo --list"], hint: "Very short command, two characters after sudo." },
  { id: 7, category: "AI", question: "What is the name of the attack where you craft input so an LLM ignores its system prompt?", answer: "prompt injection", accepted: ["prompt injection", "promptinjection", "jailbreak"], hint: "The #1 LLM attack right now." },
  { id: 8, category: "Networking", question: "Which protocol is connection-oriented and guarantees delivery of packets?", answer: "TCP", accepted: ["tcp", "TCP", "Transmission Control Protocol"], hint: "The other common transport protocol is UDP." },
  { id: 9, category: "Web Hacking", question: "What does HTTP status code 403 mean? (one or two words)", answer: "Forbidden", accepted: ["forbidden", "403 forbidden", "access forbidden", "not allowed"], hint: "Server understood the request but refuses to authorize it." },
  { id: 10, category: "Tools", question: "Name the most popular tool used as an intercepting proxy for web application testing.", answer: "Burp Suite", accepted: ["burp suite", "burp", "burpsuite", "owasp zap", "zap"], hint: "It has Proxy, Repeater, Intruder, Scanner tabs." },
  { id: 11, category: "Hacking", question: "What is the main difference between Vulnerability Assessment and Penetration Test? (short)", answer: "VA finds weaknesses, PT tries to exploit them", accepted: ["va finds weaknesses pt exploits them", "vulnerability assessment identifies issues penetration test exploits them", "va is scanning pt is exploitation", "assessment finds, pentest proves impact"], hint: "One is more about finding, the other is about proving impact." },
  { id: 12, category: "Linux", question: "You found a world-writable script that is executed by root via cron. What can you achieve?", answer: "privilege escalation to root", accepted: ["privilege escalation to root", "root access", "run commands as root", "privesc", "get root"], hint: "If root runs a file you can write to..." },
  { id: 13, category: "AI", question: "What does RAG stand for?", answer: "Retrieval-Augmented Generation", accepted: ["retrieval-augmented generation", "retrieval augmented generation", "retrieval augmented generation (rag)"], hint: "A technique that gives LLMs external knowledge at query time." },
  { id: 14, category: "Networking", question: "What does the ARP protocol map?", answer: "IP address to MAC address", accepted: ["ip to mac", "ip address to mac address", "ip addresses to mac addresses", "layer 3 to layer 2 address"], hint: "Needed so a device knows the hardware address for a given IP on the local network." },
  { id: 15, category: "Web Hacking", question: "Which HTTP response header is most important when testing for CORS misconfigurations?", answer: "Access-Control-Allow-Origin", accepted: ["access-control-allow-origin", "access-control-allow-origin header", "acao"], hint: "It tells the browser which origins are allowed to read the response." },
  { id: 16, category: "Tools", question: "Which tool is famous for extracting plaintext passwords and Kerberos tickets from Windows LSASS memory?", answer: "Mimikatz", accepted: ["mimikatz", "Mimikatz"], hint: "It is almost always mentioned in Windows post-exploitation." },
  { id: 17, category: "Hacking", question: "Why do attackers prefer a reverse shell instead of a bind shell in many real engagements?", answer: "bypasses inbound firewall rules", accepted: ["bypasses inbound firewall", "bypasses firewall", "target connects out", "victim connects to attacker", "outbound connection is usually allowed"], hint: "The connection is initiated by the victim machine." },
  { id: 18, category: "Linux", question: "Write the command that shows the current routing table on a modern Linux system.", answer: "ip route", accepted: ["ip route", "ip route show", "route -n", "netstat -rn"], hint: "The modern command starts with 'ip'." },
  { id: 19, category: "AI", question: "What is the biggest practical risk when an LLM is allowed to call tools/functions based on user prompts?", answer: "remote code execution or tool abuse via prompt injection", accepted: ["prompt injection leading to tool abuse", "rce via prompt injection", "tool abuse", "remote code execution", "unintended tool execution"], hint: "If the model can run code or call APIs, a malicious prompt can make it do dangerous things." },
  { id: 20, category: "Networking", question: "What is the purpose of a SYN flood attack?", answer: "exhaust server resources by leaving half-open connections", accepted: ["exhaust resources with half-open connections", "denial of service by flooding syn packets", "fill up the connection queue", "dos by half-open tcp connections"], hint: "It abuses the TCP three-way handshake." }
];
