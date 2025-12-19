from flask import Flask, render_template, request
import sqlite3

app = Flask(__name__)

def get_db():
    return sqlite3.connect("database.db")

# Create tables
with get_db() as db:
    db.execute("""
    CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT,
        time TEXT,
        priority TEXT
    )
    """)

def chronos_reply(user_msg):
    db = get_db()
    cursor = db.cursor()

    msg = user_msg.lower()

    # ADD TASK
    if "add" in msg and "at" in msg:
        try:
            task = msg.split("add")[1].split("at")[0].strip()
            time = msg.split("at")[1].strip()

            cursor.execute("SELECT * FROM schedule WHERE time=?", (time,))
            conflict = cursor.fetchone()

            if conflict:
                return f"⚠️ Conflict detected at {time}. Please choose another time."

            cursor.execute(
                "INSERT INTO schedule (task, time, priority) VALUES (?, ?, ?)",
                (task, time, "medium")
            )
            db.commit()
            return f"✅ Task '{task}' scheduled at {time}"

        except:
            return "❌ Please use format: Add meeting at 5pm"

    # SHOW SCHEDULE
    elif "show" in msg or "schedule" in msg:
        cursor.execute("SELECT task, time FROM schedule")
        tasks = cursor.fetchall()
        if not tasks:
            return "📭 No tasks scheduled."
        reply = "📅 Your Schedule:\n"
        for t in tasks:
            reply += f"- {t[0]} at {t[1]}\n"
        return reply

    # OVERLOAD CHECK
    elif "overload" in msg or "stress" in msg:
        cursor.execute("SELECT COUNT(*) FROM schedule")
        count = cursor.fetchone()[0]
        if count > 5:
            return "🧠 You seem overloaded. Consider postponing low-priority tasks."
        else:
            return "✅ Your workload looks manageable."

    # DEFAULT
    else:
        return "🤖 I am Chronos AI. You can say:\n• Add meeting at 4pm\n• Show schedule\n• Check overload"

@app.route("/", methods=["GET", "POST"])
def home():
    response = ""
    if request.method == "POST":
        user_msg = request.form["message"]
        response = chronos_reply(user_msg)
    return render_template("index.html", response=response)

if __name__ == "__main__":
    app.run(debug=True)
