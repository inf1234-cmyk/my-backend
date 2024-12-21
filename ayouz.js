import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

// إعداد قاعدة البيانات
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mohcin',
    database: 'my_activities_db',
    port: 3307
});

// الاتصال بقاعدة البيانات
db.connect((err) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err);
    } else {
        console.log('تم الاتصال بقاعدة البيانات بنجاح!');
    }
});

// إعداد Middleware
app.use(cors());  // تمكين CORS
app.use(bodyParser.json());

// API لإضافة نشاط جديد
app.post('/add-activity', (req, res) => {
    const { title, description, image } = req.body;

    if (!title || !description || !image) {
        return res.status(400).json({ error: 'يجب ملء جميع الحقول' });
    }

    const query = 'INSERT INTO activities (title, description, image_url) VALUES (?, ?, ?)';
    db.query(query, [title, description, image], (err, result) => {
        if (err) {
            console.error('خطأ أثناء إضافة النشاط:', err);
            return res.status(500).json({ error: 'خطأ في الخادم' });
        }
        res.status(200).json({ message: 'تم إضافة النشاط بنجاح!' });
    });
});

// API لعرض الأنشطة
app.get('/activities', (req, res) => {
    const query = 'SELECT * FROM activities ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('خطأ أثناء جلب الأنشطة:', err);
            return res.status(500).json({ error: 'خطأ في الخادم' });
        }
        res.status(200).json(results);
    });
});

// تشغيل الخادم
app.listen(PORT, () => {
    console.log(`الخادم يعمل على http://localhost:${PORT}`);
});