import math
from tkinter import *
import os
vlc_directory = 'C:\\Program Files\\VideoLAN\\VLC'
os.add_dll_directory(vlc_directory)
import vlc

# ---------------------------- CONSTANTS ------------------------------- #
PINK = "#e2979c"
RED = "#e7305b"
GREEN = "#9bdeac"
YELLOW = "#f7f5dd"
FONT_NAME = "Courier"
WORK_MIN = 25
SHORT_BREAK_MIN = 5
LONG_BREAK_MIN = 20
COMPLETED = "✓"
reps = 0
timer_on = True
timer = None


# ---------------------------- TIMER RESET ------------------------------- #
def reset():
    global reps
    window.after_cancel(timer)
    reps = 0
    completed.config(text="")
    canvas.itemconfigure(timer_text, text=f"00:00")



# ---------------------------- TIMER MECHANISM ------------------------------- #

def timer_start():
    global reps
    reps += 1
    if reps % 8 == 0:
        title.config(text="Break", foreground=RED)
        tick(LONG_BREAK_MIN * 60)
    elif reps % 2 == 0:
        title.config(text="Break", foreground=PINK)
        tick(SHORT_BREAK_MIN * 60)
    else:
        title.config(text="Work", foreground=GREEN)
        tick(WORK_MIN * 60)



# ---------------------------- COUNTDOWN MECHANISM ------------------------------- #
def tick(seconds):
    global reps
    global timer
    minute = math.floor(seconds / 60)
    second = int(seconds % 60)
    if second < 10:
        second = f"0{second}"

    if minute < 10:
        minute = f"0{minute}"

    canvas.itemconfigure(timer_text, text=f"{minute}:{second}")
    if seconds > 0:
       timer = window.after(1000, tick, seconds - 1)
    else:
        p = vlc.MediaPlayer("./bell.mp3")
        p.play()
        timer_start()
        marks = ""
        completed_sessions = math.floor(reps/2)
        for _ in range(completed_sessions):
            marks += COMPLETED

        completed.config(text=marks)


# ---------------------------- UI SETUP ------------------------------- #

window = Tk()
window.title("Pomodoro")
window.config(padx=100, pady=50, bg=YELLOW)
window.config(padx=20, pady=20)

canvas = Canvas(width=220, height=224, bg=YELLOW, highlightthickness=0)
tomato_img = PhotoImage(file="tomato.png")
canvas.create_image(103, 112, image=tomato_img)
timer_text = canvas.create_text(103, 130, text="00:00", fill="white", font=(FONT_NAME, 35, "bold"))
canvas.grid(column=1, row=1)

title = Label(text="Timer", bg=YELLOW, font=(FONT_NAME, 35, "bold"), fg=GREEN)
title.grid(column=1, row=0)

start = Button(text="Start", command=timer_start)
start.grid(column=0, row=2)

reset = Button(text="Reset", command=reset)
reset.grid(column=3, row=2)

completed = Label(text="", bg=YELLOW, font=(FONT_NAME, 10, "bold"), fg=GREEN)
completed.grid(column=1, row=3)

window.mainloop()
