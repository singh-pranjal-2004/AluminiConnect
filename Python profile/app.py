from flask import Flask, render_template, request, flash, redirect, url_for
import sqlite3

app = Flask(__name__)
def create_database():
    conn = sqlite3.connect('form_data.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS form_data
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  gender TEXT,
                  country TEXT,
                  email TEXT,
                  phone TEXT,
                  dob TEXT,
                  title TEXT,
                  language TEXT,
                  experience INTEGER,
                  payment TEXT,
                  subscription TEXT,
                  image BLOB)''')
    conn.commit()
    conn.close()

@app.route('/')
def index():
    create_database()  # Ensure database and table exist
    return render_template('form.html')

@app.route('/form', methods=['POST'])
def submit_form():
    name = request.form['name']
    gender = request.form['gender']
    country = request.form['country']
    email = request.form['email']
    phone = request.form['phone']
    dob = request.form['dob']
    title = request.form['title']
    language = request.form['language']
    experience = request.form['experience']
    payment = request.form['payment']
    subscription = request.form['subscription']
    image = request.files['image']
    conn = sqlite3.connect('form_data.db')
    c = conn.cursor()
    c.execute('''INSERT INTO form_data (name, gender, country, email, phone, dob, title, language, experience, payment, subscription, image)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                 (name, gender, country, email, phone, dob, title, language, experience, payment, subscription, image.read()))
    user_data = [name, gender, country, email, phone, dob, title, language, experience, payment, subscription, image.read()]  
    return render_template('profile.html', user_data=user_data)
@app.route('/profile')
def profile():  
    return render_template('profile.html',user_data)
if __name__ == '__main__':
    app.run(debug=True)