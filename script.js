let pyodide;
let currentLevelIndex = 0;
let attemptCount = 0;

async function init() {
    const consoleBox = document.getElementById('console-output');
    try {
        consoleBox.innerText = "> กำลังเตรียมห้องเรียน Python...";
        
        // ต้องใส่ค่าให้ตัวแปร pyodide ที่ประกาศไว้ข้างบนสุด
        pyodide = await loadPyodide(); 
        
        consoleBox.innerText = "> ระบบพร้อมใช้งาน! เขียนโค้ดได้เลย";
        consoleBox.style.color = "#4caf50";
    } catch (err) {
        consoleBox.innerText = `> โหลดระบบล้มเหลว: ${err.message}`;
        consoleBox.style.color = "#f44336";
    }
}


document.getElementById('btn-start').addEventListener('click', () => {
    document.getElementById('main-welcome').classList.add('hidden');
    document.getElementById('page-game').classList.remove('hidden');
    loadLevel(currentLevelIndex);
});

// 3. ฟังก์ชันโหลดโจทย์ (และล้างค่าเก่า)
function loadLevel(index) {
    if (index >= gameLevels.length) {
        alert("ยินดีด้วย! คุณผ่านครบทุกด่านแล้ว");
        document.getElementById('page-game').classList.add('hidden');
        document.getElementById('main-welcome').classList.remove('hidden');
        return;
    }
    
    const level = gameLevels[index];
    
    // UI Update
    document.getElementById('q-title').innerText = level.title;
    document.getElementById('q-desc').innerText = level.desc;
    document.getElementById('target-output').innerText = level.expected;
    
    // Reset Code & Console
    document.getElementById('python-editor').value = ""; // ล้างโค้ด
    const consoleBox = document.getElementById('console-output');
    consoleBox.innerText = "> รอการรันโค้ด...";
    consoleBox.style.color = "#d4d4d4";
    
    document.getElementById('btn-next').disabled = true;
    attemptCount = 0; // รีเซ็ตจำนวนครั้ง
    updateProgressBar();
}

// 4. ระบบตรวจคำตอบอัจฉริยะ (Validation Logic)
async function validateCode(userCode, level) {
    let logs = [];
    let isPassed = true;
    // 4.3 ตรวจค่าตัวแปรใน Memory
    try {
        const pyGlobals = pyodide.globals.toJs();
        if (level.mustHaveVar) {
            if (!pyGlobals.has(level.mustHaveVar)) {
                logs.push(`❌ ไม่พบตัวแปรชื่อ '${level.mustHaveVar}'`);
                isPassed = false;
            } 
            // สามารถเพิ่มการตรวจค่าตัวแปรลึกๆ ได้ที่นี่
        }
    } catch (e) { isPassed = false; }

    return { isPassed, logs };
}

// 5. ปุ่ม Run (Main Execution)
document.getElementById('btn-run').addEventListener('click', async () => {
    attemptCount++;
    const userCode = document.getElementById('python-editor').value;
    const level = gameLevels[currentLevelIndex];
    const consoleBox = document.getElementById('console-output');

    if (!pyodide) {
        alert("กรุณารอสักครู่ ระบบกำลังเริ่มต้น...");
        return;
    }


    try {
        // Redirect stdout
        pyodide.runPython(`import sys, io; sys.stdout = io.StringIO()`);
        await pyodide.runPythonAsync(userCode);
        const output = pyodide.runPython("sys.stdout.getvalue()").trim();

        // Validate
        const validation = await validateCode(userCode, level);

        if (output === level.expected && validation.isPassed) {
            consoleBox.innerText = `> ${output}\n✅ ถูกต้อง! เก่งมาก`;
            consoleBox.style.color = "#4caf50";
            document.getElementById('btn-next').disabled = false;
        } else {
            const errorMsg = validation.logs.length > 0 ? validation.logs.join("\n") : "ผลลัพธ์ยังไม่ตรง";
            consoleBox.innerText = `> ${output}\n⚠️ ${errorMsg}`;
            consoleBox.style.color = "#f44336";
        }
    } catch (err) {
        consoleBox.innerText = `> ทำอะไรน่ะ`;
        consoleBox.style.color = "#f44336";
    }
});

// 6. ปุ่ม Next
document.getElementById('btn-next').addEventListener('click', () => {
    currentLevelIndex++;
    loadLevel(currentLevelIndex);
});

init();