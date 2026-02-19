
// questions.js
// เก็บข้อมูลโจทย์ทั้งหมดที่นี่
const gameLevels = [
    {
        id: 1,
        title: "Level 1: จุดเริ่มต้น (Variables)",
        desc: "จงสร้างตัวแปรชื่อ x ให้มีค่าเท่ากับ 5 แล้วแสดงค่าออกมา \n ตัวอย่าง \n x = 1 \n y = jack \n print(x,y)",
        expected: "5",
        mustHaveVar: "x",        
        mustContain: ["print"] 
    },
    {
        id: 2,
        title: "Level 2: ค่าของตัวแปล (Data Types)",
        desc: "ตัวแปรสามารถเก็บข้อมูลได้หลายประเภท และแต่ละประเภทสามารถทำงานต่างกันได้ \n x = 'Hello World' มีค่าเป็น str[ตัวอักษร] \n x = 20 มีค่าเป็น int[ตัวเลข] \n x = 20.5 มีค่าเป็น float[ตัวเลขที่มีเศษ] \n จงสร้างตัวแปรชื่อ x เป็นค่า John แล้วใช้คำสั่ง print(type(x))",
        expected: "<class 'str'>",
        mustHaveVar: "x",
        mustContain: ["print"]
    },
    {
        id: 3,
        title: "Level 3: การบวกเลข (Python Numbers)",
        desc: "จงสร้างตัวแปรชื่อ x เป็นค่า 5 แล้วนำมาบวกกับค่าเดิม \n x + x = a",
        expected: "10",
        mustHaveVar: "x",
        mustContain: ["print"]
    },
    {
        id: 4,
        title: "Level 4: Code Challenge",
        desc: "จงสร้างตัวแปรชื่อ x ให้มีค่าเท่ากับ 5 แล้วสั่งพิมพ์ค่า x ยกกำลัง 2 ออกมา",
        expected: "25",
        mustHaveVar: "x",
        mustContain: ["print", "*"]
    },
];
